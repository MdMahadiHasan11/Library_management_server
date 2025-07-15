import express, { Request, Response } from "express";
import { Note } from "../models/notes.model";
import z, { success } from "zod";
// import { Note } from "../models.model";

export const noteRoutes = express.Router();

const createUserZodSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
  category: z.enum(["work", "personal", "other"]).optional(),
  pinned: z.boolean().default(false),
  tags: z.object({
    label: z.string(),
    color: z.string().default("#000000").optional(),
  }),
  userId: z.string(),
  address: z.object({
    city: z.string(),
    zip: z.number(),
  }),
});

//way 1
// noteRoutes.post("", async (req: Request, res: Response) => {
//   try {
//     const myNote = new Note({
//       title: "Learning Typescript",
//       tags: { label: "typescript", color: "#000000" },
//     });

//     await myNote.save();

//     res.status(201).json({
//       success: true,
//       mesage: "Note created successfully",
//       note: myNote,
//     });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

//way-2

noteRoutes.post("/create", async (req: Request, res: Response) => {
  try {
    const body = await createUserZodSchema.parseAsync(req.body); // req.body;

    const note = await Note.create(body);

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

noteRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const note = await Note.find().populate("userId");

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

noteRoutes.get("/:id", async (req: Request, res: Response) => {
  try {
    //way-1
    //  const note = await Note.findById(req.params.id);  // mongodb id only use

    //way-2
    const note = await Note.findOne({ _id: req.params.id });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

noteRoutes.patch("/:id", async (req: Request, res: Response) => {
  try {
    const updateBody = req.body;
    const id = req.params.id;
    // const note = await Note.updateOne(
    //   { _id: req.params.id },
    //   updateBody,
    //   {
    //     new: true,
    //   }
    // );

    //way-2
    // const note = await Note.findOneAndUpdate(
    //   { _id: req.params.id },
    //   updateBody,
    //   {
    //     new: true,
    //   }
    // );

    const note = await Note.findByIdAndUpdate(id, updateBody, {
      new: true,
    });

    res.status(201).json({
      success: true,
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

noteRoutes.delete("/:id", async (req: Request, res: Response) => {
  try {
    const updateBody = req.body;
    const id = req.params.id;
    // const note2 = await Note.deleteOne({ _id: req.params.id });

    //way - 2;
    // const note1 = await Note.findOneAndDelete({ _id: req.params.id });

    const note = await Note.findByIdAndDelete(id);

    res.status(201).json({
      success: true,
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});
