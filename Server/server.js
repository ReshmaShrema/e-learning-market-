const express=require('express');
const morgon=require('morgan');
const cors = require('cors');
const {readdirSync} = require('fs');
const mongoose=require('mongoose');
require('dotenv').config();

//create express app
const app = express();

//apply middleware
app.use(express.json());
app.use(cors());
app.use(morgon('dev'));


//routes
readdirSync('./routes').map((r)=>{
    app.use('/api',require(`./routes/${r}`))
});


//moongoose connection

mongoose
    .connect(process.env.DATABASE, {})
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('DB Error => ', err));





//port
//console.log(process.env.PORT)
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

