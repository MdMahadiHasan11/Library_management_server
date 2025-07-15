import { Model, Schema, model } from "mongoose";
import {
  IUser,
  IUserInstanceMethods,
  IUserStaticMethods,
} from "../interfaces/users.interface";
import bcrypt from "bcryptjs";
import { Note } from "./notes.model";

// Corrected: Combine model and static interface
type UserModelType = Model<IUser, {}, IUserInstanceMethods> &
  IUserStaticMethods;

const userSchema = new Schema<
  IUser,
  Model<IUser, {}, IUserInstanceMethods>,
  IUserInstanceMethods
>(
  {
    firstName: {
      type: String,
      required: [true, "First name need"],
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    lastName: { type: String, required: true, trim: true },
    age: {
      type: Number,
      required: true,
      min: [18, "Age must be at least 18"],
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => /^[\w-\.]+@gmail\.com$/.test(value),
        message: (props) => `Invalid email format: ${props.value}`,
      },
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "SUPER"],
      default: "USER",
      uppercase: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Instance method
userSchema.method("passwordHash", async function (pass: string) {
  return await bcrypt.hash(pass, 10);
});

// Static method
userSchema.static("passwordHash", async function (pass: string) {
  return await bcrypt.hash(pass, 10);
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});
userSchema.pre("find", async function (next) {
  console.log("inside pre find");
  next();
});

userSchema.post("save", async function (doc) {
  console.log(`User saved: ${doc}`);
});

userSchema.post("findOneAndDelete", async function (doc) {
  console.log(`User updated: ${doc}`);
  if (doc) {
    await Note.deleteMany({ userId: doc._id });
  }
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Export the model with correct type
export const User = model<IUser, UserModelType>("User", userSchema);
