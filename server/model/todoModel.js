import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required:true
    },
    todo: {
        type: String,
        required:true
    }
});


const todoModel = mongoose.model('todos', todoSchema);
export default todoModel;