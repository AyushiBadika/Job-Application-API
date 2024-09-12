let jobs = [
  //   {
  //     id: "68221dc1-4b8b-4073-8695-bc611b28742b",
  //     skills: ["JavaScript", "React", "Node.js"],
  //     title: "Full Stack Developer",
  //     desc: "Responsible for developing both front-end and back-end components of web applications. Collaborate with designers and other developers to build dynamic web applications.",
  //     salary: "$80,000 - $100,000 per year",
  //   },
  //   {
  //     id: "33506183-cd0b-4501-8c8d-20c83d541f39",
  //     skills: ["Python", "Django", "REST APIs"],
  //     title: "Backend Developer",
  //     desc: "Design and implement scalable backend services using Python and Django framework. Ensure high performance and responsiveness to requests from the frontend.",
  //     salary: "$70,000 - $90,000 per year",
  //   },
  //   {
  //     id: "7d8654a0-0531-455e-890d-a4196b274163",
  //     skills: ["HTML", "CSS", "JavaScript", "Photoshop"],
  //     title: "UI/UX Designer",
  //     desc: "Create user-centered designs by understanding business requirements and user feedback. Design and improve the overall user experience for websites and applications.",
  //     salary: "$60,000 - $75,000 per year",
  //   },
  //   {
  //     id: "08cc9539-4a33-4e9d-b299-6cda7802b679",
  //     skills: ["Java", "Spring Boot", "Microservices"],
  //     title: "Java Developer",
  //     desc: "Develop, test, and maintain web-based applications using Java and Spring Boot. Work on complex back-end logic and microservices architecture for large-scale systems.",
  //     salary: "$85,000 - $105,000 per year",
  //   },
  //   {
  //     id: "0f522c11-7f0e-4ecc-8b56-2dbb125d786b",
  //     skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
  //     title: "DevOps Engineer",
  //     desc: "Automate and streamline operations and processes. Collaborate with software developers to create efficient deployment pipelines and infrastructure management.",
  //     salary: "$95,000 - $120,000 per year",
  //   },
];

import express, { json } from "express";
import { v4 } from "uuid";

const port = 5000;
const app = express();
app.use(json());

// 1. Create a Job Api
app.post("/create", (req, res) => {
  const { title, desc, skills, salary } = req.body;
  jobs.push({ id: v4(), title, desc, skills, salary });

  res.json({ message: "Job created successfully!" });
});
// 2. Update Jobs
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { title, skills, salary, desc } = req.body;

  const jobToUpdate = jobs.find((job) => job.id === id);

  if (jobToUpdate) {
    jobToUpdate.title = title || jobToUpdate.title;
    jobToUpdate.skills = skills || jobToUpdate.skills;
    jobToUpdate.salary = salary || jobToUpdate.salary;
    jobToUpdate.desc = desc || jobToUpdate.desc;
    res.json({ message: "Job updated successfully!" });
  } else {
    res.status(404).json({ message: "Job not found!" });
  }
});
// 3. Delete Jobs

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  jobs = jobs.filter((job) => job.id != id);

  res.json({ message: "Job deleted Successfully!" });
});
// 4. Gets all the Jobs
app.get("/get", (req, res) => {
  res.json(jobs);
});

app.listen(port, () => {
  console.log("Server started at", port);
});
