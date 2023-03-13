var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
	unique_id: Number,
	email: String,
	username: String,
	department: String,
	password:{
		type: String,
		min:2,
		max:8,
		required:true,
	},
	passwordConf:{
		type: String,
		min:2,
		max:8,
		required:true,
	}
}),
User = mongoose.model('User', userSchema);

module.exports = User;