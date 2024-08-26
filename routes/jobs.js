const express = require('express');
const Job = require('../model/Job');
const authMiddleware = require('../middleware/auth');


const router = express.Router();

// Create a job
router.post('/', authMiddleware, async (req, res) => {
    const { title, description } = req.body;
    try {
        console.log('Creating job:', title, description);
        const newJob = new Job({
            title,
            description,
            user: req.user.id,
        });
        const job = await newJob.save();
        res.json(job);
    } catch (err) {
        console.error('Error creating job:', err.message);
        res.status(500).send('Server error');
    }
});

// Get all jobs for a user
router.get('/', authMiddleware, async (req, res) => {
    try {
        // res.send('Hello server!')
        const jobs = await Job.find({ user: req.user.id });
        res.json(jobs);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/allJobs', authMiddleware, async (req, res) => {
    try {
        const allJobs = await Job.find({});
        res.json(allJobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// Delete a job
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }
        if (job.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await Job.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Job removed' });
    } catch (err) {
        console.error('Error deleting job:', err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;