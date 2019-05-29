module.exports = function(app, db) {
    var ObjectID = require('mongodb').ObjectID;

    /* GET New User page. */
    app.get('/', function(req, res) {
        res.sendFile('mySpa.html', { root: __dirname });
    });

    app.get('/workList', async function(req, res) {
        try {
            var doc = await db.collection('Work').find().toArray();
            //var doc = await db.collection('UserCollection').find().toArray();
            // res.render('noteListJade', {
            //     "noteList": doc
            // });
            //doc.sort(compare);

            res.send(doc);
        } catch (err) {
            console.log('get all failed');
            console.error(err);
        }
    });

    function compare(a, b) {
        if (a.Priority < b.Priority) {
            return -1;
        }
        if (a.Priority > b.Priority) {
            return 1;
        }
        return 0;
    };


    // /* GET New User page. */
    // app.get('/newWork', function(req, res) {
    //     res.render('newNoteJade', { title: 'Add New Note' });
    // });

    app.post('/addWork', (req, res) => {
        const note = {
            Name: req.body.Name,
            WorkType: req.body.WorkType,
            DateEntered: req.body.DateEntered,
            Start: req.body.Start,
            End: req.body.End,
            TotalTime: req.body.TotalTime,
            PerHour: req.body.PerHour,
            TotalPay: req.body.TotalPay,
            DateWorked: req.body.DateWorked,

            //username: req.body.username,
            //email: req.body.useremail
        };
        db.collection('Work').insertOne(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                //res.redirect("./workList");
            }
        });
    });

    // // form to let user enter name to get details
    // app.get('/noteBySubject/', function(req, res) {
    //     res.render('noteBySubjectJade', { title: 'Search data by note subject' });
    // });

    app.get('/findWork/:id', (req, res) => {
        //var subject = req.params.id;
        //const subject = { Subject: req.body.noteSubject };
        var workType = { WorkType: req.params.id };
        console.log("this is the workType: " + workType);
        db.collection('Work').findOne(workType, (err, item) => {
            if (err) {
                console.log(err);
                res.send({ 'error': 'An error has occurred :(' });
            } else {
                console.log(item);
                if (item == null) { // if there is no such name, don;t just crash the client side code
                    item = {
                        Name: "",
                        WorkType: 'no such work type',
                        DateEntered: "",
                        Start: "",
                        End: "",
                        TotalTime: "",
                        PerHour: "",
                        TotalPay: "",
                        DateWorked: ""
                    }
                }
                // res.render('noteDetailJade', {
                //     "noteDetail": item
                //});
                res.send(item);
            }
        });
    });

    app.delete('/deleteWork/:bid', (req, res) => {
        const theWork = req.params.bid;
        console.log(theWork);
        //const details = { '_id': new ObjectID(id) };  not using the _id
        const which = { 'WorkType': theWork }; // delete by subject
        db.collection('Work').deleteOne(which, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred :(' });
            } else {
                res.send('Work ' + theWork + ' deleted!');
            }
        });
    });

    app.put('/updateWork/:id', (req, res) => {
        //var workType = { WorkType: req.params.id }
        const what_id = req.params.id;
        const work = req.body;
        const updateName = work.Name;
        const updateWorkType = work.WorkType;
        //const updateDateEntered = work.DateEntered;
        const updateStart = work.Start;
        const updateEnd = work.End;
        const updateTotalTime = work.TotalTime;
        const updatePerHour = work.PerHour;
        const updateTotalPay = work.TotalPay;
        const updateDateWorked = work.DateWorked;
        //const details = { '_id': new ObjectID(who_id) };  // not going to try and update by _id
        // wierd bson datatype add complications

        // if uddating more than one field: 
        //db.collection('UserCollection').updateOne({ username: who_id }, { $set: { "email": newEmail, "title": newTitle } }, (err, result) => {

        // updating just email using name as key
        db.collection('Work').updateOne({ WorkType: what_id }, {
            $set: {
                Name: updateName,
                WorkType: updateWorkType,
                //DateEntered: updateDateEntered,
                Start: updateStart,
                End: updateEnd,
                PerHour: updatePerHour,
                TotalPay: updateTotalPay,
                DateWorked: updateDateWorked,
                TotalTime: updateTotalTime

            }
        }, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(work);
            }
        });
    });

    //===============================================================================
    //===============================================================================
    //===============================================================================
    //  grouping a set of calls within a URL /name/  /admin/
    // GET default admin with no path
    app.get('/admin/', function(req, res) {
        res.send('Hello from admin route head');
    });

    /* GET admin time. */
    app.get('/admin/gettime', function(req, res) {
        var currentdate = new Date();
        var datetime = "Last Sync: " + currentdate.getDate() + "/" +
            (currentdate.getMonth() + 1) + "/" +
            currentdate.getFullYear() + " @ " +
            currentdate.getHours() + ":" +
            currentdate.getMinutes() + ":" +
            currentdate.getSeconds();
        res.render('gettimeJade', {
            "time": datetime
        });
    });



    //  a(href='/echo/dog') echo /
    app.get('/echo/:id', function(req, res) {
        const value = req.params.id;
        res.send(value); // value = dog
    });



}; // end of mod exports
/*
            Name
            WorkType
            DateEntered
            Start
            End
            TotalTime
            PerHour
            TotalPay
            DateWorked
*/