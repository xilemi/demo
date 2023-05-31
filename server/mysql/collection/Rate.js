const mongoose = require('../db')
const schema = new mongoose.Schema({
    rateid: String,
    userid: String,
    proid: String,
    grade: Number,
    message: String
})

module.exports = mongoose.model('Rate', schema)