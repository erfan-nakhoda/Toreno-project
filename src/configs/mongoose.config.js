const {default : mongoose} = require('mongoose');

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("mongodb connected");
}).catch(err => {
    if(err) console.log(err.message);
})