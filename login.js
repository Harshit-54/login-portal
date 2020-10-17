
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var assert= require('assert');
var mongo = require('mongodb');


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://harshit:testpassword@cluster0.4ey90.mongodb.net/loginlist?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });

var app = express();

app.set('view engine', 'ejs');
app.set('view options', {
    layout: false
});

app.use(session({
	secret: 'secret',
	resave: true,

	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.get('/', function(request, response) {	
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/insertData', function(request,response){
	console.log("Inserted");
	const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
	
	client.connect(err => {
	  	const collection = client.db("loginlist").collection("adminlist");
	  	var item = {
		  	firstname:request.body.firstname,
			lastname:request.body.lastname,
			password:request.body.password,
			email:request.body.email,
			role:request.body.role,
			actions:request.body.actions 
	  	}
	  	console.log("Document being inserted...");
	  	console.log(item);
	  	collection.insertOne(item,function(error,result){
			if(!error)
				console.log("item inserted");
			else 
				console.log("not inserted" + error);
			client.close();
			response.redirect("/management");	
		});
	});

	
});

var first_name = "null";

app.post('/auth', function(request, response) {
	var email = request.body.email;
	var password = request.body.password;
	
	if (email && password) {
		var resultArray = [];
		const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
		
		client.connect(err => {
			assert.equal(null,err);
		  	const collection = client.db("loginlist").collection("adminlist");
		 	collection.findOne({email:email, password:password} ,function(err,res){
		  	if(res){
		  		console.log("in findone" + res.role);
		  		first_name= res.firstname;
		  		if(res.role=="super_admin")
				{	
					response.redirect('/management');
					console.log("Super admin!");
				}
				else 
				{
					response.redirect('/view');
					console.log("not super_admin");
				}
			}
		  	else 
		  	{
		  		console.log("Unknown user");
		  		response.send("Unknow User");
		  	}
		  	client.close();
		  });
		});
	} 
	else 
	{
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/management', function(request,response){

	var resultArray = [];
	const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
	client.connect(err => {
		assert.equal(null,err);
		const collection = client.db("loginlist").collection("adminlist");
		
		//query to display data
		var cursor = collection.find();				
		cursor.forEach(function(document,error){
			assert.equal(null,error);
		 	resultArray.push(document);	
		},function(){
		 	client.close();
		 	response.render('user-list', {userData:resultArray,name:first_name});
		 	console.log("IN MANAGEMENT");
		});
	});
});

app.get('/view', function(request, response) {
	var firstname;
	var resultArray = [];
	const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
		client.connect(err => {
			assert.equal(null,err);
		  	const collection = client.db("loginlist").collection("adminlist");

		  	//query to display data
		  	var cursor = collection.find();

		  	cursor.forEach(function(document,error){
		 	assert.equal(null,error);
		 	resultArray.push(document);	
		 },function(){
		 	response.render('user-list-view', {userData:resultArray,name:first_name});
		 	client.close();
		 	console.log("IN VIEW");
		 });
	});
});


app.listen(3000, function(){
	console.log("listening at port 3000 ");
});