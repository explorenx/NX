
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

// set up a mongoose model
var UserSchema = new Schema({
    Name :  {
                type: String
             },
    Email :  {
                type: String,
                unique: true,
                required: true
             },
    Password : {
                type: String,
                required: true
             },
    Role : {
        type: String,
        enum: ['MasterAdmin','ClientAdmin','ServiceUser'],
        default : 'ServiceUser'
    },
    IsActive : {
        type: Boolean,
        default : false
    },
    PasswordResetLink : String,
    PasswordResetExpiryDate : Date 
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        console.log(user);
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.Password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.Password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.Password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
 
module.exports = mongoose.model('User', UserSchema);

