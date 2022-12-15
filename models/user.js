const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
//allows users to insert user information to sign up
const userSchema = new Schema({
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
    email: {
        type: String, required: [true, 'Email address is required'],
        unique: [true, 'Email address has already been used']
    },
    password: { type: String, required: [true, 'Enter a passowrd']},
}
);
//encrypts the users password
userSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password'))
        return next();
    bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
            next();
        })
        .catch(err => next(error));
});

//compares user input to stored password for verification
userSchema.methods.comparePassword = function (inputPassword) {
    let user = this;
    return bcrypt.compare(inputPassword, user.password);
}

module.exports = mongoose.model('User', userSchema);