const mongoose=require("mongoose")

const connectDataBase=()=>{

    mongoose.connect(process.env.DB_URI)
    .then((data)=>{
        console.log(`mongodb connect with server on :${data.connection.host}`)
    })
    
}


module.exports=connectDataBase
 