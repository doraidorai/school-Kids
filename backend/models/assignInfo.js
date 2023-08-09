const mongoose = require('mongoose');

const assignInfoSchema = mongoose.Schema({
    courseId: String,
    studentsId: [String],
});

const assignInfo = mongoose.model('AssignInfo',assignInfoSchema);

module.exports= assignInfo;