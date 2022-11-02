const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fans', {
  useNewUrlParser: true,
    useUnifiedTopology: true,

});

module.exports = mongoose.connection;
