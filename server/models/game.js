'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Game.belongsTo(models.User,{foreignKey:"UserId"})
    }
  }
  Game.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Name is required"},
        notEmpty:{msg:"Name is required"}
      }
    },
    gameImg:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Game image is required"},
        notEmpty:{msg:"Game image is required"}
      }
    },
    releaseDate:{
      type:DataTypes.DATE,
      allowNull:false,
      validate:{
        notNull:{msg:"ReleaseDate is required"},
        notEmpty:{msg:"ReleaseDate is required"}
      }
    },
    developer: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Developer name is required"},
        notEmpty:{msg:"Developer name is required"}
      }
    },
    genre: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Genre is required"},
        notEmpty:{msg:"Genre is required"}
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "UserId is required" },
        notEmpty: { msg: "UserId is required" }
      }
    }
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};