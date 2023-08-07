const { default: mongoose } = require("mongoose")


module.exports = async ()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/taobao-database', {
        autoIndex: true,
        serverSelectionTimeoutMS: 30000,
        useUnifiedTopology: true, // Add this option
        })
        console.log("Mongoose Connected");
    }catch(err){
        console.log(err);
    }
}    