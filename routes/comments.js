const express=require('express');
const router=express.Router();
const commentControl=require('../controller/comment_controller');
const passport=require('passport');
router.post('/create',commentControl.create);
router.get('/destroy/:id',passport.checkAuthentication,commentControl.destroy);




//Exporting the router
module.exports=router;