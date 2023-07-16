import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */

export const register = async (req, res) => {
  try {
    // Destructure the properties from the request body
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt();
    // Hash the password using bcrypt
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new User instance with the provided data
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash, // Store the hashed password in the User instance
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000), // Generate a random viewedProfile value
      impressions: Math.floor(Math.random() * 10000), // Generate a random impressions value
    });

    // Save the newUser instance to the database
    const savedUser = await newUser.save();

    // Send a response with the saved user object
    res.status(201).json(savedUser);
  } catch (err) {
    // Handle any errors that occur during the registration process
    res.status(500).json({ error: err.message });
  }
};

/* LOGIN USER */
export const login = async (req, res) => {
  try {
    // Destructure the email and password from the request body
    const { email, password } = req.body;

    // Find the user with the provided email in the database
    const user = await User.findOne({ email: email });

    // If the user doesn't exist, return a response with a 400 status and a "User does not exist" message
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    // Compare the provided password with the stored hashed password using bcrypt.compare()
    const isMatch = await bcrypt.compare(password, user.password);

    // If the passwords don't match, return a response with a 400 status and an "Invalid Credentials" message
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials." });

    // If the login is successful, generate a JSON Web Token (JWT) with the user's ID as the payload
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Remove the password field from the user object before sending it in the response
    delete user.password;

    // Return a response with a 200 status, the generated token, and the user object
    res.status(200).json({ token, user });
  } catch (err) {
    // Handle any errors that occur during the login process
    res.status(500).json({ error: err.message });
  }
};
