const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateTime: { type: Date, required: true },
});

module.exports = mongoose.model('Availability', availabilitySchema);
