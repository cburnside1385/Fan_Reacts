const { Schema } = require('mongoose');

// schema for movies that are saved by the user
const films = new Schema({
  
  title: 
  {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  release: {
    type: String
  },
  reviews: {
    type: String,
  }
},
{
  toJson: {
    getters: true
  }
});

module.exports = films;
