const Post=require('../model/post')
const Comment=require('../model/comment');
module.exports.create=function(req,res){
    try {
        Post.findById(req.body.post,function(err,posts){
            if(posts){
                Comment.create({
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
                },function(err,newcomments){
                    if(err){
                        console.log("Error occured in creating Comments");
                        return res.redirect('back');
                    }
                    posts.comments.push(newcomments);
                    posts.save();
                    return res.redirect('back');
                })
            }
        })
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
   
}
//deleting the comment
module.exports.destroy=function(req,res){
    try {
        Comment.findById(req.params.id,function(err,ncomments){

            if(req.user.id==ncomments.user){
                let id=ncomments.post;
                console.log(id);
                ncomments.remove();
                Post.findByIdAndUpdate(id,{$pull:{comments:req.params.id}},function(err,posts){
                    console.log("Delete Success");
                    return res.redirect('back');
                })
            }else{
                console.log("Invalid User");
                return res.redirect('back');
            }
        })
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
   
}