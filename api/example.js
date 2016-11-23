//@todo create a CRUD Api without knowing defined models
var express = require('express');
var router = express.Router();
var app = express();

var Designer = require('./models/designers');
var model_all;
var model_single;

//--------------------------------
//grab designers and add a designer
router.route("/designers")
    .post(function(req,res){
// create a new instance of the Designer Model
    var designer = new Designer();
    // set the designer name ( comes from the request )
    designer.name = req.body.name;

        // save the designer and check for errors
        designer.save(function(error){
            if(error){
                res.send(error);
            }else{
                res.json({
                    message: 'Designer Created'
                });
            }
        });

})
    // get all of the designers
    .get(function(req,res){
        Designer.find(function(error,designers){
            if(error){
                res.send(error);
            }else{
                res.json(designers);
            }
        });
    });
router.route('/designers/:designer_id')
    // get a single designer
    .get(function(req,res){
       Designer.findById(req.params.designer_id, function(error,designer){
          if(error){
              res.send(error);
          }else{
              res.json(designer);
          }
       });
    })
    //update designer entry
    .put(function(req, res){
        Designer.findById(req.params.bear_id, function(error, designer){
            if(error){
                res.send(error);
            }else{
                designer.name = req.body.name;
            }

            designer.save(function(error){
                if(error){
                    res.send(error);
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
        }, function(error, designer){
            if(error){
                res.send(error);
            }else{
                designer.json({message: 'Designer deleted'});
            }
        });
    });
//register all routes and prefix with api
//app.use('/api', router);