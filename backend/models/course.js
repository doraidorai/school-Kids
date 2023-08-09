const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    teacherId: String,
    name: String,
    duration: String,
    description: String,
    img: String,
});

const course = mongoose.model('Course',courseSchema);

module.exports= course;