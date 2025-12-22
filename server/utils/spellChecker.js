import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { SKILLS } from "./skills.js";
import { SKILL_ALIASES } from "./skillAliases.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load english words safely (no JSON imports)
const wordsPath = path.join(
  __dirname,
  "../node_modules/an-array-of-english-words/index.json"
);

const englishWords = JSON.parse(fs.readFileSync(wordsPath, "utf-8"));

const englishSet = new Set(englishWords);
const skillSet = new Set(SKILLS);
const aliasSet = new Set(Object.keys(SKILL_ALIASES));

const isIgnorable = (word) => {
  return (
    word.length <= 2 ||
    /\d/.test(word) ||
    word.includes("@") ||
    word.includes(".") ||
    word.startsWith("http")
  );
};

export const detectSpellingIssues = (tokens) => {
  const issues = new Set();

  tokens.forEach((token) => {
    const word = token.toLowerCase();

    if (isIgnorable(word)) return;
    if (englishSet.has(word)) return;
    if (skillSet.has(word)) return;
    if (aliasSet.has(word)) return;

    issues.add(word);
  });

  return Array.from(issues).slice(0, 20);
};
