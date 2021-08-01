const router = require('express').Router();
const crypto = require('crypto');
const path = require('path');

const mysql = require('../database')();
const conn = mysql.init();

router.post('/api/loginUser',(req,res)=>{
    console.log('loginUser Router');
    const userid = req.body.id;
    const userpw = req.body.password;
    conn.getConnection((err,connection)=>{
        console.log('DB Connected');
        if (err) throw err;
        connection.query('SELECT pw, salt, nick FROM USERS WHERE id = ?',[userid], (err, results) =>{
            console.log('SELECT SQL Operated');
            if (err){
                throw err;
            }else if (results.length>0){
                console.log('ID Found');
                crypto.pbkdf2(userpw,results[0].salt,108326,64,'sha512',(err,key)=>{
                    const realPW = key.toString('base64');
                    if (realPW==results[0].pw){
                        req.session.displayName=userid;
                        console.log('Auth complete');
                        res.json({loginSuccess:true,userId:userid})
                        //res.send('<script>document.location.href="loginInfo";</script>')
                        //res.render('infoHTML/loginInfo.html',{name:results[0].nick});
                        //res.send(`<script type="text/javascript">alert("환영합니다! ${req.session.displayName}님!"); document.location.href="/loginInfo"; </script> `);
                    }
                    else{
                        console.log('Auth failed');
                        res.json({loginSuccess:false})
                        //res.send('<script>alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>');
                    }
                });
            }else{
                console.log('Auth failed 2');
                res.json({loginSuccess:false})
                //res.send('<script>alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>');
            }
            connection.release();
        });
    })
})


module.exports = router;