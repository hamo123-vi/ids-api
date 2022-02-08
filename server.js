//Import dependencies
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')

//Load env variables
dotenv.config({ path : './config/config.env'})

//Load routes
const forms = require('./routes/forms');

//Initializing app
const app = express()

//Connect to database
connectDB()

//Body parser
app.use(express.json())

//File upload

//Enable CORS
app.use(cors());

//Mount routers
app.use('/api/forms', forms);

//Create Express server
const PORT = process.env.PORT;
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode in port ${PORT}`))