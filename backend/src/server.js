import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json());

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Pixel Forge",
    location: "Remote",
    experience: "0-2 years",
    source: "LinkedIn",
    tags: ["React", "JavaScript", "CSS"],
    salary: 600000
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "DataSpring",
    location: "Bengaluru",
    experience: "1-3 years",
    source: "Naukri",
    tags: ["Node.js", "Express", "MongoDB"],
    salary: 900000
  },
  {
    id: 3,
    title: "Full Stack Engineer",
    company: "ScaleStack",
    location: "Pune",
    experience: "0-2 years",
    source: "Indeed",
    tags: ["React", "Node.js", "PostgreSQL"],
    salary: 1100000
  },
  {
    id: 4,
    title: "AI Product Engineer",
    company: "Nova Labs",
    location: "Hyderabad",
    experience: "1-2 years",
    source: "AngelList",
    tags: ["Python", "LLM", "FastAPI"],
    salary: 1300000
  }
];

const userProfile = {
  skills: ["React", "Node.js", "Python", "FastAPI", "MongoDB"],
  preferredLocations: ["Remote", "Bengaluru", "Hyderabad"]
};

function scoreJob(job, profile) {
  const skillMatches = job.tags.filter((tag) => profile.skills.includes(tag)).length;
  const locationBonus = profile.preferredLocations.includes(job.location) ? 2 : 0;
  const aiBonus = job.tags.includes("LLM") ? 1 : 0;
  return skillMatches * 3 + locationBonus + aiBonus;
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "hiresight-backend" });
});

app.get("/api/jobs", (req, res) => {
  const q = (req.query.q || "").toString().toLowerCase();
  const filtered = jobs.filter((job) => {
    if (!q) {
      return true;
    }

    return [job.title, job.company, job.location, ...job.tags]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });

  res.json(filtered);
});

app.get("/api/recommendations", (_req, res) => {
  const ranked = jobs
    .map((job) => ({
      ...job,
      recommendationScore: scoreJob(job, userProfile)
    }))
    .sort((a, b) => b.recommendationScore - a.recommendationScore);

  res.json(ranked);
});

app.get("/api/analytics", (_req, res) => {
  const averageSalary = Math.round(
    jobs.reduce((sum, job) => sum + job.salary, 0) / jobs.length
  );

  const topSkills = [...jobs.flatMap((job) => job.tags)]
    .reduce((acc, skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
      return acc;
    }, {});

  res.json({
    totalJobs: jobs.length,
    averageSalary,
    topSource: "LinkedIn / Naukri / Indeed / AngelList",
    topSkills
  });
});

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`HireSight backend running on port ${port}`);
});
