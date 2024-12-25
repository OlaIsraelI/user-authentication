// 

const { get } = require("mongoose");
const User = require("../models/userModels");
const bcrypt = require("bcrypt"); // Corrected typo from 'brcypt' to 'bcrypt'

// Create user controller function 
const createNewUser = async (req, res) => {
  // Destructuring user input from the request body
  const { email, password } = req.body;
  try {
    // Check if user already exists
    // This ensures that a user with the same email does not exist in the database
    const userExists = await User.findOne({ email });

    // Return an error message if user already exists
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash encrypted password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user from the User model
    const newUser = new User({ email, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();

    // Check if the user was created successfully
    if (!newUser) {
      return res.status(400).json({ message: "User creation failed" });
    }

    // Return a success message if the user was created successfully
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getCurrentUser = async (req, res) => {
  try{
    const { userId } = req.user;
    const user = await User.findById(userId);

    if(!user){
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "UserFound", user });
  }catch{
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export the createNewUser function
module.exports = { createNewUser, getCurrentUser };
