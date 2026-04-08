const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

/* ================= GET ALL ================= */
router.get('/', async (req, res) => {
  try {
    const items = await Inventory.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= ADD ITEM ================= */
router.post('/', async (req, res) => {
  try {
    const item = new Inventory(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ================= UPDATE ITEM ================= */
router.put('/:id', async (req, res) => {
  try {
    const updated = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ================= STOCK IN ================= */
router.put('/:id/in', async (req, res) => {
  try {
    const updated = await Inventory.findByIdAndUpdate(
      req.params.id,
      { $inc: { quantity: 1, stockIn: 1 } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ================= STOCK OUT ================= */
router.put('/:id/out', async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item || item.quantity === 0) {
      return res.status(400).json({ message: 'Out of stock' });
    }

    const updated = await Inventory.findByIdAndUpdate(
      req.params.id,
      { $inc: { quantity: -1, stockOut: 1 } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ================= DELETE ================= */
router.delete('/:id', async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
