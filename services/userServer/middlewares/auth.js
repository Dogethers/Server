const { verifyToken } = require('../helpers/jwt')
const { User } = require('../controllers/userController.js')

const authentication = async(req,res,next) =>{
    const { access_token } = req.headers
    try {
        const { email, id, username } = verifyToken(access_token)
        let user = await User.findAll({where:{email}})
        if(user){
            req.userData ={ email, id, username}
            next() 
        }else{
            throw{msg:'User Not Authenticated', statusCode: 403}
        }
    } catch (error) {
        console.log('User Not Authenticated ( Inside Catch )')
        return next(error)
    }
}

module.exports = authentication