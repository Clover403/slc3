const { signToken } = require("./helpers/jwt");
const { User, Game } = require("./models/index");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, name, password } = req.body;
      if(!email || !password || !name) throw{name:'Badrequest'}

      const data = await User.create({ email, name, password });

      res.status(201).json(data);
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if(!email || !password) throw{name:'Unauthorized'}

      const data = await User.findOne({
        where: { email },
      });
      if (!email) {
        throw { name: "Notfound" };
      }

      if (!compare(data.password, password)) throw { name: "LoginError" };
      const payload = {
        id: data.id,
        email: data.email,
      };
      const access_token = signToken(payload);
      res.status(201).json(access_token);
    } catch (error) {
      next(error)
    }
  }

  static async read(req, res, next) {
    try {
      const data = await Game.findAll({
        include:User
      });

      if (!data) {throw { name: "Notfound" }}
      res.status(200).json({data: data})
    } catch (error) {
      next(error)
    }
  }

  static async add(req, res, next) {
    try {
      const {usrId} = req.loginInfo
      const {name, gameImg, releaseDate, developer, genre} = req.body
      const data = await Game.create({name, gameImg, releaseDate, developer, genre, UserId:usrId})
      delete data.datavalues.createdAt
      delete data.datavalues.updatedAt
      res.status(200).json(data)
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

      res.status(200).json("Game has been deleted")
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
