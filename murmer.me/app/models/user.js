/* user.js schema, how our data looks in the database, the object model 
 * performing data validation and more...
 */

var mongoose = require('mongoose');

/* bcrypt is the proper way to store passwords in your database  */
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

/* set-up a schema */
var userSchema = new Schema({
	name: String,
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false} 
});

/* mongoose middleware aka (pre and post scripts)
 * pre, do something before saving data into the database
 * post, do something after saving data into the database

 * The purpose of this middleware is to hash the password
 * before saving to database, for security reasons
 */
userSchema.pre('save', function (next) {
	
	/* current user */
	var user = this;

	/* bcrypt */
	var SALT_FACTOR = 10;

	/* only hash the password if it has been modified (or is new) */
    if (!user.isModified('password')) 
    	return next();

    /* Bcrypt is an adaptive hash function based on the Blowfish 
     * symmetric block cipher cryptographic algorithm. 
     */
    bcrypt.genSalt(SALT_FACTOR, function (error, salt) {
    	
    	if (error)
    		return next(error);

    	/* hash the password */
	    bcrypt.hash(user.password, salt, null, function(error, hash) {
	    	
	    	if (error)
    			return next(error);

    		/* set the hash to the password */
    		user.password = hash;
    		next();
	    });
    });

});

/* compare password function */
userSchema.methods.comparePassword = function (password) {
	var user = this;
	return bcrypt.compareSync(password, user.password);
}

/* allows to access this schema outside the file when we require this file */
module.exports = mongoose.model('User', userSchema);




