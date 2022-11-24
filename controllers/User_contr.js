const User=require("../models/user");
module.exports.profile=(req,res)=>{
    if (req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if (user){
                return res.render('userProfile', {
                    title: "User Profile",
                    user: user
                })
            }else{
                return res.redirect('/user/sign-in');

            }
        });
    }else{
        return res.redirect('/user/sign-in');

    }

}

//rendering the signup page 
module.exports.signUp=(req,res)=>{
    return res.render("sign_up",{
        title:"Sign Up page"
    });
};

//rendering the signin page
module.exports.signIn=(req,res)=>{
    return res.render("sign_in",{
        title:"Sign in page"
    });
};
//getting the sign up data
module.exports.userCreated=(req,res)=>{
    if(req.body.password!=req.body.confirm_password){
        return res.redirect("back")
    }
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            console.log("err in creating the signup");
            return;
        }
        if(!user){
            User.create(req.body,(err,user)=>{
                console.log("err in creating user signing up");
                return;
            })
            return res.redirect("/user/sign-in");
        }else{
            return res.redirect("back");
        }

    })
 };
//getting the signed in and creating session for user
module.exports.userSignedIN=(req,res)=>{
    //some steps to authenticate 
    //find the user
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            console.log("there is an error in signing in :",err);
            return;
        }
        if(user){
            if(user.password!=req.body.password){
                return res.redirect("back");
            }
            //handling session creation
            res.cookie("user_id",user.id);
            return res.redirect("/user/profile")
        }else{
            return res.redirect("back");
        }
    })

}