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
			db.all('SELECT * FROM subforums', function(err, rows){			//grabbing id of user instead of thread?
				if(err){
					throw err;
				}
				console.log(rows);
				res.render('index.ejs', {userID: userID, subs: rows});
			})
		}
	});
})




app.get('/forums/:id/sub/:sid', function(req, res){		//id = user id   sid = subforum id
	var id = req.params.id;
	var sid = req.params.sid;
	db.all('SELECT * FROM threads INNER JOIN users ON threads.user_id=users.id WHERE sub_id=?', sid, function(err, threads){
		if(err){
			throw err;
		}
		db.get('SELECT * FROM subforums WHERE id=?', sid, function(err, rows){
			if(err){
				throw err;
			}
			db.all('SELECT * FROM comments WHERE id=?', )
		console.log(threads);
		res.render('thread.ejs', {threads: threads, sub: rows, id:id})
		})
	})
})




app.post('/forums/:id/new', function(req, res){
	var id = req.params.id;
	var topic = req.body.name;

	db.run('INSERT INTO subforums (topic) VALUES (?)', topic, function(err){
		if(err){
			throw err;
		}
		res.redirect('/forums');
	})
})




app.post('/forums/:id/thread/:sid', function(req, res){
	var id = req.params.id;
	var sid = req.params.sid;
	var name = req.body.name;
	var text = req.body.text;

	db.run('INSERT INTO threads (description, title, upvotes, user_id, sub_id) VALUES (?, ?, ?, ?, ?)',text, name, 0, id, sid, function(err){
		if(err){
			throw err;
		}
		res.redirect('/forums/'+id+'/sub/'+sid);
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




app.get('/forums/:id/thread/:tid', function(req, res){
	var id = req.params.id;
	var tid = req.params.tid;

	db.get('SELECT * FROM threads WHERE id=?', tid, function(err, thread){
		if(err){
			throw err;
		}
		db.all('SELECT * FROM comments INNER JOIN users ON comments.user_id=users.id WHERE thread_id=?', tid, function(err, rows){
			if(err){
				throw err;
			}
			res.render('comments.ejs', {id:id, thread: thread, comments: rows});
		})
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