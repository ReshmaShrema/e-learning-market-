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
