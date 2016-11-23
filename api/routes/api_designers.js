var express = require('express');
var router = express.Router();
var Designer = require('../models/designer');

// middleware to use for all requests
router.use(function(req,res,next){
  //log request
  console.log("request is happening");
  next(); // go to the next routes and do not stop here

});
// test route to make sure everything is working: url /api
router.get("/", function(req,res){
  res.json({ message: "designers home"});
});


//---------------------------------------------------
//Routes for designers

router.route("/all")
    .post(function(req,res){
// create a new instance of the Designer Model
    var designer = new Designer();
    // set the designer name ( comes from the request )
    designer.name = req.body.name;

        // save the designer and check for errs
        designer.save(function(err){
            if(err){
                res.send(err);
            }else{
                res.json({
                    message: 'Designer Created'
                });
            }
        });

})
    // get all of the designers
    .get(function(req,res){
        Designer.find(function(err,designers){
            if(err){
                res.send(err);
            }else{
                res.json(designers);
            }
        });
    });
router.route('/all/:designer_id')
    // get a single designer
    .get(function(req,res){
       Designer.findById(req.params.designer_id, function(err,designer){
          if(err){
              res.send(err);
          }else{
              res.json(designer);
          }
       });
    })
    //update designer entry
    .put(function(req, res){
        Designer.findById(req.params.bear_id, function(err, designer){
            if(err){
                res.send(err);
            }else{
                designer.name = req.body.name;
            }

            designer.save(function(err){
                if(err){
                    res.send(err);
                }else{
                    designer.json({message: 'Designer updated'});
                }
            });
        });
    })
    // delete designer entry
    .delete(function(req, res){
        Designer.remove({
            _id: req.params.designer_id
        }, function(err, designer){
            if(err){
                res.send(err);
            }else{
                designer.json({message: 'Designer deleted'});
            }
        });
    });


//---------------------------------------------------

module.exports = router;