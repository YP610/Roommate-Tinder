/*
const express = require('express');
const app = express();
const port = 5000;

// Example route for items
app.get('/items', (req, res) => {
  // Simulate data, replace with your MongoDB query or actual data
  const items = [
    { name: 'Item 1', description: 'Description of item 1' },
    { name: 'Item 2', description: 'Description of item 2' },
    { name: 'Item 3', description: 'Description of item 3' }

  ];
  res.json(items);  // Send items as JSON response
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
*/

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

// Middleware
app.use(express.json()); // Parse JSON bodies

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/roommate-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(error => console.log("MongoDB connection error:", error));

// User Schema and Model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cleanliness: { type: Number, min: 1, max: 5, required: true },
  areaOfResidence: { type: String, enum: ['Southwest', 'Central', 'Orchard Hill', 'Northeast', 'Sylvan'], required: true },
  hobbies: { type: String, required: false },
  preferences: {
    location: String,
    lifestyle: String,
    personalityTraits: [String],
    budgetRange: String,
  },
  matchedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

// Password hashing
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password validation method
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

// Routes

// Signup Route
app.post('/signup', async (req, res) => {
  const { email, username, password, cleanliness, areaOfResidence, hobbies, preferences } = req.body;
  try {
    const newUser = new User({ email, username, password, cleanliness, areaOfResidence, hobbies, preferences });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.isValidPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Roommate Matching Route
app.get('/matches/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const matches = await User.find({
      _id: { $ne: user._id },
      'preferences.location': user.preferences.location,
      'preferences.cleanliness': user.preferences.cleanliness,
      'preferences.hobbies': user.preferences.hobbies,
    });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Example Route for Items (Test Route)
app.get('/items', (req, res) => {
  const items = [
    { name: 'Item 1', description: 'Description of item 1' },
    { name: 'Item 2', description: 'Description of item 2' },
    { name: 'Item 3', description: 'Description of item 3' },
    { name: 'Item 4', description: 'Description of item 4' }

  ];
  res.json(items);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

