var express = require('express');
var router = express.Router();
var Businesses = require('../models/businesses');

// middleware to use for all requests
router.use(function(req,res,next){
  //log request
  console.log("request is happening");
  next(); // go to the next routes and do not stop here

});
// test route to make sure everything is working: url /api
router.get("/", function(req,res){
  res.json({ message: "businesss home"});
});


//---------------------------------------------------
//Routes for businesss

router.route("/all")
    .post(function(req,res){
// create a new instance of the business Model
    var businesses = new Businesses();
    // set the business name ( comes from the request )
    businesses.name = req.body.name;

        // save the business and check for errs
        businesses.save(function(err){
            if(err){
                res.send(err);
            }else{
                res.json({
                    message: 'business Created'
                });
            }
        });

})
    // get all of the businesss
    .get(function(req,res){
        Businesses.find(function(err,businesses){
            if(err){
                res.send(err);
            }else{
                res.json(businesses);
            }
        });
    });
router.route('/all/:business_id')
    // get a single business
    .get(function(req,res){
       Businesses.findById(req.params.business_id, function(err,business){
          if(err){
              res.send(err);
          }else{
              res.json(business);
          }
       });
    })
    //update business entry
    .put(function(req, res){
        Businesses.findById(req.params.bear_id, function(err, business){
            if(err){
                res.send(err);
            }else{
                businesses.name = req.body.name;
            }

            businesses.save(function(err){
                if(err){
                    res.send(err);
                }else{
                    business.json({message: 'business updated'});
                }
            });
        });
    })
    // delete business entry
    .delete(function(req, res){
        Businesses.remove({
            _id: req.params.business_id
        }, function(err, business){
            if(err){
                res.send(err);
            }else{
                business.json({message: 'business deleted'});
            }
        });
    });


//---------------------------------------------------

module.exports = router;