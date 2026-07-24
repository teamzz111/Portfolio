import { describe, expect, it } from "vitest";
import en from "../../messages/en.json";
import es from "../../messages/es.json";

function flattenKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object") {
      return flattenKeys(value as Record<string, unknown>, path);
    }
    return [path];
  });
}

describe("i18n messages", () => {
  it("en and es have identical key sets", () => {
    expect(flattenKeys(es).sort()).toEqual(flattenKeys(en).sort());
  });

  it("has a non-trivial catalog", () => {
    expect(flattenKeys(en).length).toBeGreaterThan(60);
  });

  it("every message is a non-empty string", () => {
    for (const catalog of [en, es]) {
      for (const key of flattenKeys(catalog)) {
        const value = key
          .split(".")
          .reduce<unknown>(
            (acc, part) => (acc as Record<string, unknown>)[part],
            catalog,
          );
        expect(value, key).toBeTypeOf("string");
        expect((value as string).length, key).toBeGreaterThan(0);
      }
    }
  });

  it("keeps signature copy from the prototype", () => {
    expect(en.hero.eyebrow).toBe("FullStack developer in search of");
    expect(en.hero.beyond).toBe("beyond");
    expect(es.hero.beyond).toBe("más allá");
    expect(en.contact.titleEm).toBe(" outlive us.");
    expect(es.contact.titleEm).toBe(" nos sobrevivan.");
  });
});
