const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  
  // this lets us automatically populate these fields later if we want using Mongoose methods
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = model('Post', postSchema);
