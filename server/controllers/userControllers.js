import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userSchema.js";

//Register user
export const registerUser = async (req, res) => {
  try {
    const saltRounds = 10;

    const { name, email, password } = req.body;

    if ((!name, !email, !password)) {
      return res.status(400).json({
        success: false,
        message: "Name, email or password are missing!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "New user created successfully!" });
  } catch (error) {
    console.error("Error creating new user");
    res.status(500).json({ success: false, error: error.message });
  }
};

//Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email or password is wrong" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched || !user) {
      return res
        .status(400)
        .json({ success: false, message: "Email or password is wrong" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECTER_KEY, {
      expiresIn: "1d",
    });
    res.status(200).json({ success: true, token, user });
  } catch (error) {
    console.error("Error login user");
    res.status(500).json({ success: false, error: error.message });
  }
};

// Logged user
export const loggedUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findOne({ _id: userId });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error logged user:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
