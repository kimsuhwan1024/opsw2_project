const express = require('express');
const app = express();
var fs = require('fs');
const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) 
app.set('view engine','ejs');

var db;
MongoClient.connect("mongodb+srv://kimsuhwan:gogo1024@cluster0.bozohxv.mongodb.net/?retryWrites=true&w=majority", function(err, client){
  if (err) return console.log(err)
  app.listen(8080, function() {
    console.log('listening on 8080')
  })
  db = client.db('Posts');
})


app.get('/', function(req, res) { 
  res.sendFile(__dirname +'/main.html')
  
})

  app.get('/main', function(req, res) { 
    res.sendFile(__dirname +'/main.html')
    })
  
  app.get('/board', function(req, res) { 
    db.collection('content').find().toArray(function(err, result){
      console.log(result);
      res.render('board.ejs', {loginfo : result})
    })
  })

  app.get('/game', function(req, res) { 
    res.sendFile(__dirname +'/game.html')
  })

  app.get('/login', function(req, res) { 
    res.sendFile(__dirname +'/login.html')
  })

  app.get('/write', function(req, res) { 
    res.sendFile(__dirname +'/write.html')
  })

  app.get('/study', function(req, res) { 
    res.sendFile(__dirname +'/study.html')
  })

  app.get('/game1', function(req, res) { 
    res.sendFile(__dirname +'/game/2048_master/index.html')
  })


  app.get('/game2', function(req, res) { 
    res.sendFile(__dirname +'/game/hextris_gh_pages/index.html')
  })
  
  app.get('/game3', function(req, res) { 
    res.sendFile(__dirname +'/game/canvas_tower_defense-master/index.html')
  })

app.get('/list', function(req, res) {
  db.collection('content').find().toArray(function(err, result){
    console.log(result);
    res.render('board.ejs', {loginfo : result})
  })
})

  app.post('/add', function(req, res){
    db.collection('config').findOne({name : 'totalcount'}, function(err, result){
      var mycount = result.count;
      var now = new Date();
      var year = now.getFullYear();
      var date = now.getDate();	
      var month = now.getMonth()+1;
      var day = year + "년 " + month + "월 " + date+"일" 
      
      db.collection('content').insertOne( { _id : (mycount + 1), title : req.body.title, password : req.body.password ,writer : req.body.name , contents : req.body.comment , writeday:day } , function(){
        console.log('save complete')
        res.send('send complete....');
      });
    });
    
  });

