const API_KEY = "8a60348b-d4a4-564a-9b45-aab518adb7f4";

const authMiddleware = (req, res, next) => {
    const apiauthkey = req.header("apiauthkey");
    if (!apiauthkey) {
        return res.status(401).send({message: "Access denied, apiauthkey is missing"});
    }

    if (apiauthkey !== API_KEY) {
        return res.status(401).send({message: "Failed to authenticate apiauthkey"});
    }
    next();
}

module.exports = authMiddleware