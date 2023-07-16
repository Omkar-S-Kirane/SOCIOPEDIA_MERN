import mongoose from "mongoose";

// Define the User schema
const UserSchema = new mongoose.Schema(
  {
    // firstName field
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    // lastName field
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    // email field
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    // password field
    password: {
      type: String,
      required: true,
      min: 5,
    },
    // picture field
    picture: {
      type: String,
      default: "",
    },
    // friends field (an array)
    friends: {
      type: Array,
      default: [],
    },
    // location field
    location: String,
    // occupation field
    occupation: String,
    // viewedProfile field
    viewedProfile: Number,
    // impressions field
    impressions: Number,
  },
  { timestamps: true } // Enable timestamps for createdAt and updatedAt fields
);

// Create the User model
const User = mongoose.model("User", UserSchema);

export default User;