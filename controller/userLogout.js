const router = require('express').Router();
const path = require('path');

router.get('/api/logout',(req,res)=>{
    req.session.destroy();
    res.json({logoutSuccess:true})
})

module.exports = router;