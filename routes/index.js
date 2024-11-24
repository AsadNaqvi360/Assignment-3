const express = require('express');
const router = express.Router();

// GET: Render home page
router.get('/', (req, res) => {
    res.render('index', { title: 'GymApp - Home' }); // Pass "title" to the view
});

module.exports = router;
