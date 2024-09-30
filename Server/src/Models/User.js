const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    profile:{
        type:String
    }
}, { timestamps: true });

const UserModel = model("Users", UserSchema);

module.exports = { UserModel };
