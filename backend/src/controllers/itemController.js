const Item = require('../schemas/item');

// Create a new item (userId comes from auth middleware)
exports.createItem = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const newItem = new Item({ name, description, userId });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
      next(error);
  }
};

// Get all items for authenticated user
exports.getItems = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const items = await Item.find({ userId }).populate('userId', 'login');
    res.json(items);
  } catch (error) {
      next(error);
  }
};

// Get a single item by ID
exports.getItemById = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const item = await Item.findOne({ _id: req.params.id, userId });
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
    const userId = req.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const { name, description } = req.body;
    const updatedItem = await Item.findOneAndUpdate(
      { _id: req.params.id, userId },
      { name, description },
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
    const userId = req.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const deletedItem = await Item.findOneAndDelete({ _id: req.params.id, userId });
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
      next(error);
  }
};