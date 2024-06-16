const User = require('../models/User.js');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const bcrypt = require('bcryptjs');


const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError('Please provide name, email, and/or password');
    }
    const user = await User.create({...req.body});
    res.status(StatusCodes.CREATED).json({ user });
}

const login = (req, res) => {
res.send('login user')
}

module.exports = {
    register,
    login
}