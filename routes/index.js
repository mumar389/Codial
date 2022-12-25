const express=require('express');
const router=express.Router();
//Importing the controller
const homeControl=require('../controller/home_controller');

//handling the routes
router.get('/',homeControl.home);
router.use('/users',require('./users'));
router.use('/post',require('./posts'));
router.use('/comments',require('./comments'));

//Exporting the router
module.exports=router;