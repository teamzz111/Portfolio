import { describe, expect, it } from "vitest";
import { buildGraph, CLUSTER_COUNT, DESKTOP_NODES, MOBILE_NODES } from "./graph";

// Deterministic LCG so tests don't depend on Math.random.
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

describe("buildGraph", () => {
  it("creates 132 nodes on desktop and 84 on mobile", () => {
    expect(DESKTOP_NODES).toBe(132);
    expect(MOBILE_NODES).toBe(84);
    expect(buildGraph(false, makeRng(1)).count).toBe(132);
    expect(buildGraph(true, makeRng(1)).count).toBe(84);
  });

  it("allocates xyz buffers with current starting equal to base", () => {
    const g = buildGraph(false, makeRng(2));
    expect(g.base.length).toBe(g.count * 3);
    expect(g.current.length).toBe(g.count * 3);
    expect(Array.from(g.current)).toEqual(Array.from(g.base));
    expect(g.current).not.toBe(g.base);
  });

  it("assigns node sizes and phases in prototype ranges", () => {
    const g = buildGraph(false, makeRng(3));
    for (const size of g.sizes) {
      expect(size).toBeGreaterThanOrEqual(2.2);
      expect(size).toBeLessThanOrEqual(2.2 + 4.2 + 5);
    }
    for (const phase of g.phases) {
      expect(phase).toBeGreaterThanOrEqual(0);
      expect(phase).toBeLessThan(Math.PI * 2 + 1e-9);
    }
  });

  it("spreads nodes across 6 clusters", () => {
    const g = buildGraph(false, makeRng(4));
    const seen = new Set(g.clusterIndex);
    expect(CLUSTER_COUNT).toBe(6);
    expect(seen.size).toBe(6);
  });

  it("builds deduplicated near-neighbour edges with a < b", () => {
    const g = buildGraph(false, makeRng(5));
    expect(g.edges.length).toBeGreaterThan(0);
    const keys = new Set<string>();
    for (const [a, b] of g.edges) {
      expect(a).toBeLessThan(b);
      expect(b).toBeLessThan(g.count);
      const key = `${a}-${b}`;
      expect(keys.has(key)).toBe(false);
      keys.add(key);
    }
  });

  it("creates at most 58 desktop / 34 mobile flows along existing edges", () => {
    const desktop = buildGraph(false, makeRng(6));
    const mobile = buildGraph(true, makeRng(6));
    expect(desktop.flows.length).toBe(Math.min(desktop.edges.length, 58));
    expect(mobile.flows.length).toBe(Math.min(mobile.edges.length, 34));
    for (const flow of desktop.flows) {
      expect(flow.t).toBeGreaterThanOrEqual(0);
      expect(flow.t).toBeLessThan(1);
      expect(flow.sp).toBeGreaterThanOrEqual(0.12);
      expect(flow.sp).toBeLessThan(0.62);
      const exists = desktop.edges.some(
        ([a, b]) => (a === flow.a && b === flow.b) || (a === flow.b && b === flow.a),
      );
      expect(exists).toBe(true);
    }
  });
});
