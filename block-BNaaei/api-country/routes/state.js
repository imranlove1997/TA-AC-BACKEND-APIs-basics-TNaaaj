var express = require('express');
var router = express.Router();
var Country = require('../models/country');
var State = require('../models/state');

router.get('/', (req, res, next) => {
    State.find({}).sort({'population': 1}).exec((err, states) => {
        if(err) return next(err);
        res.status(200).json({states});
    })
});

router.put('/:id/addneighbour', (req, res, next) => {
    let id = req.params.id;
    let {neighbour} = req.body;
    State.findOne({name: neighbour}, (err, state) => {
        if(err) return next(err);
        console.log(state);
        State.findByIdAndUpdate(id, {$push: {neighbour: state.id}}, (err, upstate) => {
            if(err) return next(err);
            console.log(upstate);
            res.status(200).json({upstate});
        })
    })
});


router.get('/:id/neighbours', (req, res, next) => {
    let id = req.params.id;
    State.findById(id).populate('neighbour').exec((err, state) => {
        if(err) return next(err);
        res.status(200).json({neighbours: state.neighbour});
    })
});

router.delete('/:id/remove', (req, res, next) => {
    let id = req.params.id;
    State.findById(id, (err, state) => {
        if(err) return next(err);
        Country.findByIdAndUpdate(state.country, {$pull: {states: id}}, (err, country) => {
            if(err) return next(err);
            res.status(200).json({country});
        })
    })
});


module.exports = router;