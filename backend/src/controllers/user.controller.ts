import { GetUser, CreateUser, GetAllUsers } from "../models/user.model";
import { Request, Response } from "express";

// create a user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = await CreateUser.create(req.body);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
};

// find all users
const GetAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await GetAllUsers.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
};

// find a user by id
const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await GetUser.findById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
};
