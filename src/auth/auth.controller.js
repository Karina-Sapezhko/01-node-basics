const jwt = require('jsonwebtoken');
const { UserModel } = require("../users/users.model");
const bcrypt = require('bcrypt');
const { Conflict, Unauthorized } = require("../helpers/errors");

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const axistingUser = await UserModel.findOne({ email })
        if (axistingUser) {
            throw new Conflict("Email in use")
        }
    
        const passwordHash = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
        const newUser = await UserModel.create({ email, password: passwordHash });
        
        res.status(201).send({
            user: {
                email,
                subscription: newUser.subscription
            }
        });
    } catch (err) {
        next(err)
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email })
        if (!user) {
           throw new Unauthorized('Email or password is wrong')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if ( !isPasswordValid) {
            throw new Unauthorized('Email or password is wrong')
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIPES_IN,
        })
        await UserModel.findByIdAndUpdate(user._id, { $set: { token } });
        
        res.status(200).send({
            token,
            user: {
                email,
                subscription: user.subscription
            }
        });
    } catch (err) {
        next(err)
    }
}

exports.logout = async (req, res, next) => {
    try {
        await UserModel.updateOne({ _id: req.user.id }, { $set: { token: "" } });
        return res.status(204).send();
    } catch (err) {
        next(err)
    }
}