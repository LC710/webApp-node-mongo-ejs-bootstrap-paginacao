const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },
    
    username:{
        type: String,
        // required: false
    }
})

const User = mongoose.model("user", UserSchema);

module.exports = {User}



