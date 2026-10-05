const jwt = require("jsonwebtoken");

const createToken = async ({ userId }) => {
    const accessToken = await jwt.sign(
        { userId },
        process.env.SECRETECODE,
        {
            expiresIn: "1h"
        }
    );
    return accessToken;
};

module.exports = { createToken };