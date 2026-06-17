const User = require('../schemas/user');
const bcrypt = require('bcryptjs');

// Create a new user
exports.createUser = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const existingUser = await User.findOne({ login });
    if (existingUser) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ login, password: hashedPassword });
    await newUser.save();
    // Return sanitized user (no password)
    res.status(201).json({ id: newUser._id, login: newUser.login, createdAt: newUser.createdAt });
  } catch (error) {
    next(error);
  }
};

// Login a user
exports.loginUser = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Sign JWT and return token + sanitized user
    const secret = process.env.JWT_SECRET || 'dev-secret';
    const token = require('jsonwebtoken').sign({ id: user._id }, secret, { expiresIn: '7d' });
    const safeUser = { id: user._id, login: user.login, createdAt: user.createdAt };
    res.json({ message: 'Login successful', token, user: safeUser });
  } catch (error) {
    next(error);
  }
};

// Get all users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Get a single user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Update a user by ID
exports.updateUser = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const updateFields = {};
    if (login) updateFields.login = login;
    if (password) updateFields.password = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};