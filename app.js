var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'jade');
app.use(express.static('public'));
app.set('views', './views');
app.locals.pretty = true;
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/form_reciver',function(req, res) {
   var title = req.body.title;
   var description = req.body.description;
   res.send(title+", "+description);
});

app.get('/form', function(req, res) {
   res.render('form');
});

app.get('/topic/:id', function(req, res) {
   var topic = [
       'Javascript is...',
       'Nodejs is...',
       'Expressipt is...',
   ];
   var output = `
        <a href="/topic/0">JavaScript</a><br>
        <a href="/topic/1">nodejs</a><br>
        <a href="/topic/2">Express</a><br>
        ${topic[req.params.id]}
   `
   res.send(output);
});

app.get('/topic/:id/:mode', function(req, res) {
    res.send(req.params.id+' ,'+req.params.mode);
});

app.get('/template', function(req, res) {
   res.render('temp', {time: Date()});
});

app.get('/', function (req, res) {
    res.send('<h1>Hello World!</h1>');
});

app.get('/login', function (req, res) {
    res.send('<h1>Login please</h1>');
});

app.get('/background',function(req, res) {
    res.send('Hello background img, <img src="/background.jpg">');
});

app.get('/dynamic', function(req, res) {
    var time = Date();
   var lis = '';
   for(var i=0; i<7; i++) {
       lis = lis + '<li>cording</li>';
   }

    var output = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>static html</title>
</head>
<body>
    <h1>Hello dynamic html</h1>
    <ul>
        ${lis}
    </ul>
    ${time}
</body>
</html>`;
    res.send(output);
});

app.listen(3000, function () {
    console.log('Connected 3000 port!');
});
