import express from "express"
const router = express.Router()

router.get('', (req, res)=>{
    res.render('terms-of-use')
})

export default router