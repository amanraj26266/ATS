import React from "react";
import "./App.css";

export default function Home() {
  return (
    <section className="hero-layout">
      <div className="hero-image">
        <img
          src="https://statics.mylandingpages.co/static/aaafbjvju776ljex/image/443c3de1a43c4f6bb33b8f81fc46a85c.png"
          alt="ATS Illustration"
        />
      </div>

      <div className="form-card home-card">
        <h1>What is an ATS?</h1>
        <p>
          ATS stands for Applicant Tracking System. It's software used by
          recruiters and employers to collect, sort, and filter job
          applications. Most large companies and many smaller ones use an ATS
          to manage hiring at scale.
        </p>

        <h3>Why it matters</h3>
        <p>
          An ATS scans resumes for keywords, skills, and structure. If your
          resume doesn't include the right keywords or is poorly formatted,
          it may never reach a human recruiter. This tool helps you match your
          resume to a job description and highlights missing skills and
          formatting issues.
        </p>

        <h3>How to use this site</h3>
        <ol>
          <li>Click "Get Started" or go to the Analyze page.</li>
          <li>Paste the job description and upload your resume (PDF/DOCX).</li>
          <li>Submit to receive a match score and actionable feedback.</li>
        </ol>
      </div>
    </section>
  );
}
