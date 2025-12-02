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
      
      type: String,
      trim: true,
    },
    order: {
      tyimport mongoose from "mongoose";

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
      
          // 🔥 NEW: Attach service to a specific customer
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
      pe: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;
