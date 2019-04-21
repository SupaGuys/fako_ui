const pug = require('pug');
const compiledFunction = pug.compileFile('views/main.pug');
const e = require('express');
const app = e();
const path = require('path');
const request = require('request');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(e.static('static'));

app.get('/', function(gl_req, gl_res) {
  request('http://localhost/v1/projects/list', {json: true}, (err, res, body) => { 
    if (err) { 
      gl_res.send('zhopa'); 
      console.log('err is ' + err);
      return;
    }
    console.log('res is ' + res.toJSON + '\n status code is ' + res.statusCode + '\nkeys: ' + Object.keys(res));
    console.log('body is ' + body == Array);
    console.log('le is ' + body['projects'].length);
    body['projects'].forEach(function(el) {console.log("elem is " + el)});
    gl_res.render('main', {"projects": body['projects']});
  });
  //res.render('main')
})


app.listen(3000, function() {
  console.log("3000");
})
