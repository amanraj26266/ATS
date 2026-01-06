import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "https://ats-backend-96r6.onrender.com";

const LABELS = {
  keywordScore: "Keyword Match",
  skillScore: "Hard Skills",
  sectionScore: "Sections",
  formattingScore: "Formatting"
};

function App() {
  // This component is now the Analyze page
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [role, setRole] = useState("fullstack");
  const [atsResult, setAtsResult] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobDescription) {
      alert("Please upload resume and enter job description");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);
    formData.append("role", role);

    try {
      setLoading(true);
      setAtsResult(null);
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: "POST",
        body: formData
      });
      if (!response.ok) throw new Error("Server error");
      const data = await response.json();
      setAtsResult(data);
    } catch (err) {
      console.error(err);
      alert("Backend error. Check server console.");
    }
  };

  const atsScore = atsResult?.atsScore || 0;
  const breakdown = atsResult?.breakdown || {};
  const skills = atsResult?.skills;
  const 

  const donutData = [
    { name: "Score", value: atsScore },
    { name: "Remaining", value: 100 - atsScore }
  ];

  return (
    <div>
      <section className="hero-layout">
        <div className="hero-image">
          <img
            src="https://statics.mylandingpages.co/static/aaafbjvju776ljex/image/443c3de1a43c4f6bb33b8f81fc46a85c.png"
            alt="ATS Illustration"
          />
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Upload Resume (PDF/DOCX)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>

          <div className="form-group">
            <label>Target Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Developer</option>
              <option value="fullstack">Full Stack Developer</option>
            </select>
          </div>

          <div className="form-group">
            <label>Job Description</label>
            <textarea
              rows="6"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description here..."
              required
            />
          </div>

          <button type="submit" disabled={loading} className="analyze-btn">
              {loading ? (
               <span className="loader"></span>
                ) : (
               "Analyze Resume"
              )}
          </button>


        </form>
      </section>

      {atsResult && (
        <>
          <section className="result-card">
            <div className="score-box">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    innerRadius="80%"
                    outerRadius="100%"
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                  >
                    <Cell fill="#4caf50" />
                    <Cell fill="#f0f0f0" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="score-center">
                <div className="score-value">{atsScore}%</div>
                <div className="score-label">MATCH RATE</div>
              </div>
            </div>

            <div className="progress-section">
              {Object.entries(breakdown).map(([key, value]) => (
                <div key={key} className="progress-item">
                  <div className="progress-header">
                    <span>{LABELS[key] || key}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className={`progress-fill ${
                        value >= 70 ? "green" : value >= 40 ? "yellow" : "red"
                      }`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {skills && (
            <section className="skill-card">
              <h3>Role-Based Skill Match</h3>
              <strong>Matched Skills</strong>
              <div className="skill-list">
                {skills.matchedSkills.map((s, i) => (
                  <span key={i} className="skill-chip skill-match">{s}</span>
                ))}
              </div>

              <strong className="skill-heading">Missing Skills</strong>
              <div className="skill-list">
                {skills.missingSkills.map((s, i) => (
                  <span key={i} className="skill-chip skill-miss">{s}</span>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default App;
