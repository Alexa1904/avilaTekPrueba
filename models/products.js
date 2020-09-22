const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const productSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    releaseDate:{
        type: Date,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    votes:Number,
    founder:{
        type: Schema.Types.ObjectId,
        ref:'Founder'
    }

});

module.exports = mongoose.model('Product', productSchema)