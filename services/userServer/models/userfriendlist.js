'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFriendlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserFriendlist.belongsTo(models.User)
    }
  };
  UserFriendlist.init({
    UserId: DataTypes.INTEGER,
    FriendId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserFriendlist',
  });
  return UserFriendlist;
};