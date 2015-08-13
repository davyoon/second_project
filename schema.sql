DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS threads;
DROP TABLE IF EXISTS subforums;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id INTEGER PRIMARY KEY autoincrement,
	name TEXT
);

CREATE TABLE threads (
	id INTEGER PRIMARY KEY autoincrement,
	description TEXT,
	title TEXT,
	upvotes INTEGER,
	user_id INTEGER,
	sub_id INTEGER,
	counter INTEGER,
	FOREIGN KEY(user_id) REFERENCES users(id),
	FOREIGN KEY(sub_id) REFERENCES subforums(id)
);

CREATE TABLE subforums (
	id INTEGER PRIMARY KEY autoincrement,
	topic TEXT
);

CREATE TABLE images (
  id INTEGER PRIMARY KEY autoincrement,
  url TEXT, 
  thread_id INTEGER,
 	user_id INTEGER,
 	FOREIGN KEY(thread_id) REFERENCES threads(id),
 	FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE comments (
	id INTEGER PRIMARY KEY autoincrement,
	comment TEXT,
	thread_id INTEGER,
	user_id INTEGER,
	FOREIGN KEY(thread_id) REFERENCES threads(id),
	FOREIGN KEY(user_id) REFERENCES users(id)
);

