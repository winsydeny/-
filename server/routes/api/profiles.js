const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../moudels/profile');

router.get('/test',(req,res) => {
    res.json({msg:'profile works'});
})

// $route POST api/profiles/add
// @desc   return information
// @access Private
router.post('/add',passport.authenticate('jwt',{session:false}),(req,res) => {
    const profileFiles = {};
    // console.log(req.body);
    if(req.body.describe !=''&&req.body.income != ''&& req.body.expend != ''&& req.body.cash != ''&& req.body.remark != ''){
        if(req.body.type) profileFiles.type = req.body.type;
        if(req.body.describe) profileFiles.describe = req.body.describe;
        if(req.body.income) profileFiles.income = req.body.income;
        if(req.body.expend) profileFiles.expend = req.body.expend;
        if(req.body.cash) profileFiles.cash = req.body.cash;
        if(req.body.remark) profileFiles.remark = req.body.remark;

        new Profile(profileFiles).save().then(profile => {
            res.json(profile);
        })
    }else{
        return res.status(400).json('提交错误');
    }

})


// router GET api/profile
//@desc get all info
//@access Private

router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {
    Profile.find().then(profile => {
        if(!profile) return res.status(404).json('no content');
        res.json(profile);
    }).catch(err => res.status(404).json(err));
});


// router GET api/profile
//@desc get single info
//@access Private
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res) => {

    Profile.findOne({_id:req.body.id}).then(profile => {
        if(!profile) return res.status(404).json('no content');
        res.json(profile);
    }).catch(err => res.status(404).json(err));
});

router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
    // console.log(req.params.id);
    Profile.deleteOne({_id:req.params.id}).then(profile => {
        if(!profile) return res.status(404).json('no content');
        res.json('delete success');
    }).catch(err => res.status(404).json(err));
})

module.exports = router;