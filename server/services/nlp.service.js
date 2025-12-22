import natural from "natural";
import { removeStopwords } from "stopword";

const tokenizer = new natural.WordTokenizer();

export const preprocessText = (text) => {
  if (!text) return [];

  // 1. Normalize
  const normalized = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ");

  // 2. Tokenize
  let tokens = tokenizer.tokenize(normalized);

  // 3. Remove stopwords
  tokens = removeStopwords(tokens);

  // 4. Remove very short tokens
  tokens = tokens.filter(token => token.length > 2);

  return tokens;
};
