const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/express-auth', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})


const UserSchema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String,
    set(){

    }
  }
})

const User = mongoose.model('User', UserSchema)
User.db.dropCollection("users");

module.exports = {
  User
}