const { User } = require('../models')
const { createHash, compareHash } = require('../helpers/bcrypt')
const { generateToken, verifyToken } = require('../helpers/jwt')


class Controller{
    static register = async(req,res,next) => {
        let params = {
            username : req.body.username,
            email : req.body.email, 
            password : req.body.password,
            isOnline : true
        }
        try {
            const userData = await User.create(params)
            console.log(userData)
            const user = {id: userData.id, username: userData.username, email: userData.email}
            const access_token = generateToken(user)
            console.log(userData, access_token);
            // console.log(update)
            return res.status(200).json({access_token: access_token,username:userData.userame})
        } catch (error) {
            return next(error)
        }
    }

    static login = async(req, res, next) =>{
        let { email, password } = req.body
        try {
            const changeStatus ={
                isOnline : true
            }
            const userLogin = await User.findOne({where: { email }})
            if(!userLogin){
                throw({msg: 'Invalid Email or Password', statusCode: 400})
            }else{
                if(compareHash(password, userLogin.password)){
                    const user = {
                        id: userLogin.id, 
                        email: email,
                        username: userLogin.username
                    }
                    const access_token = generateToken(user)
                    const update = await User.update(changeStatus, {where:{id: userLogin.id}})
                    console.log(update)
                    return res.status(200).json({access_token: access_token,username:userLogin.username})
                }else{
                    console.log(userLogin, 'ini error')
                    throw({msg : "Invalid Email or Password", statusCode: 400})
                }
            }
        } catch (error) {
            console.log(error)
            return next(error)
        }
    }

    static async logout(req,res,next){
        try {
            const changeStatus = {
                isOnline : false
            }
            const data = await User.update(changeStatus, {where:{id: req.params.id}})
            res.status(201).json(data)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Controller