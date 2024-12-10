const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const professorRoutes = require('./routes/professor');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());          // Enable Cross-Origin Request

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.log("Error connecting to MongoDB:", err);
});

// Routes
app.use('/students', studentRoutes);   // Student routes
app.use('/professors', professorRoutes); // Professor routes

// Start server
app.listen(3000);
