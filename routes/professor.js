const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Availability = require('../models/Availability'); // Availability model for professor
const bcrypt=require('bcrypt');
const router = express.Router();

// Professor sign-up
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Received data:', req.body);  // Log the incoming request data

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role: 'professor' });
        await newUser.save();
        console.log('Professor created:', newUser);  // Log the newly created user
        res.status(201).json({ message: 'Professor registered successfully' });
    } catch (error) {
        console.error('Error creating professor:', error);  // Log any error that occurs
        res.status(500).json({ message: 'Error registering professor', error });
    }
});


// Professor login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

// Add availability slots
router.post('/availability', async (req, res) => {
    const { professorId, dateTime } = req.body;

    try {
        const newAvailability = new Availability({ professorId, dateTime });
        await newAvailability.save();
        res.status(201).json({ message: 'Availability added' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding availability', error });
    }
});

// Manage appointments
router.get('/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find({ professorId: req.userId });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error });
    }
});

module.exports = router;
