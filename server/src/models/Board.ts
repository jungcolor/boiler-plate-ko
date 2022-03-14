import * as mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 1,
    },
    writer: {
        type: String,
    },
    contents: {
        type: String,
        minlength: 1,
    },
    token: {
        type: String,
    },
    writeDate: {
        type: String,
    },
});

const Board = mongoose.model("Board", boardSchema);

export default Board;
