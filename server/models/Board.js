const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const boardSchema = mongoose.Schema({
    number: {
        type: Number
    },
    title: {
        type: String,
        minlength: 2
    },
    writer: {
        type: String,
        minlength: 2
    },
    contents: {
        type: String,
        minlength: 5
    },
    token: {
        type: String
    },
    writeDate: {
        type: Date,
        default: Date.now()
    },
});

const Board = mongoose.model("Board", boardSchema);

module.exports = { Board };