// server/models/user.model.js

import mongoose from "mongoose";

const requestedServiceSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  description: { type: String },
  status: { type: String, default: "pending" },
  date: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phone: String,
    password: { type: String, minlength: 6, select: false }

    role: { type: String, default: "user" },

    requestedServices: [requestedServiceSchema]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
