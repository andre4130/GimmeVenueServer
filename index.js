const express = require("express");
const connectDB = require('./config/db');
const cors = require ('cors');

//in order to start running the application on remote server, type "npm run dev" on command line

//server creation

const app = express();

//connect DB

connectDB();

//enable cors 

app.use(cors());

//create express.json

app.use(express.json({extended: true}));

//app port
const PORT = process.env.PORT || 4000;

// import routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))

//defining the main page
app.get('/', (req, res) => {
    res.send("Hola Mundo");
});

//start app
app.listen(PORT, () => {
    console.log(`server is ready and working at the port ${PORT}`)
})
