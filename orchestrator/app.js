const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
const userSchema = require('./schema/userSchema')
const friendSchema = require('./schema/friendSchema')
const socketio = require('socket.io')
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


const http = server.listen().then(({url}) =>{
    console.log(`🚀 Server Go!! ${url}`);
})

const io = socketio(http)

io.on('connection',socket=>{
    console.log(`userId connected :`,socket.id)

    socket.on('create_room',name=>{
        const room = roomName(name)
        socket.join(room)
        socket.emit('new_room',name)
        io.emit('created_room',room)
    })

    socket.on('join_room',data=>{
        socket.join(data.room)
        io.to(data.room).emit('update_player',data.username)
    })
})