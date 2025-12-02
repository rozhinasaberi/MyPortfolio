import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    imageUrl: {
      type: String,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    // Link to a specific customer (optional)
    customerId: {
      type: String,
      default: null,
    },

    customerEmail: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
