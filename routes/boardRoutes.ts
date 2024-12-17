import express from 'express';
import Board, { IBoard } from '../models/Board';

const router = express.Router();

// Get all boards
router.get('/', async (req, res) => {
  try {
    const boards = await Board.find();
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching boards', error });
  }
});

// Create a new board
router.post('/', async (req, res) => {
  try {
    const newBoard = new Board(req.body);
    const savedBoard = await newBoard.save();
    res.status(201).json(savedBoard);
  } catch (error) {
    res.status(400).json({ message: 'Error creating board', error });
  }
});

// Update a board
router.put('/:id', async (req, res) => {
  try {
    const updatedBoard = await Board.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!updatedBoard) {
      return res.status(404).json({ message: 'Board not found' });
    }
    res.json(updatedBoard);
  } catch (error) {
    res.status(400).json({ message: 'Error updating board', error });
  }
});

// Delete a board
router.delete('/:id', async (req, res) => {
  try {
    const deletedBoard = await Board.findOneAndDelete({ id: req.params.id });
    if (!deletedBoard) {
      return res.status(404).json({ message: 'Board not found' });
    }
    res.json({ message: 'Board deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting board', error });
  }
});

export default router;

