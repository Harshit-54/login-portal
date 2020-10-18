# login-portal
A login portal on express.js with mongodb as database.<br />
Hosted on http://13.234.119.154:3000/<br />
with <br />
super admin credentials<br />
  +  email : admin@admin.com<br />
  +  password : admin<br />
Other admin credentials<br />
  +  email : test@test.com<br />
  +  password : test<br />

Database - MongoDB<br />

Database schema <br />
```
document_json = {
  firstname : <string>,
  lastname : <string>,
  password : <string>,
  email : <string>,
  role : <string>,
  actions : <int32>
}
```
<H1>API Documentations</H1>

<H2>API features</H2>

<H3>Authentication</H3>
This authenticates the user, using post method,
app.post('/auth', function(request, response) {})

HTTP POST parameter <br />
OBJECT - DESCRIPTION <br />
```
request.body.email
request.body.password
```
<H3>Insert Data</H3>
Inserts new admin details in a form, and posts the request to mongodb, app.post('/insertData', function(request,response){}); <br />
HTTP POST request parameter<br />


```
document_json = {
  firstname : request.body.firstname,
  lastname : request.body.lastname,
  password : request.body.password,
  email : request.body.email,
  role : request.body.role,
  actions : request.body.actions
}
```


<H3>View Data - Management</H3> 

Used to retrieve data from the database of current admins using query.<br />

const collection = client.db("loginlist").collection("adminlist");<br />
var cursor = collection.find();				<br />
cursor.forEach(function(document,error){});<br />

It renders the user-list.ejs file, allows to post an insert new admin request.<br />


<H3>View Data - Non-Admin</H3>

Used to retrieve data from the database of current admins using query.<br />

const collection = client.db("loginlist").collection("adminlist");<br />
var cursor = collection.find();				<br />
cursor.forEach(function(document,error){});<br />

It renders the user-list-view.ejs file



