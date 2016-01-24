var express = require('express');
var app = express();
var ejs = require('ejs');
var fs = require('fs');
var bodyParser = require('body-parser');
var request = require('request');
var methodOverride = require('method-override');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('forums.db');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

//_____________passport
passport.serializeUser(function(user, done){
  console.log("*****************");
  console.log(user.user_id);
   done(null, user.user_id);
});

  passport.deserializeUser(function(id, done){
    db.get('SELECT user_id, access_Token, name, image FROM users WHERE user_id = ?',id,function(err,row){
      if(!row) return done(null,false);
      //get the user from the database
      return done(null, row);
    })
  });

  passport.use(new FacebookStrategy({
    clientID: "1558806191078093",
    clientSecret: "15825d8ecd1b264aaa5c0c5458c9cb56",
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
    function(accessToken, refreshToken, profile, done){
      // asynchronous verification, for effect...
      process.nextTick(function () {
       var image = "https://graph.facebook.com/" + profile.id+ "/picture" + "?width=200&height=200" + "&access_token=" + accessToken;
       console.log(image);
        // get the user
		     db.get('SELECT user_id, access_Token, name, image FROM users WHERE user_id =?', profile.id, function(err, row) {
		        if (err){
		          //if user does not exist
		          return done(null, false);
		        }
		        if(row){
		          //if user is already in the database
		          return done(null, row);
		        }else{
		          //if user is not in the database, store user
		          db.run('INSERT INTO users (user_id, access_token, name,image) VALUES (?,?,?,?)', profile.id, accessToken, profile.displayName, image, function(err,row){
		            if(err){
		              console.log(err);
		            }else{
		              db.get('SELECT user_id, access_token, name,image FROM users WHERE user_id =?',profile.id,function(err,row2){
		                return done(null,row2);
		              });
		            }
		          });
		        }
		       console.log(profile);
		     });
		})
	}  
));

app.use(session({secret: 'anystringoftext',
				 saveUninitialized: true,
				 resave: true}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//__________________________________


app.use(urlencodedBodyParser);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view_engine', 'ejs');



app.get('/', function(req, res){
	res.redirect('/login');
});


app.get('/login', function(req, res){
	db.all('SELECT * FROM subforums', function(err, rows){			//grabbing id of user instead of thread?
		if(err){
			throw err;
		}
		res.render('main.ejs', {subs: rows})
	})
});


app.get('/forums', ensureAuthenticated, function(req, res){
	var id = req.user.user_id;
	var image = req.user.image;
	db.all('SELECT * FROM subforums', function(err, rows){			//grabbing id of user instead of thread?
		if(err){
			throw err;
		}
		res.render('index.ejs', {subs: rows, image: image});
	})
})


app.get('/forums/sub/:sid', function(req, res){		//id = user id   sid = subforum id
	var sid = req.params.sid;
	var image = req.user.image;
	db.all('SELECT * FROM threads INNER JOIN users ON threads.user_idt=users.user_id WHERE sub_idt=? ORDER BY upvotes DESC', sid, function(err, threads){
		if(err){
			throw err;
		}
		db.get('SELECT * FROM subforums WHERE subforums_id=?', sid, function(err, rows){
			if(err){
				throw err;
			}
			db.all('SELECT * FROM subforums', function(err, subs){			//grabbing id of user instead of thread?
				if(err){
					throw err;
				}
			res.render('thread.ejs', {threads: threads, sub: rows, subs: subs, image: image})
			})
		})
	})
})


app.post('/forums/new', ensureAuthenticated, function(req, res){
	var topic = req.body.name;

	db.run('INSERT INTO subforums (topic) VALUES (?)', topic, function(err){
		if(err){
			throw err;
		}
		res.redirect('/forums');
	})
})


app.post('/forums/thread/:sid', ensureAuthenticated, function(req, res){
	var id = req.user.user_id;
	var sid = req.params.sid;
	var name = req.body.name;
	var text = req.body.text;

	db.run('INSERT INTO threads (description, title, upvotes, user_idt, sub_idt, counter) VALUES (?, ?, ?, ?, ?, ?)',text, name, 0, id, sid, 0, function(err){
		if(err){
			throw err;
		}
		res.redirect('/forums/sub/'+sid);
	})
})


app.post('/forums/comment/:tid', function(req, res){
	var id = req.user.user_id;
	var text = req.body.text;
	var tid = req.params.tid;

	db.run('INSERT INTO comments (comment, thread_idc, user_idc) VALUES (?, ?, ?)', text, tid, id, function(err){
		if(err){
			throw err;
		}
		db.run('UPDATE threads SET counter=counter+1 WHERE threads_id=?', tid, function(err){
			if(err){
				throw err;
			}
			res.redirect('/forums/thread/'+tid);
		})
	})
})


app.get('/forums/thread/:tid', function(req, res){
	var tid = req.params.tid;
	var image = req.user.image;
	db.get('SELECT * FROM threads WHERE threads_id=?', tid, function(err, thread){
		if(err){
			throw err;
		}
		db.all('SELECT * FROM comments INNER JOIN users ON comments.user_idc=users.user_id WHERE thread_idc=?', tid, function(err, rows){
			if(err){
				throw err;
			}
			db.all('SELECT * FROM subforums', function(err, subs){			//grabbing id of user instead of thread?
				if(err){
					throw err;
				}
				res.render('comments.ejs', {thread: thread, comments: rows, subs:subs, image: image});
			})
		})
	})
})


app.put('/forums/upvote/:tid', function(req, res){
	var tid = req.params.tid;
	var current = parseInt(req.body.upvote);
	var added = current+1;

	db.run('UPDATE threads SET upvotes=? WHERE threads_id=?',added, tid, function(err){
		res.redirect('/forums/thread/'+tid);
	})
})



app.get('/forums/gallery/:tid', function(req, res){
	var tid = req.params.tid;
	var image = req.user.image;
	db.all('SELECT * FROM images WHERE thread_idi=?', tid, function(err, rows){
		if(err){
			throw err;
		}
		db.all('SELECT * FROM subforums', function(err, subs){			//grabbing id of user instead of thread?
				if(err){
					throw err;
				}
		res.render('gallery.ejs', {picture:rows, subs: subs, image: image})
		})
	})
})


app.post('/forums/gallery/:tid', function(req, res){
	var id = req.user.user_id;
	var tid = req.params.tid;
	var url = req.body.url;

	db.run('INSERT INTO images (url, thread_idi, user_idi) VALUES (?, ?, ?)', url, tid, id, function(err){
		if(err){
			throw err;
		}
		res.redirect('/forums/gallery/' + tid)
	})
})


//________________________FACEBOOK
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email', 'basic_info']}));

app.get('/auth/facebook/callback', 
	  passport.authenticate('facebook', { successRedirect: '/forums',
	                                      failureRedirect: '/' }));
//checks if user is logged in
function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	console.log("redirected");
	res.redirect('/');
}



app.listen(3000, function(){
	console.log('listening on port 3000!')
});