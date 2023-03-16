const express=require('express');
const bodyParser=require('body-parser')
const fs=require('fs');
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.get('/login',(req,res,next)=>{
    res.send('<html><form action="/" onSubmit="localStorage.setItem(`username`,document.getElementById(`username`).value)"><label>Enter username</label><input type="text" name="username" id="username"></input><br></br><button type="submit">Login</button></form></html>')
})

app.post('/message',(req,res,next)=>{
    console.log(req.body.username)
    console.log(req.body.message);
    fs.writeFile('message.txt',`${req.body.username}:${req.body.message}`,{flag:'a'},(err)=>{
        res.redirect('/');
    })
})
app.get('/',(req,res,next)=>{
    const data=fs.readFile('message.txt',(err,data)=>{
        if(err){
            data='No Chats';
        }
        res.send(`<html>${data}<form action="/message" method="POST" onSubmit="document.getElementById('username').value=localStorage.getItem('username')"><input type="hidden" name="username" id="username"><input type="text" name="message"></input><button type="submit">Send</button></form></html>`)
    })
    })

app.listen(4000)