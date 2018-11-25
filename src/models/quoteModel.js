const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuoteSchema = new Schema({
    index:Number,
    body:String,
    author:String,
    likes:Number
})

const Quote = mongoose.model('quotes',QuoteSchema);

module.exports = Quote;