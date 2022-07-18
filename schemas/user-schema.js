const { mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
    id: Number,
    tokens: Number,
});

module.exports = { userSchema };