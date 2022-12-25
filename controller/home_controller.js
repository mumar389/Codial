const Post=require('../model/post');
const User=require('../model/user');
module.exports.home=function(req,res){
    try {
        Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        })
        .exec(function(err,posts){
            User.find({},function(err,users){
            return res.render('home',{
                        post:posts,
                        all_user:users
                    })
                })
        })
    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
  
}
