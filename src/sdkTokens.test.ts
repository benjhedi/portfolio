import { describe, expect, it } from "vitest";
// Vite's ?raw imports keep this test free of node:fs, since @types/node is not
// installed and tsc -b type-checks every file under src/.
import themeCss from "@warastudio/theme/style.css?raw";

const sources = import.meta.glob<string>("./**/*.{css,tsx}", {
  query: "?raw",
  import: "default",
  eager: true,
});

const referencePattern = /var\(\s*(--ws-[\w-]+)/g;
const definitionPattern = /(--ws-[\w-]+)\s*:/g;

function collectReferences(files: Record<string, string>): Map<string, string[]> {
  const filesByVariable = new Map<string, string[]>();
  for (const [path, text] of Object.entries(files)) {
    for (const [, name] of text.matchAll(referencePattern)) {
      const paths = filesByVariable.get(name) ?? [];
      if (!paths.includes(path)) paths.push(path);
      filesByVariable.set(name, paths);
    }
  }
  return filesByVariable;
}

function collectDefinitions(css: string): Set<string> {
  return new Set(Array.from(css.matchAll(definitionPattern), ([, name]) => name));
}

describe("SDK tokens", () => {
  it("failsOnUndefinedSdkVariable", () => {
    // index.css holds most references; without it the two inline colors of
    // ContactForm.tsx would keep the test green on a fraction of the site.
    expect(Object.keys(sources), "index.css not collected, check the glob").toContain("./index.css");

    // An emptied stylesheet would hide its references; Vitest does that to
    // CSS modules unless vite.config.ts keeps them.
    const emptyCss = Object.entries(sources)
      .filter(([path, text]) => path.endsWith(".css") && text.trim() === "")
      .map(([path]) => path);
    expect(emptyCss, "CSS read as empty, check test.css in vite.config.ts").toEqual([]);

    const references = collectReferences(sources);
    const definitions = collectDefinitions(themeCss);

    expect(references.size, "no var(--ws-*) found under src/, the collector is broken").toBeGreaterThan(0);
    expect(definitions.size, "no --ws-* defined in @warastudio/theme/style.css").toBeGreaterThan(0);

    const undefinedVariables = [...references]
      .filter(([name]) => !definitions.has(name))
      .map(([name, paths]) => `${name} (${paths.join(", ")})`);

    expect(
      undefinedVariables,
      `SDK variables referenced but not defined by the installed @warastudio/theme: ${undefinedVariables.join("; ")}`,
    ).toEqual([]);
  });
});
