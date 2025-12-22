import React from "react";
import "./App.css";

export default function About() {
  return (
    <section className="hero-layout about-page">
      <div className="form-card about-card">
        <h2>About the Developer</h2>
        <p>
          Aman Raj — Full‑stack developer and creator of ATS Resume Analyzer.
          Passionate about developer tooling and helping job seekers improve
          their chances with data-driven resume feedback.
        </p>

        <h3>Contact</h3>
        <p>
          Email: aman.12106020@gmail.com
          <br />
          Portfolio: https://portfolio-aman-9myc.onrender.com/
        </p>

        <h3>Source & Feedback</h3>
        <p>
          The project is open for improvements — if you have suggestions or
          issues, please reach out via email.
        </p>
      </div>
    </section>
  );
}
