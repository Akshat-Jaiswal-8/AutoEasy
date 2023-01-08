import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    sender_name: {
      type: String,
      required: true,
    },
    sender_email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    sender_message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
