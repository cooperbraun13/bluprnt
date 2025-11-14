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
export async function createUser(params: CreateUserParams): Promise<User> {
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
  return rows[0];
}

// get a user by id

// get all users
