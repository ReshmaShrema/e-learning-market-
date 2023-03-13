const mongoose = require('mongoose');
const {Schema} = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require: true,
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 64,
    },
    picture: {
        type: String,
        default: '/avatar.png',
    },
    role: {
        type: [String],
        default: ['Subscriber'],
        enum: ['Subscriber','Instructor','Admin'],
    },
   // stripe_account_id:' ',
    //stripe_seller:{},
    //stripeSession:{},
},{timestamps:true});
//module.export = mongoose.model('User',userSchema);

module.exports = mongoose.model('User', userSchema);