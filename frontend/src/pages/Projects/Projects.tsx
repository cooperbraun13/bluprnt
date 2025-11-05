import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./Projects.css";

export default function Projects() {
  // State to hold the project list
  const [projects, setProjects] = useState([
    "Project 1",
    "Project 2",
    "Project 3",
  ]); //not sure yet how to make these empty to start

  // Add a new project
  const handleAddProject = () => {
    const projectName = prompt("Add project name:");
    if (!projectName) return;
    for (let i in projects) {
      if (projects[i].toLowerCase() === projectName.toLowerCase()) {
        alert("Project already exists!");
        return; // exit without adding
      }
    }

    // Append to the projects array
    setProjects([...projects, projectName]);
  };

  return (
    <div>
      <Header title="Projects" showTagline={false} background="alt" />
      <button onClick={handleAddProject}>Add Project</button>

      <div className="projects-overview">
        {projects.map((name, index) => (
          <div className="proj" key={index}>
            <h2>{name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
