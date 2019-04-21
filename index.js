const pug = require('pug');
const compiledFunction = pug.compileFile('views/main.pug');
const e = require('express');
const app = e();
const path = require('path');
const request = require('request');
const util = require('util');
const APP_PORT = process.env.PORT || 3000;
const BACKEND_HOST = process.env.BACKEND_HOST || 'localhost';
const BACKEND_SCHEMA = process.env.BACKEND_SCHENA || 'http';
const BACKEND_PORT = process.env.BACKEND_PORT || 80;
const BACKEND_API_VER = process.env.BACKEND_API_VER || 'v1';

const BACKEND_URI = util.format('%s://%s:%s/%s', BACKEND_SCHEMA, BACKEND_HOST, BACKEND_PORT, BACKEND_API_VER);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(e.static('static'));

app.get('/', function(gl_req, gl_res) {
  request(util.format('%s/projects/list', BACKEND_URI), {json: true}, (err, res, body) => { 
    if (err) { 
      console.log('Error connecting go backend: ' + err);
      var projects = [];
    } else {
      var projects = body['projects'];
      console.log("body keys are: " + Object.keys(body['projects']));
    }
    projects.forEach(function(el) {console.log("elem is " + el)});
    gl_res.render('main', { "projects": projects });
  });
})


app.listen(APP_PORT, function() {
  console.log("Listening on port " + APP_PORT);
})
