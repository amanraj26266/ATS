const SECTIONS = [
  "experience",
  "education",
  "skills",
  "projects",
  "summary"
];

export const calculateSectionScore = (resumeText) => {
  const lowerText = resumeText.toLowerCase();
  let found = 0;

  SECTIONS.forEach(section => {
    if (lowerText.includes(section)) found++;
  });

  return Math.round((found / SECTIONS.length) * 100);
};
