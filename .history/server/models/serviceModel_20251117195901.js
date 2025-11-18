import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      // e.g. "fa-code" or a custom icon name you use in frontend
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0, // so you can sort services on the page
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;
