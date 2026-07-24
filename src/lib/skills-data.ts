export const skillCategories = [
  {
    k: "AI",
    key: "catAI",
    skills: ["Claude API", "GPT-4", "Cursor", "MCP servers", "RAG", "Agentic workflows"],
  },
  {
    k: "FE",
    key: "catFE",
    skills: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    k: "MO",
    key: "catMO",
    skills: ["React Native", "Flutter", "Expo"],
  },
  {
    k: "BE",
    key: "catBE",
    skills: ["Node / Nest", ".NET", "Laravel", "GraphQL", "Microservices", "DDD"],
  },
  {
    k: "CL",
    key: "catCL",
    skills: ["AWS", "Docker", "Serverless", "Stripe", "Plaid"],
  },
  {
    k: "DB",
    key: "catDB",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Prisma"],
  },
] as const;

export type SkillCategory = (typeof skillCategories)[number];
