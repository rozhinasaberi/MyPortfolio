import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String },
  description: { type: String, required: true },
  github: { type: String },
  image: { type: String }
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
