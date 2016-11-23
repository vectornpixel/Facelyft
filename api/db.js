//connect to the moongoose server
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/facelyft-dev';
mongoose.connect(url);

mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to ' + url);
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected');
});

var gracefulShutdown = function(msg, callback){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

