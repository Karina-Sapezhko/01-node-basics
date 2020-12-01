
exports.validate = (scheme, reqPart = 'body') => {
    return (req, res, next) => {
        const result = scheme.validate(req[reqPart]);
        if (result.error) {
            return res.status(400).send(result.error);
        }
        next();
    }
};