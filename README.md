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

API features

Authentication
This authenticates the user, using post method,
```app.post('/auth', function(request, response) {});```
HTTP POST request parameter
OBJECT - DESCRIPTION
request.body.email
request.body.password

Insert Data
HTTP POST request parameter

View Data - Management
HTTP GET request

View Data - Non-Admin
HTTP GET request



