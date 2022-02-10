//Import dependencies
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const path = require('path')
const fileUpload = require('express-fileupload')

//Load env variables
dotenv.config({ path : './config/config.env'})

//Load routes
const forms = require('./routes/forms');

//Initializing app
const app = express()

//Connect to database
connectDB()

//Make 'public' folder static
app.set("view.engine", 'ejs')
app.use(express.static('public'))

//Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//File upload
app.use(fileUpload())

//Enable CORS
app.use(cors());

//Mount routers
app.use('/api/forms', forms);

//Create Express server
const PORT = process.env.PORT;
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode in port ${PORT}`))