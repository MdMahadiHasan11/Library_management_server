import { model, Schema } from "mongoose";
import { Address, INote } from "../interfaces/notes.interface";

const addressSchema = new Schema<Address>(
  {
    city: { type: String, required: true },
    zip: { type: Number, required: true },
  },
  {
    _id: false,
  }
);

const noteSchema = new Schema<INote>(
  {
    address: {
      type: addressSchema,
      required: true,
    },
    title: { type: String, required: true, trim: true },
    content: { type: String, default: "" },
    category: {
      type: String,
      enum: ["work", "personal", "other"],
      default: "personal",
    },

    pinned: {
      type: Boolean,
      default: false,
    },
    tags: {
      label: { type: String, required: true },
      color: { type: String, default: "#000000" },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Note = model<INote>("Note", noteSchema);
