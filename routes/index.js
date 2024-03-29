const express = require('express')
const router = express.Router()
const Story = require('../models/Story')
const { ensureAuth,ensureGuest } = require('../middleware/auth')

// @desc Login/landing page
// @route GET/
router.get('/', ensureGuest ,(req,res)=>{
    res.render('login',{
        layout:'login',

    })
})

// @desc dashboard
// @route GET/dashboard
router.get('/dashboard', ensureAuth ,async(req,res)=>{
    try {
        const stories = await Story.find({user:req.user.id}).lean()
        res.render ('dashboard',{
            name:req.user.firstName,
            stories,
        })
    } catch (err) {
        console.error(err);
    }
    
    
})


module.exports = router