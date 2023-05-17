var express = require('express');
var Profile = require('../models/profile');
var router = express.Router();


router.get('/', function(req, res){
    console.log('getting all Profile');
    Profile.find({}).exec(function(err, profiles){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(profiles);
            res.json(profiles);
        }
    });
});

router.get('/:id', function(req, res){
    console.log('profile by id');
    Profile.findOne({
        _id: req.params.id
    }).exec(function(err, profile){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(profile);
            res.json(profile);
        }
    });
});

router.post('/', function(req, res){
    var newProfile = new Profile();
    newProfile.title = req.body.title;
    newProfile.save(function(err, profile){
        if(err) {
            res.send('error saving profile',err);
        } else {
            console.log(profile);
            res.send(profile);
        }
    });
});

router.put('/:id', function(req, res){
    Profile.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            title: req.body.title
        }
    },{
        upsert: true
    },function(err, newProfile){
        if(err) {
            res.send('error updating Profile');
        } else {
            console.log(newProfile);
            res.send(newProfile);
        }
    });
});

router.delete('/:id', function(req, res){
    Profile.findByIdAndRemove({
        _id: req.params.id
    },function(err, profile){
        if(err) {
            res.send('error deleting profile');
        } else {
            console.log(profile);
            res.send(profile);
        }
    });
});

module.exports = router;