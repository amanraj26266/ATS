import React, { useState } from "react";
import App from "./App"; // Analyze page
import Home from "./Home";
import About from "./About";
import "./App.css";

export default function Root() {
  const [page, setPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderPage = () => {
    if (page === "home") return <Home />;
    if (page === "about") return <About />;
    return <App />; // analyze
  };

  return (
    <div className="app-shell">
      <nav className="navbar">
        <div className="nav-inner">
          <h3 className="nav-brand">ATS Resume Analyzer</h3>

          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((s) => !s)}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>

          <ul id="nav-links" className={`nav-links ${mobileOpen ? "open" : ""}`}>
            <li
              onClick={() => {
                setPage("home");
                setMobileOpen(false);
              }}
            >
              Home
            </li>
            <li
              onClick={() => {
                setPage("analyze");
                setMobileOpen(false);
              }}
            >
              Analyze
            </li>
            <li
              onClick={() => {
                setPage("about");
                setMobileOpen(false);
              }}
            >
              About
            </li>
          </ul>
        </div>
      </nav>

      <main className="content-container">{renderPage()}</main>
    </div>
  );
}
