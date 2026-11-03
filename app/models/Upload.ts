
import mongoose, { Schema } from "mongoose";

const UploadSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    notesUrl: {
      type: String,
      trim: true,
      default: "",
    },
    fileUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Upload =
  mongoose.models.Upload ||
  mongoose.model("Upload", UploadSchema);

export default Upload;
