const { SECRET } = require("../util/config");
const jwt = require("jsonwebtoken");

const ActiveSessions =require("../models/session");

const errorHandler = (error, request, response, next) => {
  if (
    error.name === "ValidationError" ||
    error.name === "SequelizeValidationError"
  ) {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "SequelizeDatabaseError") {
    return response.status(400).json({
      error: error.message,
    });
  }
  next(error);
};

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const isTokenActive = await validateToken(authorization.substring(7));
      if(!isTokenActive){
        throw new Error;
      }
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

async function validateToken(token){
  const relevantSession = await ActiveSessions.findByPk(token);

  if(relevantSession){
    return true;
  }else{
    return false;
  }
}

module.exports = {
  errorHandler,
  tokenExtractor,
};
