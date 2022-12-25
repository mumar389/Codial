const express=require('express');
const router=express.Router();
const postControl=require('../controller/posts_controller');
const passport=require('passport');
router.post('/create-post',postControl.createPost);
// router.get('/',postControl.getPost);
router.get('/destroy/:id',passport.checkAuthentication,postControl.destroy);



module.exports=router;