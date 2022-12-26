//Importing the necessary libraries
require('dotenv').config();
// const inject=require('@vercel/analytics');

const express=require('express');
const port=7864||process.env.PORT;
const session=require('express-session');
const cookieParser=require('cookie-parser');
const passport=require('passport');
const passportLocal=require('./config/passport_local_strategy');
const GoogleStrategy=require('./config/passport-google-oauth20');
const MongoStore=require('connect-mongo');
//Database Connection
const db=require('./config/mongoose');
const path=require('path')
//calling express as function
const app=express()

//handling form data
app.use(express.urlencoded({extended:true})); 
app.use(cookieParser());
//Express Session
app.use(session({
    name:'codial',
    secret:process.env.SECRET,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({
        mongoUrl:process.env.MONGOURI,
        autoRemove:'disabled',
    },function(err){
        if(err){
            console.log(err || 'Connection Ok');
        }
    })
}));

//Using the tempalate engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//Handling the routes
app.use('/',require('./routes/index'));


// inject();
//listening to the server
app.listen(port,function(err){
    if(err){
        console.log("Error occured in starting the server\n");
        return;
    }
    console.log(`Server is running on port-:${port}`);
})