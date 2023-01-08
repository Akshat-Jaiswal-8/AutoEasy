import mongoose from "mongoose";

const driverSchema = mongoose.Schema({
  passenger: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  vehicle: {
    type: String,
    required: true,
    unique: true,
  },
});

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;
