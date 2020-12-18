const jwt = require('jsonwebtoken');
const User = require('../models/User');
const requireAuthentication = (req,res,next)=>{

    const token = req.cookies.jwt;
    //does token exist... is token verified
    if(token){
        jwt.verify(token, 'super secret stuff', (err, decodedToken)=>{
            if(err){
               res.json({
                   isAuth: false, token: null, message: "No Authentication"
               });
            } else {
                res.json({
                    isAuth: true, token: token
                });
                next();
            }
        });
    }else{
        res.json({
            isAuth: false, token: null, message: "No Authentication"
        });
    }
}
/** 
//checking if user is logged in
const checkUser = (req, res, next) =>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'super secret stuff', async (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }else{
        res.locals.user = null;
        next();
    }
}
*/

module.exports = { requireAuthentication};