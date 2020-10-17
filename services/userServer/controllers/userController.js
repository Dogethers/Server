const { User } = require('../models')
const { createHash, compareHash } = require('../helpers/bcrypt')
const { generateToken, verifyToken } = require('../helpers/jwt')


class Controller{
    static register = async(req,res,next) => {
        let params = {
            username : req.body.username,
            email : req.body.email, 
            password : req.body.password
        }
        try {
            const userData = await User.create(params)
            const user = {id: userData.id, username: userData.username, email: userData.email}
            return res.status(200).json(user)
        } catch (error) {
            return next(error)
        }
    }

    static login = async(req, res, next) =>{
        let { email, password } = req.body
        
        try {
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
                    return res.status(200).json({access_token: access_token})
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
}

module.exports = Controller