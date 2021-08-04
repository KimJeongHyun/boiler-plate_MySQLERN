const express = require('express');
const router = express.Router();

const mysql = require('../database')();
const conn = mysql.init();

const fs = require('fs');
const path = require('path');

router.get('/board/list',function (req,res,next) {
  res.redirect('/register')// /board로 접속요청이 들어왔을 때 1페이지로 자동으로 이동하도록 리다이렉트 해줍니다.
  req.session.refresh = true; // 무한 새로고침으로 조회수 폭증을 막는 세션 값
})

router.get('/api/board/list/:page', function(req, res, next) {
  const page = req.params.page;
  req.session.refresh = true;
  const sql = 'SELECT idx, nick, title, content, hit FROM board ORDER BY idx DESC'; // 페이징 포스트가 최근 작성된 것부터 보이도록 DESC 처리.
  conn.getConnection((err,connection)=>{
    if (err) throw err;
    const query = connection.query(sql,function(err,rows){
      if (err) throw err;
      if (rows.length==0){
        const idxInit = 'ALTER TABLE board AUTO_INCREMENT=1;'
        const idxInitQuery = connection.query(idxInit,function(err,rows){
          if (err) throw err;
        })
        res.json({title:'게시판 리스트', lastidx:1});
        //res.render('boardHTML/pageEmpty.html',{title:'게시판 리스트',lastidx:1});
      }else{
        res.json({title:'게시판 리스트', rows:rows, page:1, length:rows.length-1,page_num:10,lastidx:rows[0].idx+1,userName:req.session.displayName});
        //res.render('boardHTML/page.html',{title:'게시판 리스트',rows:rows, page:page, length:rows.length-1, page_num:10, lastidx:rows[0].idx+1,userName:req.session.displayName});
      }
      connection.release();
    })
  })
});

router.get('/api/post/:page',function(req,res,next){
  const page = req.params.page;
  conn.getConnection((err,connection)=>{
    if (err) throw err;
    const query = connection.query('SELECT idx, title, name, nick, content, hit, recommend, uploadfilepath FROM board where idx='+page,function(err,rows){
      if (err) throw err
      const author = rows[0].name;
      const preRows = rows;
      const filePath = rows[0].uploadfilepath;
      let fileArray='';
      let imgFilePath ='';
      const checkExt = function(element){
        const ext = element.slice(element.lastIndexOf('.'));
        switch (ext){
          case '.jpg' : 
          case '.jpeg':
          case '.gif':
          case '.bmp':
          case '.png':
          case '.tif':
          case '.tiff':
            return true;
          default:
            return false;
        }
      }
      let fileStringWork = function(){
        return new Promise(function(resolve,reject){
          if (filePath!=null && filePath!=''){
            imgFilePath = rows[0].uploadfilepath.split('+');
            imgFilePath=imgFilePath.filter((element)=>checkExt(element));
            for (let i=0; i<imgFilePath.length; i++){
              imgFilePath[i] = imgFilePath[i].slice(7);
            }
            fileArray = rows[0].uploadfilepath.split('+');
            for (let i=0; i<fileArray.length; i++){
              fileArray[i] = fileArray[i].split('\\')[2].split(';')[3];
            }
            resolve('file string work clear');
          }else{
            resolve('no need to file string work');
          }
        })
      }

      

      let sqlWork = function(){
        return new Promise(function(resolve,reject){
          if (typeof req.session.displayName!=='undefined'){
            if (author==req.session.displayName){
              res.json({title:rows[0].title, rows:rows[0], fileName:fileArray,imgPaths:imgFilePath,postLoc:'PostUser'})
              //res.render('boardHTML/postUser.html',{title:rows[0].title, rows:rows, fileName:fileArray,imgPaths:imgFilePath});
              resolve('client is post user');
            }else{
              const recomSelSql = 'SELECT recomPost FROM users WHERE id=?';
              const recomSelQuery = connection.query(recomSelSql,[req.session.displayName],(err,rows)=>{
                if (err) throw err;
                if (rows.length==0 || rows[0].recomPost==null){
                  res.json({title:preRows[0].title,rows:preRows[0],fileName:fileArray,imgPaths:imgFilePath,postLoc:'GuestNoRecom'});
                  //res.render('boardHTML/postGuest.html',{title:preRows[0].title,rows:preRows,fileName:fileArray,imgPaths:imgFilePath});
                  resolve('client is post guest, recomPost is null.');
                }else{
                  const recomPosts = rows[0].recomPost;
                  const recomPostsArray = recomPosts.split(';');
                  if (recomPostsArray.includes(page)){
                    res.json({title:preRows[0].title,rows:preRows[0],fileName:fileArray,imgPaths:imgFilePath,postLoc:'GuestRecom'})
                    //res.render('boardHTML/postGuestRecommended.html',{title:preRows[0].title,rows:preRows,fileName:fileArray,imgPaths:imgFilePath});
                    resolve('client is recommended user');
                  }else{
                    res.json({title:preRows[0].title,rows:preRows[0],fileName:fileArray,imgPaths:imgFilePath,postLoc:'GuestNoRecom'})
                    //res.render('boardHTML/postGuest.html',{title:preRows[0].title,rows:preRows,fileName:fileArray,imgPaths:imgFilePath});
                    resolve('client is post guest, post is not included in recomPost');
                  }
                }          
              })
            }
          }else{
            res.json({title:rows[0].title, rows:rows[0], fileName:fileArray,imgPaths:imgFilePath,postLoc:'Guest'})
          }
        })
      }
      
      let hitWork = function(){
        return new Promise(function(resolve,reject){
          if (req.session.refresh==true){
            const query = connection.query('UPDATE board SET hit=hit+1 WHERE idx='+page, function(err,rows){
              if (err) reject(err);
              connection.release();
            })
          }else{
            connection.release();
          }
          req.session.refresh=false;
          resolve('Update hit')
        })
      }

      let worker = async function(){
        await fileStringWork();
        await hitWork();
        await sqlWork();
      }
      worker();
       // 조회수 증가 후에는 새로고침 세션 값을 false로 돌려 post에서 update가 발생하지 않도록 방지한다.
    })
  })
})

