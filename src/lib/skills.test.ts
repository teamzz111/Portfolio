import { describe, expect, it } from "vitest";
import { skillCategories } from "./skills-data";
import { layoutConstellation } from "./skills-layout";

describe("skills data", () => {
  it("has the 6 prototype categories with their skills", () => {
    expect(skillCategories.map((c) => c.key)).toEqual([
      "catAI",
      "catFE",
      "catMO",
      "catBE",
      "catCL",
      "catDB",
    ]);
    const byKey = Object.fromEntries(
      skillCategories.map((c) => [c.key, [...c.skills]]),
    );
    expect(byKey.catAI).toEqual([
      "Claude API",
      "GPT-4",
      "Cursor",
      "MCP servers",
      "RAG",
      "Agentic workflows",
    ]);
    expect(byKey.catFE).toEqual(["React", "Next.js", "TypeScript", "Tailwind"]);
    expect(byKey.catMO).toEqual(["React Native", "Flutter", "Expo"]);
    expect(byKey.catDB).toEqual(["PostgreSQL", "MySQL", "MongoDB", "Prisma"]);
  });
});

describe("layoutConstellation", () => {
  const W = 1200;
  const H = 700;
  const layout = layoutConstellation(W, H);

  it("positions core + 6 hubs + all skills", () => {
    const total = 1 + 6 + skillCategories.reduce((n, c) => n + c.skills.length, 0);
    expect(layout.nodes).toHaveLength(total);
    expect(layout.nodes[0].type).toBe("core");
    expect(layout.nodes.filter((n) => n.type === "hub")).toHaveLength(6);
  });

  it("places the core at the center", () => {
    expect(layout.nodes[0].bx).toBeCloseTo(W / 2);
    expect(layout.nodes[0].by).toBeCloseTo(H / 2);
  });

  it("places hubs on the ellipse rx=min(W*0.32,500), ry=H*0.33", () => {
    const rx = Math.min(W * 0.32, 500);
    const ry = H * 0.33;
    for (const hub of layout.nodes.filter((n) => n.type === "hub")) {
      const nx = (hub.bx - W / 2) / rx;
      const ny = (hub.by - H / 2) / ry;
      expect(nx * nx + ny * ny).toBeCloseTo(1, 5);
    }
  });

  it("flips label anchoring by side of the center", () => {
    for (const node of layout.nodes) {
      if (node.type === "core") continue;
      expect(node.right).toBe(node.bx >= W / 2);
    }
  });

  it("builds one core→hub edge per category plus one hub→skill edge per skill", () => {
    const coreEdges = layout.edges.filter((e) => e.a === 0);
    expect(coreEdges).toHaveLength(6);
    expect(layout.edges).toHaveLength(
      6 + skillCategories.reduce((n, c) => n + c.skills.length, 0),
    );
    for (const edge of layout.edges) {
      expect(edge.base).toBe(edge.a === 0 ? 0.3 : 0.16);
      expect(edge.k).toBeTruthy();
    }
  });
});
