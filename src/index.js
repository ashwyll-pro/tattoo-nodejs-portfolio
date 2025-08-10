import  dotenv  from 'dotenv'
dotenv.config()

import server from './server.js'
import connectDB from './data/Database/db.js'

//initialize the mongoose db
connectDB()

const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

