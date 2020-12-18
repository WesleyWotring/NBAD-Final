const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email address'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Please make password more than 8 characters']
    },
});


//function before doc is saved
userSchema.pre('save', async function(next){
const salt = await bcrypt.genSalt();
this.password = await bcrypt.hash(this.password, salt);
next();
});

//method to login the user
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email });
    if(user){
       const authenticate = await bcrypt.compare(password, user.password);
       if(authenticate){ 
           return user;
       }
       throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('user', userSchema);
module.exports = User;