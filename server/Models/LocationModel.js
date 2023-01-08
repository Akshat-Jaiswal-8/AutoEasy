import mongoose from "mongoose";

const locationSchema = mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
      unique: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    driver: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Location = mongoose.model("Location", locationSchema);

export default Location;
