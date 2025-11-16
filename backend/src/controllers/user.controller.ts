import type { Request, Response } from "express";
import { CreateUser, GetUser, GetAllUsers } from "../models/user.model";

// POST /api/users
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await CreateUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
};

// GET /api/users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await GetAllUsers();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
};

// GET /api/users/:id
const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userIdNum = Number(id);

    if (Number.isNaN(userIdNum)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await GetUser(userIdNum);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
};
