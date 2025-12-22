export const calculateFormattingScore = (resumeText) => {
  let penalty = 0;

  // Tables / columns
  if (resumeText.includes("|") || resumeText.includes("\t")) {
    penalty += 15;
  }

  // Excessive length
  if (resumeText.length > 9000) {
    penalty += 10;
  }

  // Graphics indicators
  if (/image|graphic|icon/i.test(resumeText)) {
    penalty += 10;
  }

  return Math.max(100 - penalty, 0);
};
