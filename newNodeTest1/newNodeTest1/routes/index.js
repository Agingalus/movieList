
module.exports = function (app, db) {
  var ObjectID = require('mongodb').ObjectID;

  /* GET New User page. */
  app.get('/', function (req, res) {
    res.render('welcomeJade');
  });

  app.get('/userlist', async function (req, res) {
    try {
      var doc = await db.collection('UserCollection').find().toArray();
      res.render('userlistJade', {
        "userlist": doc
      });
    }
    catch (err) {
      console.log('get all failed');
      console.error(err);
    }
  });

  /* GET New User page. */
  app.get('/newuser', function (req, res) {
    res.render('newuserJade', { title: 'Add New User' });
  });

  app.post('/adduser', (req, res) => {
    const note = {
      username: req.body.username,
      email: req.body.useremail
    };
    db.collection('UserCollection').insertOne(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.redirect("userlist");
      }
    });
  });

  // form to let user enter name to get details
  app.get('/userbyname/', function (req, res) {
    res.render('userbynameJade', { title: 'Search data by use name' });
  });

  app.post('/finduser', (req, res) => {
    const details = { username: req.body.username };
    db.collection('UserCollection').findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred :(' });
      } else {
        console.log(item);
        if (item == null) {  // if there is no such name, don;t just crash the client side code
       item = {username: 'no such user', email: ""}
      }
        res.render('userDetailJade', {
          "userdetail": item
        });
      }
    });
  });

  app.delete('/deleteUser/:bid', (req, res) => {
    const theName = req.params.bid;
    console.log(theName);
    //const details = { '_id': new ObjectID(id) };  not using the _id
    const which = { 'username': theName };  // delete by username
    db.collection('UserCollection').deleteOne(which, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred :(' });
      } else {
        res.send('Note ' + theName + ' deleted!');
      }
    });
  });

  app.put('/updateuser/:id', (req, res) => {
    const who_id = req.params.id;
    const note = req.body;
    const newEmail = note.email;
    const newName = note.username;
    //const details = { '_id': new ObjectID(who_id) };  // not going to try and update by _id
    // wierd bson datatype add complications
    
    // if uddating more than one field: 
    //db.collection('UserCollection').updateOne({ username: who_id }, { $set: { "email": newEmail, "title": newTitle } }, (err, result) => {
    
    // updating just email using name as key
    db.collection('UserCollection').updateOne({ username: who_id }, { $set: { "email": newEmail, "username": newName } }, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(note);
      }
    });
  });

  //===============================================================================
  //===============================================================================
  //===============================================================================
  //  grouping a set of calls within a URL /name/  /admin/
  // GET default admin with no path
  app.get('/admin/', function (req, res) {
    res.send('Hello from admin route head');
  });

  /* GET admin time. */
  app.get('/admin/gettime', function (req, res) {
    var currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();
    res.render('gettimeJade', {
      "time": datetime
    });
  });

 
 
//  a(href='/echo/dog') echo /
  app.get('/echo/:id', function (req, res) {
     const value = req.params.id;
    res.send(value);  // value = dog
  });



};  // end of mod exports