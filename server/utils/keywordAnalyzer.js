export function analyzeKeywords(resumeText, jobText) {
  //Stopwords list
  const stopwords = new Set([
    "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your",
    "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she",
    "her", "hers", "herself", "it", "its", "itself", "they", "them", "their",
    "theirs", "themselves","and","or","the","a","an","for","to","of","in","on","with",
  "are","is","was","were","be","been","being","this","that",
  "will","shall","should","can","could","would","may","might",
  "we","you","they","he","she","it","as","at","by","from"
  ]);

  // Clean text
  const cleanText = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopwords.has(word));

  const resumeWords = cleanText(resumeText);
  const jobWords = cleanText(jobText);

  const resumeSet = new Set(resumeWords);
  const jobSet = new Set(jobWords);

  // Matched & missing keywords
  const matchedKeywords = [];
  const missingKeywords = [];

  jobSet.forEach(word => {
    if (resumeSet.has(word)) {
      matchedKeywords.push(word);
    } else {
      missingKeywords.push(word);
    }
  });

  // Keyword density
  const densityIssues = [];
  const resumeWordCount = resumeWords.length;

  jobSet.forEach(word => {
    const count = resumeWords.filter(w => w === word).length;
    const density = (count / resumeWordCount) * 100;

    if (density > 0 && density < 0.5) {
      densityIssues.push({
        keyword: word,
        density: density.toFixed(2)
      });
    }
  });

  // Improvement suggestions
  const suggestions = [];

  if (missingKeywords.length > 0) {
    suggestions.push(
      "Add missing job-specific keywords naturally in skills and experience sections."
    );
  }

  if (densityIssues.length > 0) {
    suggestions.push(
      "Increase frequency of important keywords to improve ATS relevance."
    );
  }

  if (matchedKeywords.length > missingKeywords.length) {
    suggestions.push(
      "Good keyword alignment detected. Minor optimizations can boost ATS score further."
    );
  }

  return {
    matchedKeywords: matchedKeywords.slice(0, 20),
    missingKeywords: missingKeywords.slice(0, 20),
    densityIssues,
    suggestions
  };
}
