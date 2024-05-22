// src/controllers/noteController.js
const db = require("../config/db");

// Create a new note
exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    const [id] = await db("notes").insert({ title, content, user_id: userId });
    const newNote = await db("notes").where({ id }).first();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all notes for the authenticated user
exports.getNotes = async (req, res) => {
  const userId = req.user.id;
  try {
    const notes = await db("notes").where({ user_id: userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get a specific note for the authenticated user
exports.getNote = async (req,res) => {
  const {id} = req.params;
  const userId = req.user.id;

  try {
    const note = await db("notes").where({id, user_id:userId}).first();
    if (!note) {
      return res.status(404).json({message: "Note not found"});
    }
    res.json(note)
  }
  catch(error) {
    res.status(500).json({error: error.message})
  }
}

// Update a note
exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    const note = await db("notes").where({ id, user_id: userId }).first();
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await db("notes")
      .where({ id })
      .update({ title, content, updated_at: new Date() });
    const updatedNote = await db("notes").where({ id }).first();
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const note = await db("notes").where({ id, user_id: userId }).first();
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await db("notes").where({ id }).del();
    res.status(204).end(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
