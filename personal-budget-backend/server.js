const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authenticationRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./middleware/authenticationMiddleware');
const comp = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();

let jsonP = bodyParser.json();
let urlencodedP = bodyParser.urlencoded({ extended: false});
app.use(jsonP);
app.use(urlencodedP);

app.use(cookieParser());


app.use(comp({
    level:6,
    threshold: 0,
    filter:(req, res)=>{
        if(req.headers['x-no-compression']){
            return false;
        }
        return comp.filter(req, res);
    }
}));

app.use(cors({
    origin: 'http://localhost:3000',
    methods:['POST', 'GET','PUT', 'OPTIONS', 'HEAD', 'DELETE'],
    credentials: true
}));

//comeback later
const dbURI = 'mongodb+srv://weswotring:addison1@cluster0.ybyis.mongodb.net/authentication';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTypology: true, useCreateIndex: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//routes attempt from video

/** 
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/dashboard', requireAuth, (req, res) => res.render('dashboard'));
app.use(authenticationRoutes);

*/