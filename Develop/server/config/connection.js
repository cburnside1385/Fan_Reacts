const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fans', {
  useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
});

module.exports = mongoose.connection;
