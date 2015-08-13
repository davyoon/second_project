var express = require('express');
var app = express();
var ejs = require('ejs');
var fs = require('fs');
var bodyParser = require('body-parser');

var methodOverride = require('method-override');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('forums.db');

app.use(urlencodedBodyParser);

app.use(methodOverride('_method'));
app.use(express.static('public'));

app.set('view_engine', 'ejs');

app.get('/', function(req, res){
	res.redirect('/login');
});

app.get('/login', function(req, res){
	res.render('main.ejs')
});

app.get('/forums', function(req, res){
	var user = req.query.name;
	db.run('INSERT INTO users (name) VALUES (?)', user, function(err){
		if(err){
			throw err;
			
		}else{
			var userID = this.lastID;
			db.all('SELECT * FROM users INNER JOIN threads ON threads.user_id=users.id', function(err, rows){
				if(err){
					throw err;
				}
				console.log(rows);
				res.render('index.ejs', {userID: userID, threads: rows});
			})
		}

	});

})


app.get('/forums/:id/thread/:tid', function(req, res){		//id = user id   tid = thread id
	var id = req.params.id;
	var tid = req.params.tid;
	db.get('SELECT * FROM threads WHERE id=?', tid, function(err, thread){
		if(err){
			throw err;
		}
		console.log(thread);
		db.all('SELECT * FROM comments WHERE thread_id=?', tid, function(err, rows){
		res.render('thread.ejs', {thread: thread, comments:rows, userID: id});
			
		})
	})
})

app.post('/forums/:id/new', function(req, res){
	var id = req.params.id;
	var title = req.body.name;
	var text = req.body.text;
	console.log(title)

	db.run('INSERT INTO threads (description, title, upvotes, user_id) VALUES (?, ?, ?, ?)', text, title, 0, id, function(err){
		if(err){
			throw err;
		}
		res.redirect('/forums');
	})
})

app.post('/forums/:id/comment/:tid', function(req, res){
	var id = req.params.id;
	var text = req.body.text;
	var tid = req.params.tid;
	console.log(tid)

	db.run('INSERT INTO comments (comment, thread_id, user_id) VALUES (?, ?, ?)', text, tid, id, function(err){
		if(err){
			throw err;
		}
		res.redirect('/forums/'+id+'/thread/'+tid);
	})

})

// app.post('/forums/:id/upvote/:tid', function(req, res){
// 	var id = req.params.id;
// 	var tid = req.params.tid;

// 	db.
// })

















app.listen(3000, function(){
	
	console.log('listening on port 3000!')
});