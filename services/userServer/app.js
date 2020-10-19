require("dotenv").config()
const express = require('express')
const app =  express()
const cors = require('cors')
const port = process.env.PORT || 3000
const route = require('./routes')
const errHandler = require('./middlewares/errHandler.js')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(route)
app.use(errHandler)

app.listen(port, ()=>{
    console.log(`${port} radio fm`)
})

module.exports = app
