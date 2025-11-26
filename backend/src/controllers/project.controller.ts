import type { Request, Response } from "express";
import {
  CreateProject,
  DeleteProject,
  GetAllProjects,
  GetProject,
  UpdateProject,
} from "../models/project.model";

const DEFAULT_USER_ID = Number(process.env.DEFAULT_PROJECT_USER_ID ?? 1);

function parseUserId(value: unknown): number | null {
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }
  if (typeof value === "number" && !Number.isNaN(value)) {
    return value;
  }
  return null;
}

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const userId = parseUserId(req.query.userId);
    const projects = await GetAllProjects(userId ?? undefined);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const projectId = Number(req.params.id);
    if (Number.isNaN(projectId)) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    const project = await GetProject(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { project_name, user_id } = req.body ?? {};

    if (typeof project_name !== "string" || !project_name.trim()) {
      return res.status(400).json({ message: "project_name is required" });
    }

    const resolvedUserId = parseUserId(user_id) ?? DEFAULT_USER_ID;

    const project = await CreateProject({
      project_name: project_name.trim(),
      user_id: resolvedUserId,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const projectId = Number(req.params.id);
    if (Number.isNaN(projectId)) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    const { project_name } = req.body ?? {};

    if (typeof project_name !== "string" || !project_name.trim()) {
      return res.status(400).json({ message: "project_name is required" });
    }

    const updated = await UpdateProject(projectId, project_name.trim());

    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const projectId = Number(req.params.id);
    if (Number.isNaN(projectId)) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    const deleted = await DeleteProject(projectId);
    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
};