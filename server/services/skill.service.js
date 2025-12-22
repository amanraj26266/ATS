import { SKILLS } from "../utils/skills.js";
import { SKILL_ALIASES } from "../utils/skillAliases.js";
import { getRoleSkills } from "./role.service.js";

const normalize = (token) =>
    SKILL_ALIASES[token.toLowerCase()] || token.toLowerCase();

export const calculateSkillScore = (resumeTokens, jobTokens, role = "none") => {
    // Normalize resume + JD tokens
    const normalizedResume = resumeTokens.map(normalize);
    const normalizedJob = jobTokens.map(normalize);

    const resumeSet = new Set(normalizedResume);
    const jobSet = new Set(normalizedJob);

    // Decide skills source
    const rawSkills =
        role === "none"
            ? SKILLS
            : getRoleSkills(role);

    // 🔑 CRITICAL FIX: normalize skills list
    const skillsToMatch = rawSkills.map(normalize);

    const matchedSkills = [];
    const missingSkills = [];

    skillsToMatch.forEach(skill => {
        const resumeHas = resumeSet.has(skill);
        const jobMentions = jobSet.has(skill);

        if (role === "none") {
            if (jobMentions) {
                resumeHas ? matchedSkills.push(skill) : missingSkills.push(skill);
            }
        } else {
            resumeHas ? matchedSkills.push(skill) : missingSkills.push(skill);
        }
    });


    const total = matchedSkills.length + missingSkills.length;

    const score =
        total === 0
            ? 0
            : Math.round((matchedSkills.length / total) * 100);


    return {
        matchedSkills,
        missingSkills,
        score
    };
};
