const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: [true, 'there is already a user by that name'],
    required: [true, 'a username is required'],
    minlength: [2, 'username cannot be less than 2 characters long']
  },
  password: {
    type: String,
    required: [true, 'a password is required'],
    minlength: [3, 'password must be 3 characters or longer']
  }
});

const User = model("User", userSchema);

module.exports = User;
