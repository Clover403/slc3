'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Game,{foreignKey:"UserId"})
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:{
        msg:"Email must be unique"
      },
      validate:{
        notNull:{msg:"Email is required"},
        notEmpty:{msg:"Email is required"},
        isEmail:{msg:"Invalid email format"}
      }
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Name is required"},
        notEmpty:{msg:"Name is required"}
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Password is required"},
        notEmpty:{msg:"Password is required"}
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance) => {
    if (instance.password) {
      instance.password = hash(instance.password);
    }
  });
  User.beforeUpdate((instance) => {
    if (instance.changed('password')) {
      instance.password = hash(instance.password);
    }
  });
  return User;
};