const mongoose = require('mongoose');

const URI = "mongodb+srv://user_ecomm:1234567890@cluster0.ebsda.mongodb.net/ecomm?retryWrites=true&w=majority"

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then((result)=>{
        console.log(`connected ${result}`);
    })
    .catch((err)=> {
        console.log(`error ${err}`);
    })