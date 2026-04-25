const Item = require('../schemas/item');

// Create a new item
exports.createItem = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newItem = new Item({ name, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
      next(error);
  }
};

// Get all items
exports.getItems = async (req, res, next) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
      next(error);
  }
};

// Get a single item by ID
exports.getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
      next(error);
  }
};

// Update an item by ID
exports.updateItem = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
      next(error);
  }
};

// Delete an item by ID
exports.deleteItem = async (req, res, next) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
      next(error);
  }
};