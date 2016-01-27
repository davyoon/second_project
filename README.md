#TRAVEL INSIGHT

Travel Insight is a forum where users create subforums, threads, and comment about their personal experience on their vacation spots. Subforums are categorized by different countries and threads are categorized by different resorts/place they stayed.  Users can also upvote each thread.

##Minimum Viable Product
* Facebook OAuth
* Create subforums
* Create threads
* Enable commenting on threads
* Enable users to upvote threads

##Wireframe
![ERD](readme_pic/wireframe.jpg)

##ERD
![ERD](readme_pic/erd.jpg)

##Routes

* app.get('/')
* app.get('/login')
* app.get('/forums')
* app.get('/forums/sub/:sid')
* app.post('/forums/new')
* app.get('/forums/gallery/:tid')
* app.post('/forums/gallery/:tid')
* app.get('/forums/thread/:tid')
* app.post('/forums/thread/:sid')
* app.post('/forums/comment/:tid')
* app.put('/forums/upvote/:tid')

##Pseudocode

Get route '/'
* redirect to '/login'

Get route '/login'

* render ('main.ejs')

Get route '/forums'

* get all from subforums table
* render ('index.ejs')

Get route '/forums/sub/:sid'

* get all from threads and INNER JOIN users (all threads for selected subforum ordered by upvotes)

* render ('thread.ejs')

Get route '/forums/new' (post)

* insert into subforums table
* redirect to '/forums'

Get route '/forums/thread/:sid' (post)

* insert into threads table
* redirect to '/forums/sub/' + sid

Get route '/forums/comment/:tid' (post)

* insert into comments table
* update counter on threads table
* redirect to ('/forums/thread/' + tid)

Get route '/forums/thread/:tid'

* get all from threads table
* get all from comments and INNER JOIN users (all comments for selected thread)
* get all from subforums table
* render ('comments.ejs')

Get route '/forums/upvote/:tid' (put)

* update upvotes on threads table
* redirect to ('/forums/thread/' + tid)

Get route '/forums/gallery/:tid'

* get all from images table
* get all from subforums
* render ('gallery.ejs')

Get route '/forums/gallery/:tid' (post)

* insert into images table
* redirect to ('/forums/gallery' + tid)

##Technologies
* HTML/CSS
* JavaScript
* Semantic UI
* Node.js
* Express.js
* SQLite3
* Moment.js

##Features
* Facebook OAuth
* Create subforums
* Create threads
* Enable commenting on threads
* Enable users to upvote threads
* Add images to each thread



