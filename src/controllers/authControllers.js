// 

const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login user function
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiration
    });

    return res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// Logout user function
const logoutUser = (req, res) => {
  // Here you can implement logout functionality, like invalidating tokens.
  return res.status(200).json({ message: "Logged out successfully" });
};

// Generate new access token function
const generateNewAccessToken = (req, res) => {
  const refreshToken = req.body.token; // Assuming you pass the refresh token in the body
  if (!refreshToken) {
    return res.sendStatus(401);
  }

  // Verify refresh token (you may have to implement refresh token logic)
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    // Generate a new access token
    const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ accessToken: newAccessToken });
  });
};

// Export the functions
module.exports = { loginUser, logoutUser, generateNewAccessToken };
