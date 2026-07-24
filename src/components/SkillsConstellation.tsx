"use client";

import { useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { skillCategories } from "@/lib/skills-data";
import {
  constellationHeight,
  layoutConstellation,
} from "@/lib/skills-layout";

const ACCENT = "var(--accent)";

interface AnimNode {
  type: "core" | "hub" | "skill";
  k?: string;
  phase: number;
  amp: number;
  bx: number;
  by: number;
  right: boolean;
  x: number;
  y: number;
  circle: SVGCircleElement | null;
  text: SVGTextElement | null;
}

interface AnimEdge {
  a: number;
  b: number;
  k: string;
  el: SVGLineElement | null;
}

/**
 * SVG constellation animated imperatively: React renders the tree once, a
 * gated rAF (runs only while in view) mutates cx/cy/x1..y2 attributes so no
 * React state changes per frame.
 */
export default function SkillsConstellation() {
  const t = useTranslations("skills");
  const mountRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeGroups = useRef<Record<string, SVGGElement | null>>({});
  const edgeGroups = useRef<Record<string, SVGGElement | null>>({});

  const model = useMemo(() => {
    const nodes: AnimNode[] = [];
    const edges: AnimEdge[] = [];
    const push = (type: AnimNode["type"], amp: number, k?: string) => {
      nodes.push({
        type,
        k,
        amp,
        phase: Math.random() * Math.PI * 2,
        bx: 0,
        by: 0,
        right: true,
        x: 0,
        y: 0,
        circle: null,
        text: null,
      });
      return nodes.length - 1;
    };
    push("core", 3);
    for (const cat of skillCategories) {
      const hubIdx = push("hub", 5, cat.k);
      edges.push({ a: 0, b: hubIdx, k: cat.k, el: null });
      for (let s = 0; s < cat.skills.length; s++) {
        const skillIdx = push("skill", 4, cat.k);
        edges.push({ a: hubIdx, b: skillIdx, k: cat.k, el: null });
      }
    }
    return { nodes, edges };
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    const svg = svgRef.current;
    if (!mount || !svg) return;

    let cx = 0;
    const layout = () => {
      const width = mount.clientWidth || 900;
      const height = constellationHeight(window.innerHeight);
      svg.setAttribute("height", String(height));
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      cx = width / 2;
      const positions = layoutConstellation(width, height);
      positions.nodes.forEach((pos, i) => {
        model.nodes[i].bx = pos.bx;
        model.nodes[i].by = pos.by;
        model.nodes[i].right = pos.right;
      });
    };

    const t0 = performance.now();
    const frame = () => {
      const t = (performance.now() - t0) / 1000;
      for (const node of model.nodes) {
        node.x = node.bx + Math.sin(t * 0.5 + node.phase) * node.amp;
        node.y = node.by + Math.cos(t * 0.42 + node.phase) * node.amp;
        node.circle?.setAttribute("cx", node.x.toFixed(1));
        node.circle?.setAttribute("cy", node.y.toFixed(1));
        const text = node.text;
        if (!text) continue;
        if (node.type === "core") {
          text.setAttribute("x", node.x.toFixed(1));
          text.setAttribute("y", (node.y + 26).toFixed(1));
        } else if (node.type === "hub") {
          text.setAttribute("x", (node.x + (node.right ? 11 : -11)).toFixed(1));
          text.setAttribute("y", (node.y - 13).toFixed(1));
          text.setAttribute("text-anchor", node.right ? "start" : "end");
        } else {
          text.setAttribute("x", (node.x + (node.right ? 8 : -8)).toFixed(1));
          text.setAttribute("y", (node.y + 3.5).toFixed(1));
          text.setAttribute("text-anchor", node.right ? "start" : "end");
        }
      }
      for (const edge of model.edges) {
        const a = model.nodes[edge.a];
        const b = model.nodes[edge.b];
        edge.el?.setAttribute("x1", a.x.toFixed(1));
        edge.el?.setAttribute("y1", a.y.toFixed(1));
        edge.el?.setAttribute("x2", b.x.toFixed(1));
        edge.el?.setAttribute("y2", b.y.toFixed(1));
      }
    };

    let active = false;
    let rafId: number | null = null;
    const loop = () => {
      if (!active) {
        rafId = null;
        return;
      }
      frame();
      rafId = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          active = entry.isIntersecting;
          if (active && rafId === null) rafId = requestAnimationFrame(loop);
        }
      },
      { threshold: 0.02 },
    );

    const ro = new ResizeObserver(() => layout());

    layout();
    frame();
    io.observe(mount);
    ro.observe(mount);

    return () => {
      active = false;
      if (rafId !== null) cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
    };
    // cx intentionally unused outside layout; model is stable.
  }, [model]);

  const hover = (k: string | null) => {
    for (const cat of skillCategories) {
      const on = !k || cat.k === k;
      const nodeGroup = nodeGroups.current[cat.k];
      const edgeGroup = edgeGroups.current[cat.k];
      if (nodeGroup) nodeGroup.style.opacity = on ? "1" : "0.2";
      if (edgeGroup) edgeGroup.style.opacity = on ? "1" : "0.12";
    }
  };

  // Node indices per cluster mirror the useMemo build order.
  let nodeIdx = 1;
  let edgeIdx = 0;

  return (
    <div ref={mountRef} className="relative w-full">
      <svg ref={svgRef} width="100%" style={{ display: "block" }} role="img" aria-label={t("title") + t("titleEm")}>
        <g>
          {skillCategories.map((cat) => {
            const start = edgeIdx;
            edgeIdx += 1 + cat.skills.length;
            return (
              <g
                key={cat.k}
                ref={(el) => {
                  edgeGroups.current[cat.k] = el;
                }}
                style={{ transition: "opacity .3s ease" }}
              >
                {model.edges.slice(start, edgeIdx).map((edge, i) => (
                  <line
                    key={i}
                    ref={(el) => {
                      edge.el = el;
                    }}
                    stroke={ACCENT}
                    strokeWidth={edge.a === 0 ? 0.9 : 0.7}
                    style={{ opacity: edge.a === 0 ? 0.3 : 0.16 }}
                  />
                ))}
              </g>
            );
          })}
        </g>
        <g>
          <circle
            ref={(el) => {
              model.nodes[0].circle = el;
            }}
            r={7}
            fill={ACCENT}
            style={{ filter: "drop-shadow(0 0 8px var(--accent))" }}
          />
          <text
            ref={(el) => {
              model.nodes[0].text = el;
            }}
            fontFamily="var(--font-mono)"
            fontSize={11}
            letterSpacing={2}
            fill="#e9eef0"
            textAnchor="middle"
          >
            {t("core")}
          </text>
          {skillCategories.map((cat) => {
            const hub = model.nodes[nodeIdx++];
            const skills = cat.skills.map(() => model.nodes[nodeIdx++]);
            return (
              <g
                key={cat.k}
                ref={(el) => {
                  nodeGroups.current[cat.k] = el;
                }}
                onPointerEnter={() => hover(cat.k)}
                onPointerLeave={() => hover(null)}
                style={{ transition: "opacity .3s ease" }}
              >
                <circle
                  ref={(el) => {
                    hub.circle = el;
                  }}
                  r={5}
                  fill={ACCENT}
                  style={{ filter: "drop-shadow(0 0 6px var(--accent))" }}
                />
                <text
                  ref={(el) => {
                    hub.text = el;
                  }}
                  fontFamily="var(--font-mono)"
                  fontSize={12.5}
                  letterSpacing={1.5}
                  fill="#e9eef0"
                >
                  {t(cat.key)}
                </text>
                {cat.skills.map((skill, s) => (
                  <g key={skill}>
                    <circle
                      ref={(el) => {
                        skills[s].circle = el;
                      }}
                      r={3}
                      fill={ACCENT}
                      style={{ opacity: 0.9 }}
                    />
                    <text
                      ref={(el) => {
                        skills[s].text = el;
                      }}
                      fontFamily="var(--font-mono)"
                      fontSize={10.5}
                      letterSpacing={0.4}
                      fill="#98a1a5"
                    >
                      {skill}
                    </text>
                  </g>
                ))}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
