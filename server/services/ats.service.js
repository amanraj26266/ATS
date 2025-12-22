export const calculateFinalATSScore = ({
  keywordScore,
  skillScore,
  sectionScore,
  formattingScore
}) => {
  return Math.round(
    keywordScore * 0.4 +
    skillScore * 0.25 +
    sectionScore * 0.2 +
    formattingScore * 0.15
  );
};
