var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('forums.db');

db.run("INSERT INTO users (name, user_id, image) VALUES (?, ?, ?), (?, ?, ?)", 
	"Bob", 1, "/photos/bob.png", 
	"Spike", 2, "/photos/spike.png",
	function(err){
		if(err){
			throw err;
		}
	});

db.run("INSERT INTO threads (description, title, upvotes, user_idt, sub_idt, counter, time, creator) VALUES (?, ?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?, ?)",
	"Mexico Bacon ipsum dolor amet pancetta chuck landjaeger alcatra capicola rump tri-tip turducken meatball. Venison pancetta shank ham." ,'My first trip to mexico..', 5, 1, 1, 2, "December 11, 2015 10:36 AM", "/photos/bob.png",
	"Bahamas Ground round kielbasa brisket hamburger tri-tip boudin. Bacon tongue capicola meatloaf landjaeger pork belly, chuck porchetta short loin ham.",'Amazing time at Bahamas..  some places you must visit', 3, 1, 2, 2, "December 11, 2015 10:36 AM", "/photos/bob.png",
	"DR Bacon ipsum dolor amet pancetta chuck landjaeger alcatra capicola rump tri-tip turducken meatball. Venison pancetta shank ham." ,'This resort was terrible..', 10, 1, 3, 2, "December 11, 2015 10:36 AM", "/photos/bob.png",
	"Bahamas Bacon ipsum dolor amet pancetta chuck landjaeger alcatra capicola rump tri-tip turducken meatball. Venison pancetta shank ham." ,'Atlantis was beautiful  best beaches', 2, 2, 2, 1, "December 11, 2015 10:36 AM", "/photos/spike.png",
	function(err){
		if(err){
			throw err;
		}
	});

db.run("INSERT INTO subforums (topic, time, creator) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?)", 
	"Mexico", "Oct 15, 2015 08:01 PM", "/photos/bob.png",  
	"Bahamas", "Nov 22, 2015 6:45 PM", "/photos/bob.png",
	"Dominica Republic", "December 11, 2015 10:36 AM", "/photos/spike.png", 
	function(err){
		if(err){
			throw err;
		}
	});

	db.run("INSERT INTO comments (comment, thread_idc, user_idc) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?)", 
		"Mexico Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", 1, 1,
		"Mexico It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", 1, 1,
		"Bahamas It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 2, 1,
		"DR It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 3, 1,
		"Bahamas It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 4, 1,
		"Bahamas Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", 4, 2,
		"DR It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", 3, 2,
		function(err){
			if(err){
				throw err;
			}
		});

	db.run("INSERT INTO images (url, thread_idi, user_idi) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?)", 
		"http://media-cdn.tripadvisor.com/media/photo-s/03/9b/30/18/riviera-maya.jpg", 1, 1,
		"https://cdn.kiwicollection.com/media/property/PR000063/xl/000063-09-night-pool.jpg", 1, 1,
		"http://www.latesail.com/blog/wp-content/uploads/2013/08/LateSAil_Bahamas3.jpg", 2, 1,
		function(err){
			if(err){
				throw err;
			}
		});



		