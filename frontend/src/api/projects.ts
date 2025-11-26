export type Project = {
  project_id: number;
  project_name: string;
  user_id: number;
};

const API_ROOT = (
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api"
) as string;

const BASE_URL = `${API_ROOT.replace(/\/$/, "")}/projects`;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = "Unable to process request.";
    try {
      const body = await response.json();
      if (body?.message) {
        message = body.message;
      }
    } catch {
      // ignore parse errors
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function fetchProjects(userId?: number): Promise<Project[]> {
  const url = new URL(BASE_URL);
  if (typeof userId === "number") {
    url.searchParams.set("userId", String(userId));
  }
  const response = await fetch(url);
  return handleResponse<Project[]>(response);
}

export async function createProject(
  project_name: string,
  user_id?: number,
): Promise<Project> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project_name, user_id }),
  });
  return handleResponse<Project>(response);
}

export async function updateProject(
  project_id: number,
  project_name: string,
): Promise<Project> {
  const response = await fetch(`${BASE_URL}/${project_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project_name }),
  });
  return handleResponse<Project>(response);
}

export async function deleteProject(project_id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${project_id}`, {
    method: "DELETE",
  });
  await handleResponse<void>(response);
}