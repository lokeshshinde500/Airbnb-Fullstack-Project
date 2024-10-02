import mongoose, { mongo } from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  rating: {
    type: String,
  },
  customer: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
});

const hotelModel = mongoose.model("Hotel", hotelSchema);
export default hotelModel;
