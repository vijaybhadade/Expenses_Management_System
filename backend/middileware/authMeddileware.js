const jwt = require("jsonwebtoken");


const authenticateUser = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    const error = new Error("Headers does not start with Bearer..");
    error.statusCode = 401;
    throw error;
  }
  try {
    const parts = authorization.split(" ");
  const result= jwt.verify(parts[1], process.env.SECRETECODE);
       req.user=result;//passing userId
    next();
  } catch (error) {
    error = new Error(" token verification Failed!");
    error.statusCode = 401;
    next(error);
  }
};

module.exports = { authenticateUser };
