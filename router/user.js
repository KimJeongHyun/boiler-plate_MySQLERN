const router = require('express').Router();
const path = require('path');

const mysql = require('../database')();
const conn = mysql.init();

router.get('/info',(req,res)=>{
    if (typeof req.session.displayName!=='undefined'){
        res.send("<script>document.location.href='/loginInfo'</script>")
    }else{
        res.render("infoHTML/info.html");
    }
})

router.get('/login',(req,res)=>{
    if (typeof req.session.displayName!=='undefined'){
        res.send("<script>alert('이미 로그인되어있습니다.'); document.location.href='/loginInfo'</script>")
    }else{
        res.render("userHTML/login.html");
    }
    
})
router.get('/register',(req,res)=>{
    if (typeof req.session.displayName!=='undefined'){
        res.send("<script>alert('이미 로그인되어있습니다.'); document.location.href='/info'</script>")
    }else{
        res.render("userHTML/register.html");
    }
})

router.get('/loginInfo',(req,res)=>{
    const id = req.session.displayName;
    const sql = 'SELECT nick FROM users WHERE id=?';
    conn.getConnection((err,connection)=>{
        if (err) throw err;
        const query = connection.query(sql,[id],function(err,rows){
            if (err) throw err;
            res.render("infoHTML/loginInfo.html",{name:rows[0].nick});
            connection.release();
        })
    })
})

router.post('/api/notice',(req,res)=>{
    const client = req.session.displayName;
    if (client=='admin'){
        let idx=0;
        const content = req.body.Content;
        const sql = 'INSERT INTO notice (CONTENT,REGDATE) VALUES(?,NOW())';
        const idxInit = 'ALTER TABLE notice AUTO_INCREMENT=1;' 
        conn.getConnection((err,connection)=>{
            if (err) throw err;
            const initQuery = connection.query(idxInit, function(err,rows){
                if (err) throw err;
            })
            
            const noticeQuery = () =>{
                connection.query(sql,[content],(err,rows)=>{
                    if (err) throw err;
                })
            } 

            const idxQuery = () =>{
                const selIdxSql = 'SELECT MAX(IDX) as MAXID FROM notice'
                connection.query(selIdxSql,(err,rows)=>{
                    if (err) throw err;
                    idx=rows[0].MAXID
                })
            }

            const selQuery = () =>{
                const selSql = 'SELECT * FROM users'
                connection.query(selSql,(err,rows)=>{
                    if (err) throw err;
                    const length = rows.length;
                    for (let i=0; i<length; i++){
                        if (rows[i].ALARM=='none'){
                            const updateSql = 'UPDATE users SET ALARM=? WHERE ID != "admin"'
                            connection.query(updateSql,[idx],(err,rows)=>{
                                if (err) throw err;
                            })
                        }else{
                            let ALARMstr = rows[i].ALARM+','+idx
                            const updateSql = 'UPDATE users SET ALARM=? WHERE ID != "admin"'
                            connection.query(updateSql,[ALARMstr],(err,rows)=>{
                                if (err) throw err;
                                
                            })
                        }
                    }
                    connection.release();
                    res.json({noticeSuccess:true})
                })
            }
            const worker = async () =>{
                await noticeQuery();
                await idxQuery();
                await selQuery();
            }
            worker();
        })
    }else{
        res.json({noticeSuccess:'AUTHERR'})
    }
    
    
})

router.get('/api/noticeView',(req,res)=>{
    
    conn.getConnection((err,connection)=>{
        let ids=0;
        const selSql = 'SELECT ALARM FROM users WHERE ID=?'
        let sql = 'SELECT content FROM notice WHERE IDX in '

        const getNoticeQuery = (ids) =>{
            sql = sql+`(${ids})`
            connection.query(sql,(err,rows)=>{
                if (err) throw err;
                connection.release();
                res.json({noticeElement:true, rows:rows, length:rows.length})
            })
        }

        const selQuery = () =>{
            connection.query(selSql,[req.session.displayName],(err,rows)=>{
                if (err) throw err;
                ids=rows[0].ALARM;
                getNoticeQuery(ids);
            })
        }
        

        const worker = async () =>{
            await selQuery();
        }
        worker();
    })
})

module.exports = router;