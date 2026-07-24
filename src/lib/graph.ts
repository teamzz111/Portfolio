// Pure port of the prototype's scene-data build (Andres Largo.dc.html,
// initScene lines 899-989). No three.js dependency so it stays unit-testable.

export const CLUSTER_COUNT = 6;
export const DESKTOP_NODES = 132;
export const MOBILE_NODES = 84;
export const DESKTOP_FLOWS = 58;
export const MOBILE_FLOWS = 34;

export interface Flow {
  a: number;
  b: number;
  t: number;
  sp: number;
}

export interface GraphData {
  count: number;
  /** Rest positions (xyz triplets). */
  base: Float32Array;
  /** Animated positions, initialized to base. */
  current: Float32Array;
  sizes: Float32Array;
  phases: Float32Array;
  clusterIndex: Int16Array;
  /** Near-neighbour connections, each stored once with a < b. */
  edges: [number, number][];
  /** Bright particles lerping a→b along random edges. */
  flows: Flow[];
}

export function buildGraph(
  mobile: boolean,
  random: () => number = Math.random,
): GraphData {
  const count = mobile ? MOBILE_NODES : DESKTOP_NODES;

  const clusters: [number, number, number][] = [];
  for (let c = 0; c < CLUSTER_COUNT; c++) {
    clusters.push([
      (random() - 0.5) * 46,
      (random() - 0.5) * 30,
      (random() - 0.5) * 48,
    ]);
  }

  const base = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const clusterIndex = new Int16Array(count);

  for (let i = 0; i < count; i++) {
    const [cx, cy, cz] = clusters[i % CLUSTER_COUNT];
    clusterIndex[i] = i % CLUSTER_COUNT;
    const spread = 9 + random() * 7;
    base[i * 3] = cx + (random() - 0.5) * spread;
    base[i * 3 + 1] = cy + (random() - 0.5) * spread * 0.8;
    base[i * 3 + 2] = cz + (random() - 0.5) * spread;
    sizes[i] = 2.2 + random() * 4.2 + (random() < 0.12 ? 5 : 0);
    phases[i] = random() * Math.PI * 2;
  }

  const edges: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    const dists: [number, number][] = [];
    for (let j = 0; j < count; j++) {
      if (i === j) continue;
      const dx = base[i * 3] - base[j * 3];
      const dy = base[i * 3 + 1] - base[j * 3 + 1];
      const dz = base[i * 3 + 2] - base[j * 3 + 2];
      dists.push([dx * dx + dy * dy + dz * dz, j]);
    }
    dists.sort((a, b) => a[0] - b[0]);
    const k = 2 + (random() < 0.4 ? 1 : 0);
    for (let n = 0; n < k; n++) {
      const j = dists[n][1];
      if (i < j) edges.push([i, j]);
    }
  }

  const flowCount = Math.min(edges.length, mobile ? MOBILE_FLOWS : DESKTOP_FLOWS);
  const flows: Flow[] = [];
  for (let f = 0; f < flowCount; f++) {
    const [a, b] = edges[Math.floor(random() * edges.length)];
    flows.push({ a, b, t: random(), sp: 0.12 + random() * 0.5 });
  }

  return {
    count,
    base,
    current: new Float32Array(base),
    sizes,
    phases,
    clusterIndex,
    edges,
    flows,
  };
}
