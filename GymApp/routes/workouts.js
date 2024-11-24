const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// GET: Fetch all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.render('workouts', { workouts });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// POST: Add a new workout
router.post('/', async (req, res) => {
    const { name, type, sets, reps, restTime } = req.body;

    try {
        const newWorkout = new Workout({
            name,
            type,
            sets,
            reps,
            restTime,
        });
        await newWorkout.save();
        res.redirect('/workouts');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
