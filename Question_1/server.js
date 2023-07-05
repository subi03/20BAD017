const express       = require('express'),
      bodyParser    = require('body-parser'),
      indexRoutes   = require('./routes/index'),
      passport      = require('passport'),
      mongoose      = require('mongoose'),
      LocalStrategy = require('passport-local')

const app = express();

mongoose.connect('mongodb://localhost/train-app', {useNewUrlParser: true}); 


app.use(indexRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);