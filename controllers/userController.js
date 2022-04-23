
// IMPORT THE DaATABASE SCHEMA
const USER = require('../models/users');

// DISPLAY SIGN UP FORM
module.exports.signup = function(req,res){
   return  res.render('signup');

}

// DISPLAY SIGN IN FORM
module.exports.signin= function(req,res){
    return  res.render('signin');
}

module.exports.createSession = function(req, res){
  //  req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}



//  CHECK AUTHENTICATION 
// module.exports.createsession = async function(req,res){
//     try{
//     if(req.body.email && req.body.password){
//     let user = await USER.findOne({email : req.body.email});
//      console.log(user);
//     if(user && user.password==req.body.password){
//         req.session.loggedin = true;
// 		req.session.username = user.name;
//         return res.redirect('/');
//     } else{
//         return res.redirect('back');
//     }
      
//     }else{
//         res.redirect('back');
//     }}
//     catch(err){
//         console.log(err);
//         return res.redirect('back');
//     }
// }

/// CREATING THE USE AND SAVING THE ENTRY INTO THE DATABSE
module.exports.create = async function(req, res){
    console.log('ok');
    if (req.body.password != req.body.confirm_password){
        console.log(req.body.password);
        console.log(req.body.confirm_password);
        console.log("ok2")
        return res.redirect('back');
    }
try{
   let user = await USER.findOne({email: req.body.email})
   console.log(user);

     if (!user){
           await  USER.create(req.body);
           console.log('created');
           return res.redirect('/signin')
        }else{
            console.log("exist already");
            return res.redirect('back');
        }
    }

  catch(err){
      console.log(err);
  }  
    
}
///  HOME PAGE OF THE SITE
module.exports.home = async function(req,res){
    data = await USER.find();
   // mn = await data.populate('user', 'name').execPopulate();
    return res.render('home',{
         data:data
    })

    //post = await post.populate('user', 'name').execPopulate();
 // return res.render('home');    
}

module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}


module.exports.delete = async function(req,res){
    console.log("delete");
    // console.log(user._id);
    console.log(req.params.id);
    try{
    let user = await USER.findById(req.params.id);
    if(user){
      await  user.remove();
       return res.redirect('/')}
     else{
         console.log("not deleted")
        return res.redirect('/');
    }
} 
catch(err){
    return res.redirect('/')
}
}

module.exports.update = async function(req,res){
    let newid = req.params.id;
    let user = await USER.findById(newid);
    console.log(req.params.id);
    return res.render('update',{
        list:user
    });

}

module.exports.updated= async function(req,res){
 console.log(req.params.id);
 let user = await  USER.findById(req.params.id);
    user.name = req.body.name;
    user.password=req.body.password;
    user.save();
    return res.redirect('/');
       
}