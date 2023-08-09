const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: String,
    subtitle: String,
    country: String,
    date: String,
    img: String,
});

const event = mongoose.model('Event',eventSchema);

module.exports= event;