const { gql } = require('apollo-server')
const axios = require('axios')



const typeDefs = gql`
    type Users{
        id: ID!
        username: String
        email: String
        password: String
        isOnline: Boolean
    }

    type access_token{
        access_token : String
    }

    extend type Mutation{
        userRegister(
            username : String
            email : String
            password : String
            isOnline : Boolean
        ) : access_token
        userLogin( 
            email : String
            password : String
        ) : access_token
        userLogout(id: ID,
            isOnline : Boolean
        ) : Users
    }
`

const resolvers = {
    Mutation  : {
        async userRegister(_, args){
            try {
                const { data } = await axios.post("http://localhost:3000/register", args)
                return data 
            } catch (error) {
                console.log(error)
            }
        },

        async userLogin(_, args){
            try {
                const { data } = await axios.post("http://localhost:3000/login", args)
                console.log(data);
                return data
            } catch (error) {
                console.log(error)
            }
        },

        async userLogout(_, args){
            try {
                const { data } = await axios.patch(`http://localhost:3000/logout/${ars.id}`, args)
                return data 
            } catch (error) {
                console.log(error)
            }
        }
    }
}

module.exports = { typeDefs, resolvers }