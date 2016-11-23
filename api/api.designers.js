var express = require('express');
var router = express.Router();
var app = express();

//---------------------------------------------------
//Routes for designers

router.route("/designers")
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
router.route('/designers/:designer_id')
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