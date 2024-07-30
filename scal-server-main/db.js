const mongoose = require('mongoose');
const dotenv = require('dotenv');

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect("mongodb+srv://abuakardev:Phenom2021$@scal-test.dgfpukn.mongodb.net/?retryWrites=true&w=majority", connectionParams);
        console.log('Connected to database succesfully');
    } catch (error) {
        console.log(error);
        console.log("Couldn't connect to database");
    }
}