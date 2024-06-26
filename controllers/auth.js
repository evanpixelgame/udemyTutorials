const User = require('../models/User.js');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {

    const user = await User.create({ ...req.body });
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({ user: {name: user.name}, token });
}

const login = async (req, res) => {
    console.log('attempting login');
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({ email });
    
    if (!user) {
        throw new UnauthenticatedError('User does not exist. Please provide proper credentials or register a new account');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Incorrect password');
    }

      const token = user.createJWT();

      res.status(StatusCodes.OK).json({user: {name:user.name} , token });
}

module.exports = {
    register,
    login
}