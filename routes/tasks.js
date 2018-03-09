var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://gauravp966:qwe123@ds257838.mlab.com:57838/athlete_profile', ['profile_info']);

//Get all profiles
router.get('/profiles', function(req, res, next){
    db.profile_info.find(function(err, profile_info){
        if(err){
            res.send(err);
        }
        res.json(profile_info);
    });
});

//Get single profile
router.get('/profile/:id', function(req, res, next){
    db.profile_info.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, profile){
        if(err){
            res.send(err);
        }
        res.json(profile);
    });
});

//Save Profile
router.post('/profile', function(req, res, next){
    var profile = req.body;
    if(!profile.name){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.profile_info.save(profile, function(err, profile){
            if(err){
                res.send(err);
            }
            res.json(profile);
        });
    }
});

//Delete Profile
router.delete('/profile/:id', function(req, res, next){
    db.profile_info.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, profile){
        if(err){
            res.send(err);
        }
        res.json(profile);
    });
});

//Update Profile
router.put('/profile/:id', function(req, res, next){
    var profile = req.body;
    var updProfile = {};

    if(profile.isDone){
        updProfile.isDone = profile.isDone;
    }
    if(profile.title){
        updProfile.title = profile.title;
    }
    if(!updProfile){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.profile_info.update({_id: mongojs.ObjectId(req.params.id)}, updProfile, {}, function(err, profile){
            if(err){
                res.send(err);
            }
            res.json(profile);
        });
    }


});

module.exports = router;