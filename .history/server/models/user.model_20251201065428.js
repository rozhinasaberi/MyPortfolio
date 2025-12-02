// server/models/user.model.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const RequestSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    description: String,
    stage: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    messages: [
      {
        sender: { type: String, enum: ["user", "admin"] },
        text: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    role: { type: String, default: "user" },
    requestedServices: [RequestSchema],
  },
  { timestamps: true }
);

/* ============================================================
   HASH PASSWORD BEFORE SAVING
=============================================================*/
UserSchema.pre("save", async function (next) {
  // Only hash if password was changed
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("User", UserSchema);
