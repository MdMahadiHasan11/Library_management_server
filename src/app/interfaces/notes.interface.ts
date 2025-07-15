import { Types } from "mongoose";

export interface INote {
  address: Address;
  _id?: string; // optional because MongoDB will assign it
  title: string;
  content?: string;
  category?: "work" | "personal" | "other";
  pinned?: boolean;
  tags: {
    label: string;
    color?: string;
  };
  userId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Address {
  city: string;
  zip: number;
}
