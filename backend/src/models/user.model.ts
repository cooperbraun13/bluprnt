import { db } from "../config/database";

export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  discount: number;
}

// for creating a new user (no id / created_at yet)
// what the controller passes in when creating a user
export interface CreateUserParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  discount?: number;
}

// create a new user
export async function CreateUser(params: CreateUserParams): Promise<User> {
  const { first_name, last_name, email, password, discount = 0 } = params;

  const query = `
    INSERT INTO users (first_name, last_name, email, password, discount)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING user_id, first_name, last_name, email, password, discount;
  `;

  const values = [first_name, last_name, email, password, discount];

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
    SELECT user_id, first_name, last_name, email, password, discount
    FROM users
    WHERE user_id = $1  
  `;

  const { rows } = await db.query<User>(query, [user_id]);
  return rows[0] ?? null;
}

// get all users
export async function GetAllUsers(): Promise<User[]> {
  const query = `
    SELECT user_id, first_name, last_name, email, password, discount
    FROM users
    ORDER BY user_id DESC
  `;

  const { rows } = await db.query<User>(query);
  return rows;
}
