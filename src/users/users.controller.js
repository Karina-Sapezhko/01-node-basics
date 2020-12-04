
const { UserModel } = require("./users.model");

exports.getCurrentUser = (req, res, next) => {
    const { email, subscription } = req.user;
    res.status(200).send({ email, subscription });
};

exports.updateAvatarUser = async (req, res, next) => {
    try {
        const{user} = req
        const { filename } = req.file;
        const { PORT } = process.env
        const avatarURL = `http://localhost:${PORT}/images/${filename}`
     
        await UserModel.findByIdAndUpdate(user._id, { $set: { avatarURL } });
        res.status(200).send({avatarURL});
    } catch (error) {
        next(error)
    }
    
}