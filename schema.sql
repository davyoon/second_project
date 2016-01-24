DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS threads;
DROP TABLE IF EXISTS subforums;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id INTEGER PRIMARY KEY,
	user_id INTEGER,
	access_token VARCHAR(255),
	name VARCHAR(255),
	image TEXT
);

CREATE TABLE threads (
	threads_id INTEGER PRIMARY KEY autoincrement,
	description TEXT,
	title TEXT,
	upvotes INTEGER,
	user_idt INTEGER,
	sub_idt INTEGER,
	counter INTEGER,
	FOREIGN KEY(user_idt) REFERENCES users(users_id),
	FOREIGN KEY(sub_idt) REFERENCES subforums(subforums_id)
);

CREATE TABLE subforums (
	subforums_id INTEGER PRIMARY KEY autoincrement,
	topic TEXT
);

CREATE TABLE images (
  images_id INTEGER PRIMARY KEY autoincrement,
  url VARCHAR, 
  thread_idi INTEGER,
 	user_idi INTEGER,
 	FOREIGN KEY(thread_idi) REFERENCES threads(threads_id),
 	FOREIGN KEY(user_idi) REFERENCES users(users_id)
);

CREATE TABLE comments (
	comments_id INTEGER PRIMARY KEY autoincrement,
	comment TEXT,
	thread_idc INTEGER,
	user_idc INTEGER,
	FOREIGN KEY(thread_idc) REFERENCES threads(threads_id),
	FOREIGN KEY(user_idc) REFERENCES users(threads_id)
);

