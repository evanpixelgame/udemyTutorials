

const getAllJobs = (req, res) => {
    res.send('get all jobs');
}

const getJob = (req, res) => {
    res.send('get a single job');
}

const createJob = (req, res) => {
    console.log(req.user);
    res.json(req.user);
}

const updateJob = (req, res) => {
    res.send('update job');
}

const deleteJob = (req, res) => {
    res.send('delete job');
}


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}