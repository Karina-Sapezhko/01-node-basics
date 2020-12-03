
exports.getCurrentUser = (req, res, next) => {
    const { email, subscription } = req.user;
    res.status(200).send({ email, subscription });
};