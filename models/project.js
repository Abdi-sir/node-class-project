let mongoose = require('mongoose')
let Schema = mongoose.Schema

let ProjectSchema = new Schema({
	id:Number,
    name: String,
    department: String,
    title: String,
    abstruct:String,
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Project', ProjectSchema)