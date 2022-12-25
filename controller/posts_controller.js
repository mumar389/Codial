const Post=require('../model/post');
module.exports.createPost=function(req,res){
    try {
        Post.create({
            content:req.body.content,
            user:req.user._id
        },function(err,posts){
            if(err){
                // console.log("Error in saving the posts");
                return res.redirect('back');
            }
            // console.log(posts)
            return res.redirect('back');
        })
    } catch (error) {
        console.log(error);
        return res.redirect('back');
        
    }
    
}
//Deleteing the Posts
module.exports.destroy=function(req,res){
    try {
        Post.findById(req.params.id,function(err,posts){
            if(posts.user==req.user.id){
            if(err){
                console.log("Error in deleting the posts");
                return res.redirect('back');
            }
                posts.remove();
                return res.redirect('back');
            }
            else{
                console.log("Unidentified User");
                return res.redirect('back');
            }
        })
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
   
};