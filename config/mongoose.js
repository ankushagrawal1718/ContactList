const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contact_list_db');

const db = mongoose.connection;

// db.on('error',console.log('error connection to db'));
// db.on("error", () => dbLogError("Database connection failure")); 
db.on("error", console.error.bind(console, "error connecting to db"));

db.once('open',function(){
    console.log('Succefully connected to the database yes');
}); 