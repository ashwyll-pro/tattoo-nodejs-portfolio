import mongoose from "mongoose"

async function connectDB(){
    try{
       await mongoose.connect(process.env.DATABASE_URL)

        const db = mongoose.connection

        db.on('error', (err)=>{
            console.error("❌ Unable to connect to DB:", err.message)
        })

        db.once('open', ()=>{
             console.log("Connect to db successfully")
        })

    }catch(error){
        console.error('❌ Initial DB connection failed:', error.message)
    }
}

export default connectDB

