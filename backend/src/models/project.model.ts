import { db } from "../config/database";

export interface Project {
  project_id: number;
  project_name: string;
  user_id: number;
}

// for creating a new project (no id / created_at yet)
// what the controller passes in when creating a project
export interface CreateProjectParams {
  project_id: number;
  project_name: string;
  user_id: number;
}

// create a new project
export async function CreateProject(params: CreateProjectParams): Promise<Project> {
  const {
    project_name
  } = params;

  const query = `
    INSERT INTO projects (project_name)
    VALUES ($1)
    RETURNING project_id, project_name
  `;

  const values = [project_name];

  const { rows } = await db.query<Project>(query, values);

  const project = rows[0];

  if (!project) {
    throw new Error("Failed to create user.");
  }

  return project;
}

// get a project by id
export async function GetProject(project_id: number): Promise<Project | null> {
  const query = `
    SELECT project_id, project_name
    FROM projects
    WHERE project_id = $1  
  `;

  const { rows } = await db.query<Project>(query, [project_id]);
  return rows[0] ?? null;
}

// get all projects
export async function GetAllUsers(): Promise<Project[]> {
  const query = `
    SELECT project_id, project_name
    FROM projects
    ORDER BY created_at DESC
  `;

  const { rows } = await db.query<Project>(query);
  return rows;
}
