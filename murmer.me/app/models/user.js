/* user.js Scheme, how our data looks in the database, the object model */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/* set-up a schema */
var userSchema = new Schema({
	name: String,
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false} 
});

/* allows to access this schema outside the file when we require this file */
module.exports = mongoose.model('User', userSchema);