import mongoose,{Schema,models,model} from "mongoose";

const UploadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  notesUrl: { type: String },
  fileUrl: { type: String, required: true },
  publicId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Upload ||
  mongoose.model("Upload", UploadSchema);
