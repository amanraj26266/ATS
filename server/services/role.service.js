export const getRoleSkills = (role) => {
  const ROLE_SKILLS = {
    frontend: ["javascript", "react", "html", "css", "redux"],
    backend: ["node", "express", "mongodb", "sql"],
    fullstack: ["javascript", "react", "node", "express", "mongodb"],
    data: ["python", "pandas", "numpy", "sql"]
  };

  return ROLE_SKILLS[role] || [];
};
