const express=require('express');
const router=express.Router();
const passport=require('passport');
//Importing the controller
const userControl=require('../controller/user_controller');
//handling the routes
router.get('/',userControl.userHome);
router.get('/sign-in',userControl.signin);
router.get('/sign-up',userControl.signup);
//todo handle profile route
router.get('/profile/:id',passport.checkAuthentication,userControl.profile);
router.post('/create',userControl.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),userControl.createSession);
router.get('/sign-out',userControl.signout);
router.post('/update/:id',userControl.updateDetails);
//google login-:
router.get('/auth/google',
passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/google-home',passport.authenticate('google',{
    failureRedirect:'/users/sign-up'}),userControl.googleHome);
//Exporting the router
module.exports=router;