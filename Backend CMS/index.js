const express = require('express')
const cors = require('cors')
const connection = require('./connection')
const app=express();
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')
const billRoute = require('./routes/bill')
const dashboardRoute = require('./routes/dashboard')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/user',userRouter)
app.use('/category',categoryRouter)
app.use('/product',productRouter)
app.use('/bill',billRoute)
app.use('/dashboard',dashboardRoute)

module.exports = app;