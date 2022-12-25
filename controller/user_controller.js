const User=require('../model/user');
module.exports.userHome=function(req,res){
    return res.render('users')
}
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('signin')
}
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('signup')
}
module.exports.createSession=function(req,res){
    return res.redirect('/');
}
module.exports.create=function(req,res){
    try {
        if(req.body.password!=req.body.confirm_password || !req.body.password|| !req.body.confirm_password){
            console.log("Passwords should be same");
            return;
        }
        User.findOne({email:req.body.email},function(err,user){
            if(err){
                console.log("Error in finding the user");
                return;
            }
            if(!user){
                User.create(req.body,function(err,newuser){
                    if(err){
                        console.log("Error in finding the user");
                        return res.redirect('back');
                    }
                    return res.redirect('/users/sign-in');
                })
            }
            else{
                console.log("User with this details already exists");
                return res.redirect('/users/sign-in');
            }
        })
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
    
}
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,users){
        return res.render('profile',{
            all_user:users
        });

    })
}
module.exports.signout=function(req,res){
    req.logout(function(err){
        if(err){
            console.log("Eror in logging out");
            return;
        }
        return res.redirect('/');
    })
}
//For Update
module.exports.updateDetails=function(req,res){
    try {
        if(req.user.id==req.params.id){
            User.findByIdAndUpdate(req.params.id,req.body,function(err,users){
                console.log("Update Success");
                return res.redirect('back');
            })
            }else{
                console.log("Invalid User");
                return res.redirect('back');
            }
    } catch (error) {
        console.log(error);
        return res.redirect('back')
    }
   
}
//google home
module.exports.googleHome= (req,res)=>{
    return res.redirect('/');
}