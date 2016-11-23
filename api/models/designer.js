/**
 * Created by asimcraft on 11/11/16.
 */
//this is the modal ( json ) for the designers. Personal use data will be here

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AvatarSchema = new Schema({
    type: String,
    image: String

});
var PortfolioSchema = new Schema({
        title: String,
        image: String,
        category: String
});

var ProfileSchema = new Schema({
    about: String,
    for_hire: Boolean,
    views: Number,
    portfolio: [PortfolioSchema]

});
var DesignerSchema = new Schema({
        name : String,
        email: String,
        location: String,
        password: String,
        profile: ProfileSchema,
        avatar: AvatarSchema
    });
// export the Schemas and its properties
module.exports = mongoose.model('Designer', DesignerSchema);
