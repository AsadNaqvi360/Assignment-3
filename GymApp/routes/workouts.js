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

// GET: Fetch a workout by ID for editing
router.get('/edit/:id', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        res.render('editWorkout', { workout });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// POST: Update a workout
router.post('/edit/:id', async (req, res) => {
    const { name, type, sets, reps, restTime } = req.body;

    try {
        await Workout.findByIdAndUpdate(req.params.id, {
            name,
            type,
            sets,
            reps,
            restTime,
        });
        res.redirect('/workouts');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// POST: Delete a workout
router.post('/delete/:id', async (req, res) => {
    try {
        await Workout.findByIdAndDelete(req.params.id);
        res.redirect('/workouts');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
