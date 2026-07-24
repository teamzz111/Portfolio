// GLSL ported verbatim from the prototype (Andres Largo.dc.html lines 930-941
// and 980-986). Breathing point sizes with perspective attenuation, soft
// additive glow, and depth-faded alpha.

export const nodeVertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  uniform float uPR;
  varying float vA;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float s = aSize * (1.0 + 0.32 * sin(uTime * 0.9 + aPhase));
    gl_PointSize = s * uPR * (320.0 / max(-mv.z, 1.0));
    vA = clamp(1.0 - (-mv.z) / 130.0, 0.0, 1.0);
  }
`;

export const nodeFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vA;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float glow = smoothstep(0.5, 0.0, d);
    float core = smoothstep(0.16, 0.0, d);
    vec3 col = uColor * (glow * 0.55 + core * 1.35);
    gl_FragColor = vec4(col, (glow * 0.42 + core) * vA);
  }
`;

export const flowVertexShader = /* glsl */ `
  uniform float uPR;
  varying float vA;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = 5.5 * uPR * (320.0 / max(-mv.z, 1.0));
    vA = clamp(1.0 - (-mv.z) / 130.0, 0.0, 1.0);
  }
`;

export const flowFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vA;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor * 1.6, core * core * vA);
  }
`;
