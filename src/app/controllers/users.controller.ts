import express, { Request, Response } from "express";
import { User } from "../models/users.model";
// import { User } from "../models/user.model"; // Adjust path if needed

export const userRoutes = express.Router();

// Create User
userRoutes.post("/create", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    // const user = await User.create(body);
    // const user = new User(body);
    // const password = await user.passwordHash(body.password);
    // user.password = password;
    // await user.save();

    // const password = await User.passwordHash(body.password);
    const user = await User.create(body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// Get All Users
userRoutes.get("/", async (req: Request, res: Response) => {
  try {
    //   const email = req.query.email as string;
    // const users = await User.find({ email: email ? email : undefined });
    // const users = await User.find();
    // const users = await User.find().sort({ createdAt: -1 });
    // const users = await User.find().limit(100).sort({ createdAt: -1 });
    const users = await User.find();

    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// Get Single User by ID
userRoutes.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// Update User
userRoutes.patch("/:id", async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// Delete User
userRoutes.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});
