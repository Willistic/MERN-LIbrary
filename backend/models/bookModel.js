import mongoose from "mongoose";

const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publish_Year: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Cat", BookSchema);
