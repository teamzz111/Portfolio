"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { buildGraph } from "@/lib/graph";
import {
  flowFragmentShader,
  flowVertexShader,
  nodeFragmentShader,
  nodeVertexShader,
} from "@/lib/shaders";
import { MOTION_MULT, motionState } from "@/lib/motion-state";

const ACCENT = "#42e6dd";
const ACCENT_BRIGHT = "#8ff6ef";

function Scene({ mobile }: Readonly<{ mobile: boolean }>) {
  const advance = useThree((state) => state.advance);
  const gl = useThree((state) => state.gl);
  const groupRef = useRef<THREE.Group>(null);

  const graph = useMemo(() => buildGraph(mobile), [mobile]);

  const { nodeGeo, nodeMat, lineGeo, linePos, flowGeo, flowPos } = useMemo(() => {
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(graph.current, 3));
    nodeGeo.setAttribute("aSize", new THREE.BufferAttribute(graph.sizes, 1));
    nodeGeo.setAttribute("aPhase", new THREE.BufferAttribute(graph.phases, 1));
    const nodeMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(ACCENT) },
        uPR: { value: 1 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: nodeVertexShader,
      fragmentShader: nodeFragmentShader,
    });

    const linePos = new Float32Array(graph.edges.length * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    // Rebuilt every frame; skip culling so it never blinks out mid-flythrough.
    lineGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e5);

    const flowPos = new Float32Array(graph.flows.length * 3);
    const flowGeo = new THREE.BufferGeometry();
    flowGeo.setAttribute("position", new THREE.BufferAttribute(flowPos, 3));
    flowGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e5);

    nodeGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e5);

    return { nodeGeo, nodeMat, lineGeo, linePos, flowGeo, flowPos };
  }, [graph]);

  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color(ACCENT),
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  const flowMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(ACCENT_BRIGHT) },
          uPR: { value: 1 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: flowVertexShader,
        fragmentShader: flowFragmentShader,
      }),
    [],
  );

  // The provider's rAF drives rendering: frameloop="never" + advance(seconds).
  useEffect(() => {
    motionState.advance = (timeMs) => advance(timeMs / 1000, true);
    return () => {
      motionState.advance = null;
    };
  }, [advance]);

  useEffect(() => {
    const pr = gl.getPixelRatio();
    nodeMat.uniforms.uPR.value = pr;
    flowMat.uniforms.uPR.value = pr;
  }, [gl, nodeMat, flowMat]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);
    const { count, base, current, phases, edges, flows } = graph;
    const mouse = motionState.mouse;
    const p = motionState.smoothProgress;

    // node drift + gentle cursor attraction (group xy plane)
    const mx = mouse.x * 34;
    const my = -mouse.y * 22;
    for (let i = 0; i < count; i++) {
      const bx = base[i * 3] + Math.sin(t * 0.3 + phases[i]) * 1.3;
      const by = base[i * 3 + 1] + Math.cos(t * 0.26 + phases[i]) * 1.1;
      const bz = base[i * 3 + 2] + Math.sin(t * 0.22 + phases[i] * 1.7) * 1.3;
      const dx = mx - bx;
      const dy = my - by;
      const k = 0.16 * Math.exp(-(dx * dx + dy * dy) * 0.0016);
      current[i * 3] = bx + dx * k;
      current[i * 3 + 1] = by + dy * k;
      current[i * 3 + 2] = bz;
    }
    nodeGeo.attributes.position.needsUpdate = true;
    nodeMat.uniforms.uTime.value = t;

    // edges follow nodes
    for (let e = 0; e < edges.length; e++) {
      const a = edges[e][0] * 3;
      const b = edges[e][1] * 3;
      const o = e * 6;
      linePos[o] = current[a];
      linePos[o + 1] = current[a + 1];
      linePos[o + 2] = current[a + 2];
      linePos[o + 3] = current[b];
      linePos[o + 4] = current[b + 1];
      linePos[o + 5] = current[b + 2];
    }
    lineGeo.attributes.position.needsUpdate = true;

    // data flows travel a→b
    for (let f = 0; f < flows.length; f++) {
      const flow = flows[f];
      flow.t += flow.sp * dt;
      if (flow.t > 1) flow.t -= 1;
      const a = flow.a * 3;
      const b = flow.b * 3;
      const o = f * 3;
      flowPos[o] = current[a] + (current[b] - current[a]) * flow.t;
      flowPos[o + 1] = current[a + 1] + (current[b + 1] - current[a + 1]) * flow.t;
      flowPos[o + 2] = current[a + 2] + (current[b + 2] - current[a + 2]) * flow.t;
    }
    flowGeo.attributes.position.needsUpdate = true;

    // scroll-driven camera fly-through + mouse parallax
    const cam = state.camera;
    cam.position.z = 62 - p * 80;
    cam.position.x = mouse.x * 6 * MOTION_MULT + Math.sin(p * Math.PI) * 5;
    cam.position.y = -mouse.y * 4 * MOTION_MULT + p * 3;
    cam.lookAt(0, p * 3, cam.position.z - 22);

    const group = groupRef.current;
    if (group) {
      group.rotation.y = mouse.x * 0.22 * MOTION_MULT + t * 0.018 + p * 0.25;
      group.rotation.x = -mouse.y * 0.16 * MOTION_MULT;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={nodeGeo} material={nodeMat} />
      <lineSegments geometry={lineGeo} material={lineMat} />
      <points geometry={flowGeo} material={flowMat} />
    </group>
  );
}

export default function SystemGraph({ mobile }: Readonly<{ mobile: boolean }>) {
  return (
    <Canvas
      frameloop="never"
      flat
      dpr={[1, mobile ? 1.5 : 2]}
      gl={{
        alpha: true,
        antialias: !mobile,
        powerPreference: "high-performance",
      }}
      camera={{ fov: 52, near: 0.1, far: 300, position: [0, 0, 62] }}
      style={{ pointerEvents: "none" }}
    >
      <Scene mobile={mobile} />
    </Canvas>
  );
}
