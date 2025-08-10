import express from 'express'
const router = express.Router()

router.get('/', (req, res)=>{
    res.send('tattoo me')
})

export default router