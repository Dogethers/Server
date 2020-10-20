const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
const userSchema = require('./schema/userSchema')
const friendSchema = require('./schema/friendSchema')
const roomName = require('./helper/generateRoomName')
const typeDefs = gql `
    type Query
    type Mutation
`

const schema = makeExecutableSchema({
    typeDefs: [typeDefs, userSchema.typeDefs, friendSchema.typeDefs],
    resolvers: [userSchema.resolvers, friendSchema.resolvers]
})

const server = new ApolloServer({schema})


server.listen().then(({url}) =>{
    console.log(`🚀 Server Go!! ${url}`);
})


