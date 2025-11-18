import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema(
  {
    title: {
      // e.g. "Bachelor of Arts in IT", "Dental Hygiene Diploma"
      type: String,
      required: true,
      trim: true,
    },
    organization: {
      // e.g. "York University", "John Abbott College"
      type: String,
      trim: true,
    },
    dateObtained: {
      type: Date, // you can pass "2024-06-01" from frontend
    },
    description: {
      // short line about what this qualification represents
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Qualification = mongoose.model("Qualification", qualificationSchema);

export default Qualification;
