require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
require('./crons/monthlyRankCron');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const allowedOrigins = [process.env.CLIENT_URL];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParser());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/auth/google', require('./routes/googleRoutes'));
app.use('/api/problems', require('./routes/ProblemRoute.js'));
app.use('/api/submissions', require('./routes/submissionRoutes'));
app.use('/api/users', require('./routes/userRouter'))
app.use("/api",require('./routes/runRoutes'));
app.use('/api/leaderboard', require('./routes/leaderboardRoutes'));
app.use("/api/ai", require("./routes/aiReviewRoutes"));
app.get('/', (req, res) => {
  res.send("Welcome to the Online Judge API!");
});
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});


