import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_name: String,
  password: String,
  name: Date,
  email: String,
  gender: String,
  mobile: String,
  created_at: Date,
});

const User = mongoose.model("User", userSchema);

export { User };
