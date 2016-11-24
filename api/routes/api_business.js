var express = require('express');
var router = express.Router();
var Business = require('../models/business');

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
    var business = new Business();
    // set the business name ( comes from the request )
    business.name = req.body.name;

        // save the business and check for errs
        business.save(function(err){
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
        Business.find(function(err,businesses){
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
       Business.findById(req.params.business_id, function(err,business){
          if(err){
              res.send(err);
          }else{
              res.json(business);
          }
       });
    })
    //update business entry
    .put(function(req, res){
        Business.findById(req.params.bear_id, function(err, business){
            if(err){
                res.send(err);
            }else{
                businesses.name = req.body.name;
            }

            business.save(function(err){
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
        Business.remove({
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