import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: String,
    icon: String,
  },
  { timestamps: true }
);

export default mongoose.model("Service", ServiceSchema);
