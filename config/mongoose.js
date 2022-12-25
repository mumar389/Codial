const mongoose=require('mongoose');

//Create Connection with databases
mongoose.connect(process.env.MONGOURI);
const db=mongoose.connection;

//handling the connection
db.on('error',console.error.bind('console','errro in connection with db'));

db.on('open',function(){
    console.log("Successfully Connected To the database");
})
