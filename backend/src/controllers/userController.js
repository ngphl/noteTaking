// src/controllers/userController.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt of 10 rounds
    await db("users").insert({
      username,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User registered successfully" }); // Respond with success message
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Duplicated user" }); // Handle any errors
  }
};

// Authenticate user and return JWT
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db("users").where({ username }).first(); // Find user by username
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Check if user exists and passwords match
      return res.status(401).json({ message: "Invalid credentials" }); // Respond with error if credentials are invalid
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); // Generate JWT
    res.json({ message: "Login successful", token }); // Respond with JWT
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Login failed" }); // Handle any errors
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await db("users").where({ id: req.user.id }).first(); // Find user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // If user is not found, respond with 404
    }
    res.json(user); // Respond with user data
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle any errors
  }
};