router.get('/board/write/:idx',function(req,res,next){
  if (typeof req.session.displayName!=='undefined'){
    res.render('boardHTML/write.html',{id:req.params.idx});
  }else{
    res.send("<script>alert('로그인을 해주시기 바랍니다.'); window.history.back();</script>")
  }
})

router.post('/insert',(req,res)=>{
  if (typeof req.session.displayName!=='undefined'){
    const title = req.body.title;
    const content = req.body.content;
    const author = req.session.displayName;
    let filepath = '';
    if (typeof req.session.filepath=='undefined'){
      filepath=null;
    }else{
      filepath=req.session.filepath;
    }
    if (title.length==0 || content.length==0){
     res.send("<script>alert('제목 또는 내용에 아무것도 작성되지 않았습니다.'); window.history.back();'</script>")
    }
    else{
      const selSql = 'SELECT idx FROM board';
      const idxInit = 'ALTER TABLE board AUTO_INCREMENT=?;' 
      //SET @COUNT =0; UPDATE board SET board.idx = @COUNT:=@COUNT+1; 요걸 쓰면 AUTO_INCREMENT 속성을 초기화할 수 있다.
      const authSql = 'SELECT nick FROM users WHERE id=?';
      const insertSql = 'INSERT INTO board (title, content, name, regdate, modidate, nick, uploadfilepath) VALUES(?,?,?,NOW(),NOW(),?,?)'
      conn.getConnection((err,connection)=>{
        if (err) throw err;
        const selQuery = connection.query(selSql, function(err,rows){
          if (err){
            throw err;
          }else{
            const initQuery = connection.query(idxInit,[rows.length], function(err,rows){
              if (err) throw err;
            })
          }
        })
        const authQuery = connection.query(authSql,[author],function(err,rows){
          if (err){
            throw err;
          }else{
            const insertQuery=connection.query(insertSql,[title,content,author,rows[0].nick,filepath],function(err,rows){
              if (err){
                throw err;
              }else{
                res.send("<script>alert('작성되었습니다.'); document.location.href='/board/list'</script>")
              }
            })
          }
          req.session.filepath='';
          connection.release();
        })
      })     
    }
  }else{
    res.send("<script>alert('비정상적인 접근입니다.'); document.location.href='/info'</script>")
    req.session.filepath='';
  }
})

