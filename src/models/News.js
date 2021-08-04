const mongoose = require('mongoose');
const { Schema } = mongoose;

const NewsSchema = new Schema({
    title: {type: String, required: true},
    subtitle: { type: String },
    category: {type: String},
    author: {type: String, required: true},
    date: {type: Date, default: Date.now},
    description: { type: String, required: true },
    image: { data: Buffer, contentType: String }
},
{
    versionKey: false
});

module.exports = mongoose.model('News', NewsSchema);