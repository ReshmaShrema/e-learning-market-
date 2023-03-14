const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/auth');


exports.register = async (req, res) => {
    try {
        // console.log(req.body)
        const { name, email, password } = req.body;
        if (!name) return res.status(400).send('Name is required');
        if (!password || password.length < 6) {
            return res
                .status(400)
                .send(
                    'Password is required and should be min 6 charecter long'
                );
        }
        let userExist = await User.findOne({email}).exec();
        if(userExist) return res.status(400).send('Email is taken');
        //hash password
        const hashedPassword = await hashPassword(password);

        //register
        const user= await new User({name,email,password:hashedPassword,}).save();
        return res.json({ok:true});
        //await user.save()
    }catch(err){
    console.log('registration error', err);
        return res.status(400).send('Error,Try Again');
    }
    }
exports.login=async (req,res)=>{
    //check the data is reached 
    //console.log('from login funtion ',req.body);
    
    const{email,password}=req.body;
    //check registered user or not
    try{
        const user=await User.findOne({email}).exec();
        if(!user) return res.status(400).send('No User Found');
        const match =await comparePassword(password,user.password);
      
            const token =jwt.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:'1d',
        });
        //return user token to client ,exclude hashed password
        user.password=undefined;
        //sent tokent through http only cookies,so that cannot access through js in client
        res.cookie('token',token,{
            httpOnly:true,
            //secure:true//only works on https
        });
        //sent json as response
        res.json(user);

    }
    
    catch(err){
        console.log(err);
        return res.status(400).send('Error Try again');
    }
};