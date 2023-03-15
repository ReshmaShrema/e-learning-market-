const express=require('express');
const morgon=require('morgan');
const cors = require('cors');
const {readdirSync} = require('fs');
const mongoose=require('mongoose');
require('dotenv').config();
const csrf=require('csurf');
const cookieParser =require('cookie-parser');
//create express app
const app = express();

//apply middleware
app.use(express.json());
app.use(cors());
app.use(morgon('dev'));
app.use(cookieParser());

//routes
readdirSync('./routes').map((r)=>{
    app.use('/api',require(`./routes/${r}`))
});


const csrfProtection = csrf({cookie:true});
app.use(csrfProtection)
app.get('/api/csrf-token',(req,res)=>{
    res.json({csrfToken:req.csrfToken()});
});

//moongoose connection
console.log(process.env.DATABASE);
mongoose
    .connect(process.env.DATABASE, {})
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('DB Error => ', err));





//port
//console.log(process.env.PORT)
const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

