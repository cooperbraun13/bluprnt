import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import "./Projects.css";
import ProjectTotal from "./ProjectTotal";
import {
  createProject,
  deleteProject,
  fetchProjects,
  type Project,
  updateProject,
} from "../../api/projects";

type Status = "idle" | "loading" | "error" | "ready";

const DEFAULT_USER_ID = Number(
  import.meta.env.VITE_DEFAULT_PROJECT_USER_ID ?? 1,
);

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => b.project_id - a.project_id),
    [projects],
  );

  const loadProjects = useCallback(async () => {
    try {
      setStatus("loading");
      setErrorMessage("");
      const response = await fetchProjects(DEFAULT_USER_ID);
      setProjects(response);
      setStatus("ready");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to load projects.",
      );
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleAddProject = useCallback(async () => {
    const name = prompt("Add project name:")?.trim();
    if (!name) return;

    try {
      const newProject = await createProject(name, DEFAULT_USER_ID);
      setProjects((prev) => [newProject, ...prev]);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to add project.");
    }
  }, []);

  const handleRenameProject = useCallback(
    async (project: Project) => {
      const nextName = prompt("Rename project:", project.project_name)?.trim();
      if (!nextName || nextName === project.project_name) {
        return;
      }

      try {
        const updated = await updateProject(project.project_id, nextName);
        setProjects((prev) =>
          prev.map((p) => (p.project_id === updated.project_id ? updated : p)),
        );
      } catch (error) {
        alert(
          error instanceof Error ? error.message : "Failed to rename project.",
        );
      }
    },
    [],
  );

  const handleDeleteProject = useCallback(async (project: Project) => {
    const confirmed = confirm(
      `Delete "${project.project_name}"? This cannot be undone.`,
    );
    if (!confirmed) return;

    try {
      await deleteProject(project.project_id);
      setProjects((prev) =>
        prev.filter((p) => p.project_id !== project.project_id),
      );
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to delete project.",
      );
    }
  }, []);

  return (
    <div className="projects-page">
      <Header title="Projects" showTagline={false} background="alt" />

      <button className="proj-button" onClick={handleAddProject}>
        Add Project
      </button>

      {status === "loading" && (
        <p className="projects-message">Loading projects…</p>
      )}
      {status === "error" && (
        <p className="projects-message error">{errorMessage}</p>
      )}
      {status === "ready" && sortedProjects.length === 0 && (
        <p className="projects-message">No projects yet. Add your first one!</p>
      )}

      <div className="projects-overview">
        {sortedProjects.map((project) => (
          <div className="proj" key={project.project_id}>
            <div className="proj-header">
              <h2>{project.project_name}</h2>
            </div>

            <ProjectTotal />

            <div className="proj-actions">
              <button
                type="button"
                className="proj-action-button"
                onClick={() => handleRenameProject(project)}
              >
                Rename
              </button>
              <button
                type="button"
                className="proj-action-button danger"
                onClick={() => handleDeleteProject(project)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
