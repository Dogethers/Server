const { User, UserFriendlist } = require("../models");

class friendController {
  static async addFriend(req, res, next) {
    try {
      const newList = {
        UserId: req.userData.id,
        FriendId: req.body.FriendId,
        status: false,
      };
      const data = await UserFriendlist.create(newList);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async friendlist(req, res, next) {
    try {
      const data = await UserFriendlist.findAll({
        where: { FriendId: req.userData.id, status: true },
        include: User,
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async friendRequest(req, res, next) {
    try {
      const data = await UserFriendlist.findAll({
        where: { FriendId: req.userData.id, status: false },
        include: User,
      });
      console.log(data, "ini data");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async accept(req, res, next) {
    console.log(req);
    
    try {
      const changeStatus = {
        status: true,
      };
      const update = await UserFriendlist.update(changeStatus, {
        where: { FriendId: req.userData.id, UserId: req.body.FriendId },
        include: User,
      });
      const newList = {
        FriendId: req.body.FriendId ,
        UserId: req.userData.id,
        status: true,
      };
      const data = await UserFriendlist.create(newList);
      console.log(data)
      res.status(201).json(update);
    } catch (error) {
      console.log(error);
    }
  }

  static async reject(req, res, next) {
    try {
      const reject = await UserFriendlist.destroy({
        where: { FriendId: req.body.FriendId },
      });
      console.log(reject);
      res.status(201).json(reject);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = friendController;
