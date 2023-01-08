import Driver from "../Models/DriverModel.js";
import User from "../Models/UserModel.js";

// for creating a new user
export const createDriver = async (req, res) => {
  try {
    const userDetails = req.body;

    if (userDetails.passenger) {
      res.status(400).json({
        success: false,
        reason: "The driver parameter should be false for creating a driver",
      });
      return;
    }

    const regexExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

    if (!regexExp.test(userDetails.email)) {
      res.status(400).json({
        success: false,
        reason: "Not a valid email!",
      });
      return;
    }

    // create a new user and save it in database
    const newUser = new Driver(userDetails);
    let savedUser = await newUser.save();

    if (!savedUser) {
      res.status(500).json({
        success: false,
        reason: "Could not create account! Connection timed out!",
      });
      return;
    }

    // make a passenger out of driver if not already
    const passenger = await User.findOne({ email: userDetails.email });
    if (!passenger) {
      const newPassenger = new User({
        passenger: true,
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password,
      });
      await newPassenger.save();
    }

    // send success response
    res.json({
      success: true,
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      reason: error.message,
    });
  }
};

// for getting the details of a single driver based on the email and password
export const getDriver = async (req, res) => {
  try {
    const credentials = req.body;
    const email = credentials.email;
    const password = credentials.password;
    const user = await Driver.findOne({ email });

    if (!user) {
      res.status(400).json({
        success: false,
        reason: "Driver not found!",
      });
      return;
    }

    if (password != user.password) {
      res.status(400).json({
        success: false,
        reason: "Invalid credentials",
      });
      return;
    }
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      reason: "Some error occurred! Please try again later",
    });
  }
};

export const getAllDrivers = async (req, res) => {
  const users = await Driver.find();
  res.json({
    success: true,
    data: users,
  });
};
