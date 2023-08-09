const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    studentId: String,
    courseId: String,
    note:String,
    rating:String
});

const note = mongoose.model('Note',noteSchema);

module.exports= note;