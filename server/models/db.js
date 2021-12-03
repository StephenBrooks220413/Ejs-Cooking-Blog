const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser:true, useUnifiedTopology:true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection failed'));
db.once('open', function(){
    console.log('DB connected')
});

// models
require('./Category');
require('./Recipe');