router.get('/board/update/:idx',(req,res)=>{
  const idx = req.params.idx;
  req.session.updateIdx = idx;
  conn.getConnection((err,connection)=>{
    if (err) throw err;
    const query = connection.query('SELECT idx, title, name, content FROM board WHERE idx='+idx, function(err,rows){
      if (err) throw err;
      if (rows[0].name==req.session.displayName){
        res.render('boardHTML/postDetail.html',{rows:rows});
      }else{
        res.send("<script>alert('작성자가 아닙니다.'); document.location.href='/board/list'</script>")
      }
      connection.release();
    })
  })
})

router.post('/board/update',(req,res)=>{
  const title = req.body.title;
  const content = req.body.content;
  const idx = req.body.idx;
  let filePath='';
  console.log(req.session.filepath);
  if (typeof req.session.filepath=='undefined' || req.session.filepath==''){
      filepath=null;
  }else{
      filepath=req.session.filepath;
  }
  conn.getConnection((err,connection)=>{
    if (err) throw err;
    let fileList = '';
    let selQuery = function(){
      return new Promise(function(resolve,reject){
        const sql = 'SELECT uploadfilepath FROM board WHERE idx=?';
        connection.query(sql,[idx],(err,rows)=>{
          if (err) reject(err);
          if (rows.length==0 || (rows[0].uploadfilepath==null || rows[0].uploadfilepath=='')){
            reject('There is no path in DB');
          }else{
            fileList = rows[0].uploadfilepath;
            resolve('Detect path from DB');
          }
        })
      })
    }
    let updateQuery = function(){
      return new Promise(function(resolve,reject){
        const sql = 'UPDATE board SET title=?, content=?, uploadfilepath=?, modidate=NOW() WHERE idx=?'
        connection.query(sql,[title,content,filepath,idx],function(err,rows){
          if (err) reject(err);
          res.send("<script>alert('작성되었습니다.'); document.location.href='/board/list'</script>")
          connection.release();
          resolve('Update path in DB');
        })
      })
    }
    let worker = async function(){
      try{
          console.log(await selQuery());
          if (filepath!=null){
            filepath = fileList+'+'+filepath;
          }else{
            filepath=fileList;
          }
          console.log(await updateQuery());
      }catch{
          console.log(await updateQuery());
      }
    }
    worker();
  })
  req.session.filepath='';
  req.session.updateIdx='';
})

router.get('/board/delete/:idx',(req,res)=>{
  const idx = req.params.idx;
  const authSql = 'SELECT name, uploadfilepath FROM board WHERE idx=?';
  const delSql = 'DELETE FROM board WHERE idx=?';
  
  conn.getConnection((err,connection)=>{
    if (err) throw err;
    const authQuery = connection.query(authSql,[idx],function(err,rows){
      if (err) throw err;
      if (rows[0].name==req.session.displayName){
        const dir = path.join(__dirname,'..','/public/uploadedFiles/');
        const findStr = idx+';'+req.session.displayName;
        fs.readdir(dir,(err,data)=>{
          if (err) throw err;
          data.forEach((item,i)=>{
              if (item.includes(findStr)){
                  const filePath = dir+item;
                  fs.unlink(filePath,(err)=>{
                      if (err) throw err;
                  })
              }
          })
        })
  
        const delQuery = connection.query(delSql,[idx],function(err,rows){
          res.send("<script>alert('삭제되었습니다.'); document.location.href='/board/list'</script>")
        })
      }else{
        res.send("<script>alert('작성자가 아닙니다.'); document.location.href='/board/list'</script>")
      }
      connection.release();
    })
  })
})

