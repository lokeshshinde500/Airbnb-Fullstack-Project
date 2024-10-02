import hotelModel from "../models/hotelModel.js";
import userModel from "../models/userModel.js";

// create hotel
export const createHotel = async (req, res) => {
  try {
    const { name, location, rating } = req.body;

    // All fields are required
    if (!name || !location || !rating) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }

    // Check if hotel already exists
    const existingHotel = await hotelModel.findOne({ name: name });
    if (existingHotel) {
      return res
        .status(400)
        .json({ message: "This hotel is already created!", success: false });
    }

    // create new Hotel
    const newHotel = { name, location, rating };
    const createHotel = await hotelModel.create(newHotel);

    return res.status(201).json({
      message: "Hotel created successfully.",
      hotel: createHotel,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error! createHotel" });
  }
};

// get all hotels
export const getHotels = async (req, res) => {
  try {
    const hotels = await hotelModel.find();

    if (!hotels) {
      return res.status(404).json({
        message: "Hotels not found!",
        success: false,
      });
    }

    return res.status(200).json({
      hotels: hotels,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error! getHotels" });
  }
};

// get hotel by id
export const getHotel = async (req, res) => {
  try {
    const hotel = await hotelModel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        message: "Hotel not found!",
        success: false,
      });
    }

    return res.status(200).json({
      hotel: hotel,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error! getHotel" });
  }
};

// delete hotel by id
export const deleteHotel = async (req, res) => {
  try {
    // Find the hotel by ID
    const hotel = await hotelModel.findById(req.params.id);

    // Check if the hotel exists
    if (!hotel) {
      return res.status(404).json({
        message: "Hotel not found!",
        success: false,
      });
    }

    // Delete the hotel
    await hotelModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Hotel deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error); // Use console.error for error logging
    return res.status(500).json({ message: "Internal server error!" });
  }
};

// update hotel by id
export const updateHotel = async (req, res) => {
  try {
    // Find the hotel by ID
    let hotel = await hotelModel.findById(req.params.id);

    // Check if the hotel exists
    if (!hotel) {
      return res.status(404).json({
        message: "Hotel not found!",
        success: false,
      });
    }

    const { name, location, rating } = req.body;

    // update the hotel

    hotel.name = name || hotel.name;
    hotel.location = location || hotel.location;
    hotel.rating = rating || hotel.rating;

    const updatedHotel = await hotel.save();

    return res.status(200).json({
      message: "Hotel updated successfully.",
      hotel: updatedHotel,
      success: true,
    });
  } catch (error) {
    console.error(error); // Use console.error for error logging
    return res.status(500).json({ message: "Internal server error!" });
  }
};

// book hotel by id
export const bookHotel = async (req, res) => {
  try {
    // Find the hotel by ID
    let hotel = await hotelModel.findById(req.params.id);

    console.log(hotel);
    // Check if the hotel exists
    if (!hotel) {
      return res.status(404).json({
        message: "Hotel not found!",
        success: false,
      });
    }

    // Book the hotel: add the customer ID to the customer array
    await hotelModel.findByIdAndUpdate(
      hotel.id,
      { $addToSet: { customer: req.user.id } },
      { new: true }
    );

    // Update the user booking information
    await userModel.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { booking: hotel.id } },
      { new: true }
    );

    return res.status(200).json({
      message: "Hotel booked successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error); // Use console.error for error logging
    return res.status(500).json({ message: "Internal server error!" });
  }
};

// cancel booking by id
export const cancelBooking = async (req, res) => {
  try {
    // Find the hotel by ID
    let hotel = await hotelModel.findById(req.params.id);

    console.log(hotel);
    // Check if the hotel exists
    if (!hotel) {
      return res.status(404).json({
        message: "Hotel not found!",
        success: false,
      });
    }

    await hotelModel.findByIdAndUpdate(
      hotel.id,
      { $pull: { customer: req.user.id } },
      { new: true }
    );

    await userModel.findByIdAndUpdate(
      req.user.id,
      { $pull: { booking: hotel.id } },
      { new: true }
    );

    return res.status(200).json({
      message: "booking cancelled successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error); // Use console.error for error logging
    return res.status(500).json({ message: "Internal server error!" });
  }
};
