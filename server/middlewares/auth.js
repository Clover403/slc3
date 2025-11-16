const { Game } = require("../models/index");
const { verify } = require("../helpers/jwt");

const auth = (req, res, next) => {
  try {
    if (req.method === "OPTIONS") {
  return next();
}

    const { authorization } = req.headers;
    if (!authorization) throw { name: "Unauthorized" };

    const access_token = authorization.split(" ")[1];
    const payload = verify(access_token);

    req.loginInfo = {
      usrId: payload.id,
      email: payload.email,
    };
    next();
  } catch (error) {
    next(error);
  }
};

const autz = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { usrId } = req.loginInfo;
    const game = await Game.findByPk(id);
    if (!game) throw { name: 'Notfound' };
    if (usrId !== game.UserId) throw { name: 'Forbidden' };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {auth, autz}
