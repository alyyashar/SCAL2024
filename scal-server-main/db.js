const mongoose = require('mongoose');
const dotenv = require('dotenv');

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect("mongodb+srv://ashar:ashar123@cluster14775.yk8pjst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster14775", connectionParams);
        console.log('Connected to database succesfully');
    } catch (error) {
        console.log(error);
        console.log("Couldn't connect to database");
    }
}