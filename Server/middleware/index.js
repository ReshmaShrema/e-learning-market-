const expressJWT=require('express-jwt');
exports.requireSignin=expressJWT({
    getToken:(req,res)=>req.cookies.token,
    secret:process.env.JWT_SECRET,
    algorithms:['HS256']
})
