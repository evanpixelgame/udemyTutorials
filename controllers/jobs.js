
const Job = require('../models/Job.js');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');


const getAllJobs = async (req, res) => {
    console.log('trying to get all jobs');
    // get all jobs associated with that user id and then sort by creation date
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({jobs, count:jobs.length});
}
/*
const getJob = async (req, res) => {

    const { user: { userId }, params: { id: jobId } } = req;
    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    })

    if (!job) {
        throw new NotFoundError(`No job with id: ${jobId}`)
    }

    res.status(StatusCodes.OK).json({ job });

}
    */

const getJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId },
    } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  })
  if (!job) {
  throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
}

const updateJob = async (req, res) => {
    const {
        body: {company, position},
        user: { userId },
        params: { id: jobId },
    } = req;

    if (company === '' || position === '') {
        throw new BadRequestError('Company and position fields cannot be empty');
    }

  res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
       const {
        body: {company, position},
        user: { userId },
        params: { id: jobId },
    } = req;

    const job = await Job.findOneAndDelete({
        _id: jobId,
        createdBy: userId,
    });
    
  if (!job) {
  throw new NotFoundError(`No job with id ${jobId}`)
    }
    
  res.status(StatusCodes.OK).send('Job successfully deleted');
}


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}