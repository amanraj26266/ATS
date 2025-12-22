import { extractText } from "../services/parser.service.js";
import { preprocessText } from "../services/nlp.service.js";
import { calculateKeywordScore } from "../services/keyword.service.js";
import { calculateSkillScore } from "../services/skill.service.js";
import { calculateSectionScore } from "../services/section.service.js";
import { calculateFormattingScore } from "../services/formatting.service.js";
import { calculateFinalATSScore } from "../services/ats.service.js";
import { analyzeKeywords } from "../utils/keywordAnalyzer.js";
import { detectSpellingIssues } from "../utils/spellChecker.js";


export const analyzeResume = async (req, res) => {
    try {
        const file = req.file;
        const jobDescription = req.body.jobDescription;
        const role = req.body.role || "none"; // ✅ default = none

        if (!file || !jobDescription) {
            return res.status(400).json({
                error: "Resume file and job description are required"
            });
        }

        // 1. Extract resume text
        const resumeText = await extractText(file);

        // 2. NLP preprocessing
        const resumeTokens = preprocessText(resumeText);
        const jobTokens = preprocessText(jobDescription);
        const spellingIssues = detectSpellingIssues(resumeTokens);
        console.log(`Detected ${spellingIssues.length} spelling issues.`);
        // 3. Score calculations
        const keywordScore = calculateKeywordScore(resumeText, jobDescription);
        const skillResult = calculateSkillScore(resumeTokens, jobTokens, role);
        const sectionScore = calculateSectionScore(resumeText);
        const formattingScore = calculateFormattingScore(resumeText);

        // 4. Final ATS score
        const atsScore = calculateFinalATSScore({
            keywordScore,
            skillScore: skillResult.score,
            sectionScore,
            formattingScore
        });

        // 5. Breakdown
        const breakdown = {
            keywordScore,
            skillScore: skillResult.score,
            sectionScore,
            formattingScore
        };

        // 6. Keyword analysis
        const keywordAnalysis = analyzeKeywords(resumeText, jobDescription);

        // ✅ SINGLE RESPONSE
        return res.status(200).json({
            atsScore,
            roleUsed: role,
            breakdown,
            skills: skillResult,
            keywords: keywordAnalysis,
            spellingIssues
        });

    } catch (error) {
        console.error("ANALYZE ERROR:", error);

        if (!res.headersSent) {
            return res.status(500).json({ error: error.message });
        }
    }
};
