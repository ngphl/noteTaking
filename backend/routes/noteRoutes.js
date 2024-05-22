// src/routes/noteRoutes.js
const express = require("express");
const router = express.Router();
const noteController = require("../src/controllers/noteController");
const authMiddleware = require("../src/middleware/authMiddleware");

// Create a new note
router.post("/", authMiddleware, noteController.createNote);

// Get all notes
router.get("/", authMiddleware, noteController.getNotes);

// Get a note
router.get("/:id", authMiddleware, noteController.getNote);

// Update a note
router.put("/:id", authMiddleware, noteController.updateNote);

// Delete a note
router.delete("/:id", authMiddleware, noteController.deleteNote);

module.exports = router;
