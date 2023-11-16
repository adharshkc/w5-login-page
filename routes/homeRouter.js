const express = require('express')
const data = require('../data/shoes.json')

const router = express.Router()

router.get("/home", (req, res)=>{
    if(req.session.loggedIn){
        res.render('home',{products: data.data})
    }
    else{
        res.redirect('/')
    }
})

router.get("/logout", (req, res)=>{
    req.session.destroy()
    res.redirect('/')
})

module.exports = router