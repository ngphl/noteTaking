// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../src/controllers/userController");

// Register route
router.post("/register", userController.register);

// Login route
router.post("/login", userController.login);

// Protected route example
router.get("/me", userController.getUser);

module.exports = router;
