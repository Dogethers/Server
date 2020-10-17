const  {User,UserFriendlist} = require('../models')

class friendController {
    static async addFriend(req,res,next){
        const newList = {
            UserId:req.body.UserId,
            FriendId:req.userData.id
        }
        const data = await UserFriendlist.create(newList)
        res.status(201).json(data)
    }

    static async friendlist(req,res,next){
        const data = await UserFriendlist.findAll({where:{FriendId:req.userData.id},include:User})
        res.status(200).json(data)
    }
}

module.exports = friendController