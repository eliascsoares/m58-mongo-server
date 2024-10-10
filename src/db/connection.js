const mongoose = require("mongoose");
// Imports the mongoose library

async function connection() {
try {
    await mongoose.connect(process.env.MONGO_URI)
    // mongoose connect is effectively logging into to our database using the password stored in the .env file
    console.log("connected to the database");
} catch (error) {
    console.log(error);
}
}
 
connection();
