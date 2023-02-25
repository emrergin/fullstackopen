const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../util/config");
const User = require("../models/user");
const ActiveSessions = require("../models/session");

router.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = body.password === "secret";

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  if (user.disabled) {
    return response.status(401).json({
      error: "account disabled, please contact admin",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  
  const token = jwt.sign(userForToken, SECRET);
  await ActiveSessions.create({token});
  // console.log({ token, username: user.username, name: user.name });
  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

router.delete("/", async (req, res) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")){
    const relatedToken = authorization.substring(7);
    const token = await ActiveSessions.findByPk(relatedToken);
    if(token){
      await token.destroy();
      res.json(token);
    }
  } else {
      return res.status(401);
  }
  } 
);

module.exports = router;