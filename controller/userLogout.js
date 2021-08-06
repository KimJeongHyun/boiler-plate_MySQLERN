const router = require('express').Router();
const path = require('path');

router.get('/api/logout',(req,res)=>{
    if (typeof req.session.displayName!=='undefined'){
        req.session.destroy();
        res.json({logoutSuccess:true})
    }else{
        res.json({logoutSuccess:false})
    }
    
})

module.exports = router;