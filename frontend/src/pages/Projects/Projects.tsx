import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import BackButton from "../../components/BackButton/BackButton";
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

const TEMPLATE_OPTIONS = [
  { value: "custom", label: "Custom" },
  { value: "bathroom", label: "Bathroom Template" },
  { value: "kitchen", label: "Kitchen Template" },
  { value: "flooring", label: "Flooring Template" },
  { value: "appliance", label: "Appliance Template" },
  { value: "lighting", label: "Lighting Template" },
  { value: "outdoor", label: "Outdoor Template" },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [templateType, setTemplateType] = useState(TEMPLATE_OPTIONS[0].value);
  const [projectTemplates, setProjectTemplates] = useState<
    Record<number, string>
  >({});

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
      setProjectTemplates(() => {
        const map: Record<number, string> = {};
        response.forEach((project) => {
          map[project.project_id] = "custom";
        });
        return map;
      });
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
    const trimmed = newProjectName.trim();
    if (!trimmed) {
      alert("Project name cannot be empty!");
      return;
    }

    try {
      const newProject = await createProject(trimmed, DEFAULT_USER_ID);
      setProjects((prev) => [newProject, ...prev]);
      setProjectTemplates((prev) => ({
        ...prev,
        [newProject.project_id]: templateType,
      }));
      setNewProjectName("");
      setTemplateType(TEMPLATE_OPTIONS[0].value);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to add project.");
    }
  }, [newProjectName, templateType]);

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
      setProjectTemplates((prev) => {
        const next = { ...prev };
        delete next[project.project_id];
        return next;
      });
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to delete project.",
      );
    }
  }, []);

  return (
    <div className="projects-page">
      <Header
        title="Projects"
        showTagline={false}
        background="alt"
        leftSlot={<BackButton />}
      />

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
          {TEMPLATE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button className="proj-button" onClick={handleAddProject}>
          Add Project
        </button>
      </div>

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
        {sortedProjects.map((project) => {
          const templateKey = projectTemplates[project.project_id] ?? "custom";
          const templateLabel =
            TEMPLATE_OPTIONS.find((option) => option.value === templateKey)
              ?.label ?? "Custom";

          return (
            <div className="proj" key={project.project_id}>
              <div className="proj-header">
                <h2>{project.project_name}</h2>
                <span className="template-pill">{templateLabel}</span>
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
          );
        })}
      </div>
    </div>
  );
}
