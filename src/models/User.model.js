import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    username: { type: String, min: 6, max: 32, required: true, trim: true },
    password: { type: String, min: 6, max: 32, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("User", userSchema);
