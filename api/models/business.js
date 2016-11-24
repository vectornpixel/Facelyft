var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AvatarSchema = new Schema({
    type: String,
    image: String

});
var ProjectsSchema = new Schema({
        title: String,
        image: String,
        category: String,
        description: String,
        submissions: Number,
        open: Boolean,
        consultant: String,
        views: Number,
});

var ProfileSchema = new Schema({
    about: String,
    website: String,
    social: String,
    projects: [ProjectsSchema]

});
var BuesinessSchema = new Schema({
        name : String,
        email: String,
        location: String,
        password: String,
        profile: ProfileSchema,
        avatar: AvatarSchema
    });
// export the Schemas and its properties
module.exports = mongoose.model('Business', BuesinessSchema);
