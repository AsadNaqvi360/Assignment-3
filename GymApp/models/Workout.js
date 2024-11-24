const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name of the workout
    },
    type: {
        type: String,
        required: true, // Type of workout (e.g., cardio, strength)
    },
    sets: {
        type: Number,
        required: true, // Number of sets
    },
    reps: {
        type: Number,
        required: true, // Number of repetitions per set
    },
    restTime: {
        type: Number, // Rest time in seconds between sets
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now, // Automatically set to the current date
    },
});

module.exports = mongoose.model('Workout', WorkoutSchema);
