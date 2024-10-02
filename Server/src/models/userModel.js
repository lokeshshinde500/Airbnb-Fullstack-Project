import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  booking: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Hotel",
    },
  ],
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
