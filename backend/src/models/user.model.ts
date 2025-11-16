import { db } from "../config/database";

export interface User {
  user_id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  discount: string | null;
  created_at: Date;
}

// for creating a new user (no id / created_at yet)
// what the controller passes in when creating a user
export interface CreateUserParams {
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  email: string;
  discount?: string | null;
}

// create a new user
export async function CreateUser(params: CreateUserParams): Promise<User> {
  const {
    first_name,
    middle_name = null,
    last_name,
    email,
    discount = null,
  } = params;

  const query = `
    INSERT INTO users (first_name, middle_name, last_name, email, discount)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING user_id, first_name, middle_name, last_name, email, discount, created_at;
  `;

  const values = [first_name, middle_name, last_name, email, discount];

  const { rows } = await db.query<User>(query, values);

  const user = rows[0];

  if (!user) {
    throw new Error("Failed to create user.");
  }

  return user;
}

// get a user by id
export async function GetUser(user_id: number): Promise<User | null> {
  const query = `
    SELECT user_id, first_name, middle_name, last_name, email, discount, created_at
    FROM users
    WHERE user_id = $1  
  `;

  const { rows } = await db.query<User>(query, [user_id]);
  return rows[0] ?? null;
}

// get all users
export async function GetAllUsers(): Promise<User[]> {
  const query = `
    SELECT user_id, first_name, middle_name, last_name, email, discount, created_at
    FROM users
    ORDER BY created_at DESC
  `;

  const { rows } = await db.query<User>(query);
  return rows;
}
