import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  password: {
    type: String,
  }
});
const userModel = mongoose.model("User", userSchema);
export default userModel;
