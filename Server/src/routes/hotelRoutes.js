import { Router } from "express";
import {
  bookHotel,
  cancelBooking,
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotelController.js";
const routes = Router();

// hotel Routes

// Create hotel
routes.post("/", createHotel);

// get hotels
routes.get("/", getHotels);

// get hotel by id
routes.get("/:id", getHotel);

// delete hotel by id
routes.delete("/:id", deleteHotel);

// update hotel by id
routes.patch("/:id", updateHotel);

// book hotel by id
routes.patch("/:id/book", bookHotel);

// book hotel by id
routes.delete("/:id/cancel", cancelBooking);

export default routes;
