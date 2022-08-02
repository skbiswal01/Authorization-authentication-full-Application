const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect("mongodb+srv://sunil01:sunil01@cluster0.6pebdoe.mongodb.net/?retryWrites=true&w=majority");
}