import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    organization: {
      type: String,
      trim: true,
    },
    dateObtained: {
      type: Date,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Qualification = mongoose.model("Qualification", qualificationSchema);

export default Qualification;
