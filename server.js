const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9000;

// MongoDB model
const User = require('./models/user');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// HTML routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/end', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'end.html'));
});

// Game routes
app.get('/memory', (req, res) => res.sendFile(path.join(__dirname, 'views', 'memory.html')));
app.get('/rps', (req, res) => res.sendFile(path.join(__dirname, 'views', 'rps.html')));
app.get('/quiz', (req, res) => res.sendFile(path.join(__dirname, 'views', 'quiz.html')));
app.get('/guess', (req, res) => res.sendFile(path.join(__dirname, 'views', 'guess.html')));
app.get('/tictactoe', (req, res) => res.sendFile(path.join(__dirname, 'views', 'tictactoe.html')));
app.get('/snake', (req, res) => res.sendFile(path.join(__dirname, 'views', 'snake.html')));

// Signup handler
app.post('/signup', async (req, res) => {
  const { username, email, phone, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send('<h2>⚠️ This email is already registered. <a href="/">Login</a></h2>');
    }
    const newUser = new User({ username, email, phone, password });
    await newUser.save();
    res.redirect('/');
  } catch (err) {
    console.error('❌ Error signing up:', err);
    res.status(500).send('Internal server error');
  }
});

// Login handler
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send('<h2>❌ No account found. <a href="/signup">Signup here</a></h2>');
    }
    if (user.password !== password) {
      return res.send('<h2>🔑 Incorrect password. <a href="/">Try again</a></h2>');
    }
    res.redirect('/index');
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).send('Internal server error');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
