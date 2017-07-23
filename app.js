var express = require('express');
var app = express();
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.send('<h1>Hello World!</h1>');
});

app.get('/login', function (req, res) {
    res.send('<h1>Login please</h1>');
});

app.listen(3000, function () {
    console.log('Connected 3000 port!');
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