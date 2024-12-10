const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Assuming User model is the same for students/professors
const Appointment = require('../models/Appointment'); // Appointment model

const router = express.Router();

// Student sign-up
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role: 'student' });
        
        await newUser.save();
        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering student', error });
    }
});

// Student login
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

// View available appointment slots
router.get('/appointments', async (req, res) => {
    try {
        // Assuming you have an "Availability" model that stores professor's available slots
        const appointments = await Appointment.find({ status: 'available' });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error });
    }
});

// Book an appointment
router.post('/appointments', async (req, res) => {
    const { professorId, dateTime } = req.body;

    try {
        const appointment = new Appointment({
            studentId: req.userId,  // Assuming you have JWT token and middleware for authentication
            professorId,
            dateTime,
            status: 'booked',
        });

        await appointment.save();
        res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error booking appointment', error });
    }
});

module.exports = router;