router.get('/api/recommendDel/:idx',(req,res)=>{
  if (typeof req.session.displayName!=='undefined'){
    const idx = req.params.idx;
    const selSql = 'SELECT recomPost FROM users WHERE id=?';
    const updateSql = 'UPDATE users SET recomPost=? WHERE id=?';
    const updateRecomSql = 'UPDATE board SET recommend = recommend-1 WHERE idx=?';
    conn.getConnection((err,connection)=>{
      if (err) throw err;
      const query = connection.query(selSql,[req.session.displayName],(err,rows)=>{
        if (err) throw err;
        let recomList='';
        const recomPosts = rows[0].recomPost;
        const recomPostsArray = recomPosts.split(";");
        if (recomPosts.length>1){
          for (let i=0; i<recomPostsArray.length; i++){
            if (recomPostsArray[i]!=idx && recomPostsArray[i]!=''){
              recomList+=recomPostsArray[i]+';';
            }
          } 
          const updateRecomQuery = connection.query(updateRecomSql,[idx],(err,rows)=>{
            if (err) throw err;
          }) 
        }
        const updateQuery = connection.query(updateSql,[recomList,req.session.displayName],(err,rows)=>{
          if (err) throw err;
          connection.release();
        })
        
      })
      res.json({recomDelSuccess:true})
      //res.send("<script>alert('추천 해제되었습니다.'); document.location.href='/board/list/post/"+idx+"'</script>")
    })
  }else{
    res.json({recomDelSuccess:false})
    //res.send("<script>alert('비정상적인 접근입니다.'); window.history.back();</script>")
  }
})

router.get('/api/recommend/:idx',(req,res)=>{
  if (typeof req.session.displayName!=='undefined'){
    const idx = req.params.idx;
    const selSql = 'SELECT name FROM board WHERE idx=?';
    const recomUpdateSql = 'UPDATE board SET recommend=recommend+1 WHERE idx=?';
    const recomSelSql = 'SELECT recomPost FROM users WHERE id=?';
    const recomPostUpdateSql = 'UPDATE users SET recomPost = ? WHERE id=?';
    conn.getConnection((err,connection)=>{
      if (err) throw err;
      const query = connection.query(selSql,[idx],function(err,rows){
        if (err) throw err;
        if (rows[0].name==req.session.displayName){
          res.json({recomSuccess:false})
          //res.send("<script>alert('자기 자신의 게시글에 추천을 누를 수 없습니다.'); location.reload();</script>");
        }else{
          const recomSelQuery = connection.query(recomSelSql,[req.session.displayName],(err,rows)=>{
            if (err) throw err;
            if (rows[0].recomPost ==null){
              const recomPostUpdateQuery = connection.query(recomPostUpdateSql,[idx+';',req.session.displayName],(err,rows)=>{
                if (err) throw err;
              });
              const recomUpdateQuery = connection.query(recomUpdateSql,[idx],function(err,rows){
                if (err) throw err;
              })
              res.json({recomSuccess:true})
              //res.send("<script>document.location.href='/board/list/post/"+idx+"'</script>")
            }else{
              const recomPosts = rows[0].recomPost;
              const recomPostsArray = recomPosts.split(';');
              if (recomPostsArray.includes(idx)){
                res.json({recomSuccess:false})
                //res.send("<script>alert('이미 추천을 누른 게시물입니다.'); window.history.back();</script>");
              }else{
                let recomPostList='';
                for (let i=0; i<recomPostsArray.length; i++){
                  if (recomPostsArray[i]!=''){
                    recomPostList+=recomPostsArray[i]+';';
                  }
                }
                recomPostList+=idx+';';
                const recomPostUpdateQuery = connection.query(recomPostUpdateSql,[recomPostList,req.session.displayName],(err,rows)=>{
                  if (err) throw err;
                });
                const recomUpdateQuery = connection.query(recomUpdateSql,[idx],function(err,rows){
                  if (err) throw err;
                  res.json({recomSuccess:true})
                  //res.send("<script>document.location.href='/board/list/post/"+idx+"'</script>")
                })
              }
            }
          })          
        }
        connection.release();
      })
    })
  }else{
    res.json({recomSuccess:false})
    //res.send("<script>alert('로그인한 유저만 추천을 누를 수 있습니다.'); window.history.back();</script>")
  }
})


module.exports = router;