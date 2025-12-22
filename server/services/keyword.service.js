import natural from "natural";

export const calculateKeywordScore = (resumeText, jobText) => {
  const tfidf = new natural.TfIdf();

  // Add documents
  tfidf.addDocument(jobText);
  tfidf.addDocument(resumeText);

  let score = 0;

  // Measure similarity
  tfidf.tfidfs(resumeText, (i, measure) => {
    score = measure;
  });

  // Normalize score (ATS-friendly)
  const normalizedScore = Math.min(Math.round(score * 10), 100);

  return normalizedScore;
};

export const extractKeywords = (tokens, topN = 20) => {
  const frequency = {};

  tokens.forEach(token => {
    frequency[token] = (frequency[token] || 0) + 1;
  });

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([word]) => word);
};
