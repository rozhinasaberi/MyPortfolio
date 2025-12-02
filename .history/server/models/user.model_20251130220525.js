import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: "user" },

    projectsBought: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Project" }
    ],

    requestedServices: [
      {
        serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
        description: { type: String },
        createdAt: { type: Date, default: Date.now }
      }
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
