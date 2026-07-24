// Pure port of the prototype's constellation layout() (lines 1231-1250):
// core at center, 6 hubs on an ellipse, skills fanned around each hub.

import { skillCategories } from "./skills-data";

export interface ConstellationNode {
  type: "core" | "hub" | "skill";
  /** Cluster key (undefined for the core). */
  k?: string;
  /** Category message key for hubs; literal label for skills. */
  label?: string;
  bx: number;
  by: number;
  right: boolean;
}

export interface ConstellationEdge {
  a: number;
  b: number;
  base: number;
  k: string;
}

export function layoutConstellation(width: number, height: number) {
  const cx = width / 2;
  const cy = height / 2;
  const nodes: ConstellationNode[] = [
    { type: "core", bx: cx, by: cy, right: true },
  ];
  const edges: ConstellationEdge[] = [];

  const rx = Math.min(width * 0.32, 500);
  const ry = height * 0.33;

  skillCategories.forEach((cat, i) => {
    const ang = -Math.PI / 2 + (i / skillCategories.length) * Math.PI * 2;
    const hx = cx + Math.cos(ang) * rx;
    const hy = cy + Math.sin(ang) * ry;
    const hubIdx = nodes.length;
    nodes.push({ type: "hub", k: cat.k, label: cat.key, bx: hx, by: hy, right: hx >= cx });
    edges.push({ a: 0, b: hubIdx, base: 0.3, k: cat.k });

    const R = Math.min(width, height) * 0.13;
    const spread = Math.PI * 0.95;
    const n = cat.skills.length;
    cat.skills.forEach((skill, j) => {
      const a2 = ang - spread / 2 + (n > 1 ? j / (n - 1) : 0.5) * spread;
      const rr = R * (0.72 + (j % 2) * 0.55);
      const sx = hx + Math.cos(a2) * rr;
      const sy = hy + Math.sin(a2) * rr;
      const skillIdx = nodes.length;
      nodes.push({ type: "skill", k: cat.k, label: skill, bx: sx, by: sy, right: sx >= cx });
      edges.push({ a: hubIdx, b: skillIdx, base: 0.16, k: cat.k });
    });
  });

  return { nodes, edges };
}

export function constellationHeight(viewportHeight: number) {
  return Math.max(540, Math.min(viewportHeight * 0.8, 820));
}
