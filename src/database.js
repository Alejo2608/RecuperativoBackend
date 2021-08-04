const mongoose = require("mongoose");
//Connection URI
const uri = "mongodb+srv://Alejo:PluFor20@cluster1.jrajh.mongodb.net/NewsBD?retryWrites=true&w=majority";
//Connection DB
async function database() {
    try {
        await mongoose.connect(uri, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        });
        console.log("Database is online");
    } catch (err) {
        console.error(err);
    };
};

database(); 
