const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const boardSchema = mongoose.Schema({
    title: {
        type: String,
        minlength: 1
    },
    writer: {
        type: String,
    },
    contents: {
        type: String,
        minlength: 1
    },
    token: {
        type: String
    },
    writeDate: {
        type: String,
    },
});

const Board = mongoose.model("Board", boardSchema);

module.exports = { Board };