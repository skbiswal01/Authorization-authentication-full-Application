const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true,
       
    },
    tag : {
        type : String,
        default : "General"
    }
  },{
    timestamps: true,
    versionKey: false
  });


  module.exports = mongoose.model('products', ProductSchema)