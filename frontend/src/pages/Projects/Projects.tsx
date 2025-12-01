import { useState, useCallback } from "react";
import Header from "../../components/Header/Header";
import "./Projects.css";
import ProjectTotal from "./ProjectTotal";

export default function Projects() {
  // Seed with three projects (or [] if you want to start empty)
  const [projects, setProjects] = useState([
    "Project 1",
    "Project 2",
    "Project 3",
  ]);
const [newProjectName, setNewProjectName] = useState("");
const [templateType, setTemplateType] = useState("custom");

  const handleAddProject = useCallback(() => {
    const trimmed = newProjectName.trim();
    if (!trimmed) {
      alert("Project name cannot be empty!");
      return;
    }

    const exists = projects.some((p) => p.toLowerCase() === trimmed.toLowerCase());
    if (exists) {
      alert("Project already exists!");
      return;
    }

    setProjects((prev) => [...prev, trimmed]);
    setNewProjectName("");
    setTemplateType("custom");
  }, [projects, newProjectName]);

  return (
    <div className="projects-page">
      <Header title="Projects" showTagline={false} background="alt" />

      <div className="add-project-panel">
        <input
          type="text"
          placeholder="Project name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />

        <select
          value={templateType}
          onChange={(e) => setTemplateType(e.target.value)}
        >
          <option value="custom">Custom</option>
          <option value="Bathroom Template">Bathroom Template</option>
          <option value="Kitchen Template">Kitchen Template</option>
          <option value="Flooring Template">Flooring Template</option>
          <option value="Appliance Template">Appliance Template</option>
          <option value="Lighting Template">Lighting Template</option>
          <option value="Outdoor Template">Outdoor Template</option>
        </select>

        <button className="proj-button" onClick={handleAddProject}>
          Add Project
        </button>
      </div>

      <div className="projects-overview">
        {projects.map((name) => (
          <div className="proj" key={name}>
            <h2>{name}</h2>

            {/* Keep ProjectTotal functionality; show for Project 1 (adjust as needed) */}
            {name.toLowerCase() === "project 1" }
            {name.toLowerCase() === "project 2" }
            {name.toLowerCase() === "project 3" }
            <ProjectTotal/>
          </div>
        ))}

      </div>
    </div>
  );
}
