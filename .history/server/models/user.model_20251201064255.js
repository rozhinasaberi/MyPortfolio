// server/models/user.model.js
import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  description: String,
  stage: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending"
  },
  messages: [
    {
      text: String,
      sender: { type: String, enum: ["user", "admin"], default: "user" },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "user" },
  phone: String,
  requestedServices: [requestSchema],
}, { timestamps: true });

export default mongoose.model("User", userSchema);
