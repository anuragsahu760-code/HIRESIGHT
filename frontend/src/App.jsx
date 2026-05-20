import { useEffect, useState } from "react";

const API_BASE = "http://localhost:4001";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/jobs`)
      .then((response) => response.json())
      .then(setJobs);

    fetch(`${API_BASE}/api/recommendations`)
      .then((response) => response.json())
      .then(setRecommended);

    fetch(`${API_BASE}/api/analytics`)
      .then((response) => response.json())
      .then(setAnalytics);
  }, []);

  useEffect(() => {
    const url = query ? `${API_BASE}/api/jobs?q=${encodeURIComponent(query)}` : `${API_BASE}/api/jobs`;
    fetch(url)
      .then((response) => response.json())
      .then(setJobs);
  }, [query]);

  const spotlightJob = recommended[0];
  const topSkills = analytics ? Object.entries(analytics.topSkills).slice(0, 4) : [];

  return (
    <main className="page">
      <section className="hero-shell">
        <header className="topbar">
          <div className="brand">
            <span className="brand-mark">H</span>
            <div>
              <strong>HireSight</strong>
              <p>Talent intelligence workspace</p>
            </div>
          </div>
          <nav className="nav">
            <a href="#insights">Insights</a>
            <a href="#feed">Live Feed</a>
            <a href="#recommendations">AI Match</a>
          </nav>
        </header>

        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">AI-powered hiring intelligence</p>
            <h1>Turn scattered job feeds into a product-grade discovery experience.</h1>
            <p className="subtitle">
              HireSight blends role ingestion, recommendation scoring, and market analytics
              into one polished workflow for candidates and recruiters.
            </p>
            <div className="hero-actions">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by role, skill, company, or location"
              />
              <button type="button">Book a demo</button>
            </div>
            <div className="hero-badges">
              <span>Multi-source ingestion</span>
              <span>AI ranking layer</span>
              <span>Market analytics</span>
            </div>
          </div>

          <aside className="hero-panel">
            <p className="panel-label">Featured match</p>
            {spotlightJob ? (
              <>
                <h2>{spotlightJob.title}</h2>
                <p>{spotlightJob.company}</p>
                <div className="panel-grid">
                  <article>
                    <span>Location</span>
                    <strong>{spotlightJob.location}</strong>
                  </article>
                  <article>
                    <span>Score</span>
                    <strong>{spotlightJob.recommendationScore}</strong>
                  </article>
                  <article>
                    <span>Experience</span>
                    <strong>{spotlightJob.experience}</strong>
                  </article>
                  <article>
                    <span>Source</span>
                    <strong>{spotlightJob.source}</strong>
                  </article>
                </div>
                <div className="tag-row">
                  {spotlightJob.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </>
            ) : (
              <p>Loading recommendation data...</p>
            )}
          </aside>
        </section>
      </section>

      {analytics && (
        <section className="metrics" id="insights">
          <article>
            <span>Total open roles</span>
            <strong>{analytics.totalJobs}</strong>
            <p>Curated across high-intent hiring channels.</p>
          </article>
          <article>
            <span>Average salary</span>
            <strong>INR {analytics.averageSalary.toLocaleString()}</strong>
            <p>Useful benchmark for early career full-stack roles.</p>
          </article>
          <article>
            <span>Demand snapshot</span>
            <strong>{topSkills.map(([skill]) => skill).join(", ")}</strong>
            <p>Skill clusters showing strongest repetition across listings.</p>
          </article>
        </section>
      )}

      <section className="feature-strip">
        <article>
          <h3>Recommendation engine</h3>
          <p>Scores opportunities against a user profile instead of dumping another static feed.</p>
        </article>
        <article>
          <h3>Recruiter-grade market view</h3>
          <p>Combines source quality, salary signals, and skill repetition into clean insight panels.</p>
        </article>
        <article>
          <h3>Built for extensibility</h3>
          <p>REST APIs and modular service logic make it easy to add new feeds or ranking strategies.</p>
        </article>
      </section>

      <section className="layout">
        <div className="feed-column" id="feed">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Live opportunity stream</p>
              <h2>Fresh roles with cleaner signal.</h2>
            </div>
            <span>{jobs.length} roles shown</span>
          </div>
          <div className="card-grid">
            {jobs.map((job) => (
              <article key={job.id} className="card">
                <div className="card-top">
                  <div>
                    <h3>{job.title}</h3>
                    <p>{job.company}</p>
                  </div>
                  <span className="pill">{job.source}</span>
                </div>
                <div className="card-meta">
                  <span>{job.location}</span>
                  <span>{job.experience}</span>
                  <span>INR {job.salary.toLocaleString()}</span>
                </div>
                <div className="tag-row">
                  {job.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="aside-column" id="recommendations">
          <div className="section-heading">
            <div>
              <p className="eyebrow">AI shortlist</p>
              <h2>Top recommendations</h2>
            </div>
          </div>
          <div className="stack">
            {recommended.slice(0, 3).map((job) => (
              <article key={job.id} className="recommendation">
                <div className="recommendation-top">
                  <strong>{job.title}</strong>
                  <span>{job.recommendationScore}</span>
                </div>
                <p>{job.company}</p>
                <small>{job.location} | {job.tags.join(", ")}</small>
              </article>
            ))}
          </div>

          <section className="skills-panel">
            <p className="panel-label">Most requested skills</p>
            <div className="skills-list">
              {topSkills.map(([skill, count]) => (
                <div key={skill} className="skill-row">
                  <span>{skill}</span>
                  <strong>{count} listings</strong>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
