const { Schema } = require('mongoose');

// schema for movies that are saved by the user
const films = new Schema({
    filmID:
    {
        type: Number,
        required: true
    },
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
   
  },
  release: {
    type: String
  },
  reviews: {
    type: String,
  }
},
);

module.exports = films;
