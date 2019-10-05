const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InfoSchema = new Schema({
    fName: {
        type: String,// the type to enter in the database
        required: true,//must be filed in the database
        unique: true,//the only one
        trim: true,//deletes the whitespaces
    },
    lName: {
        type: String,
        required: true,
        trim: true
    },
    suffixes: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    }
}, {
    //enables timestamps (createdAT & updateAt)
    timestamps: true
}
);

const Info = mongoose.model('Info', InfoSchema);
module.exports = Info;