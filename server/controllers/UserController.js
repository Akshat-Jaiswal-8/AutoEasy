import User from "../Models/UserModel.js";

// for creating a new user
export const createUser = async (req, res) => {
  try {
    const userDetails = req.body;

    if (!userDetails.passenger) {
      res.status(400).json({
        success: false,
        reason: "The person should be a passenger for creating a passenger",
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

    const newUser = new User(userDetails);
    const savedUser = await newUser.save();

    if (!savedUser) {
      res.status(500).json({
        success: false,
        reason: "Could not create account! Connection timed out!",
      });
      return;
    }

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

// for getting the details of a single user based on the email and password
export const getUser = async (req, res) => {
  try {
    const credentials = req.body;
    const email = credentials.email;
    const password = credentials.password;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        success: false,
        reason: "Passenger not found!",
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

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json({
    success: true,
    data: users,
  });
};
