//@login & register
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../../moudels/user');
const keys = require('../../config/key');
const passport = require('passport');






// const bcrypt = require('bcrypt');
// $route GET api/users/test
// @desc retrun request json
// @access public
router.get('/test',(req,res) => {
    User.find({}).then( data => {
        res.send(data);
    })

});

// $route POST api/users/register
// @desc register
// @register
router.post('/register',(req,res) => {

    console.log(req.body);
    User.findOne({email:req.body.email}).then((user)=>{
        if(user){
            return res.status(400).json("email has already register");
        }
        else{
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                identity:req.body.identity 
            })
            newUser.save().then(()=>{
                console.log("success saved")
                res.send("success");
            }).catch((err)=>{
                res.send(err);
            });
        }
    })
    
})

// $route  POST api/users/login
// @desc return taken jwt passport
// @access login

router.post('/login',(req,res) => {
    const email = req.body.email;
    const psd = req.body.password;
    User.findOne({email}).then((user) => {
        if(!user){
            return res.status(404).json('no user');
        }else{
            if(psd === user.password){
                // return res.status(200).json({msg:'login success'});
                const rule = {id:user.id,name:user.name,identity:user.identity};
                jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token) => {
                    if(err) throw err;
                    res.json({success:true,token:`Bearer ${token}`});
                })
            }else{
                return res.status(400).json('password error');
            }
        }
    }) 
})






// $route  POST api/users/current
// @desc return current user
// @access Private

router.get('/current',passport.authenticate('jwt',{session:false}),(req,res) => {
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity

    });
})





module.exports = router;