const mongoose = require('mongoose')

const createConnectionToDataBase = () =>{
        const uri = process.env.MONGODB_URL;
        mongoose.connect(uri)
            .then(() => console.log('Connected to MongoDB'))
            .catch(e=>console.log(e))
}

module.exports = createConnectionToDataBase;