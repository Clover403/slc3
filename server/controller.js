const { signToken } = require("./helpers/jwt");
const { compare } = require("./helpers/bcrypt");
const { User, Game } = require("./models/index");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, name, password } = req.body;
      if (email) {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          throw {
            name: "SequelizeUniqueConstraintError",
            errors: [{ message: "Email must be unique" }],
          };
        }
      }
      const user = await User.create({ email, name, password });

      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
      });
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await User.findOne({
        where: { email },
      });
      if (!data) {
        throw { name: "LoginError" };
      }

      const isValidPassword = compare(password, data.password);
      if (!isValidPassword) throw { name: "LoginError" };
      const payload = {
        id: data.id,
        email: data.email,
      };
      const access_token = signToken(payload);
      res.status(200).json({ access_token });
    } catch (error) {
      next(error)
    }
  }

  static async read(req, res, next) {
    try {
      const data = await Game.findAll({
        include:User
      });

      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async add(req, res, next) {
    try {
      const { userId } = req.loginInfo
      const {name, gameImg, releaseDate, developer, genre} = req.body
      const data = await Game.create({name, gameImg, releaseDate, developer, genre, UserId:userId})
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async delete(req, res, next) {
    try {
      const {id} = req.params
      const data = await Game.findByPk(id)
      if (!data) {throw { name: "Notfound" }}
      await data.destroy()
      res.status(200).json({ message: "Game has been deleted" })
    } catch (error) {
      next(error)
    }
  }
  static async edit(req, res, next) {
    try {
      const {id} = req.params
      const {name, gameImg, releaseDate, developer, genre} = req.body
      const data = await Game.findByPk(id)
      if (!data) {throw { name: "Notfound" }}
      await data.update({name, gameImg, releaseDate, developer, genre})
      
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}
module.exports = Controller;
