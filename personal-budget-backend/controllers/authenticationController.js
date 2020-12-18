const User = require("../models/User");
const jwt = require('jsonwebtoken');

//errors
const handleErrs = (err) => {
console.log(err.message, err.code);
let errors = { email: '', password: '' };

if(err.message === 'incorrect email'){
    errors.email = 'that email is not registered';
}
if(err.message === 'incorrect password'){
    errors.email = 'that password is not correct';
}

//not unique errors
if (err.code === 11000){
    errors.email = 'that email is already under an account';
    return errors;
}

//errors for validation
if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties}) => {
        errors[properties.path] = properties.message;
    })
}

return errors;
}

const maxAge = 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'super secret stuff', {
        expiresIn: maxAge
    });

}
module.exports.isUserAuth = (req, res) =>{
    res.status(202);
}

module.exports.signup_get = (req, res) =>{
    res.status(202);
}

module.exports.signup_post = async (req, res) =>{
    const{ email, password } = req.body;

    try{
       const user = await User.create({ email, password});
       const token = createToken(user._id);
       res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
       res.status(201).json({token, isAuth:true});

    }catch (err){
       const errors = handleErrs(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_get = (req, res) =>{
    res.status(202);
}

module.exports.login_post = async (req, res) =>{
    const{ email, password } = req.body;

    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({isAuth:true, user: user._id, token});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}
module.exports.logout_get = (req, res)=>{
    res.cookie('jwt', '', {maxAge: 1});
    res.json({isAuth:false, token:null});

}