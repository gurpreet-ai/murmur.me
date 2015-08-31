var express = require('express');
var app = express();

var mongojs = require('mongojs');
// database and collection
var db = mongojs('contactList', ['contactList']);

var bodyParser = require('body-parser');

// telling node to look for static files (html, css, image, javascript)
// static because they don't change dynamically
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// GET
app.get('/contactList', function (req, res) {
	console.log("I recieved a get request");

	db.contactList.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	});

// 	---------------------------------------------------
// 	Data from server to controller to index.html
// 	---------------------------------------------------
// 	person1 = {
//        name: 'Tim',
//        email: 'tim@gmail.com',
//        number:'(571) 426-1433'
//    };

//    person2 = {
//        name:'Liam',
//        email:'neason@taken2.com',
//        number: '(777) 777-7777'
//    };

//    person3 = {
//        name: 'Jessie',
//        email:'jessie@vma.com',
//        number: '(684) 426-1232'
//    };

//    var contactList = [person1, person2, person3];

//    res.json(contactList);

});

// POST
app.post('/contactList', function (req, res) {
	console.log(req.body);

	db.contactList.insert(req.body, function (err, doc) {
		res.json(doc);
	});
});

// DELETE
app.delete('/contactList/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactList.remove({ _id: mongojs.ObjectId(id) }, function (error, doc) {
		res.json(doc);
	});
});

// Edit
app.get('/contactList/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactList.findOne({ _id: mongojs.ObjectId(id) }, function (error, doc) {
		res.json(doc);
	});
});

// PUT
app.put('/contactList/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.contactList.findAndModify({
		query: { _id: mongojs.ObjectId(id) }, 
		update: { $set: {name: req.body.name, email: req.body.email, number: req.body.number }}, 
		new: true }, function (error, doc) {
			res.json(doc);
		});
});

// app.get('/', function (request, response) {
// 	response.send("Hello world from server js");
// });

app.listen(3003);
console.log("server running on port 3003");