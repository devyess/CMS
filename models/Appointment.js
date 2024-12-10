const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateTime: { type: Date, required: true },
    status: { type: String, enum: ['available', 'booked', 'cancelled'], default: 'available' },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
