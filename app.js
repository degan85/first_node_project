var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
// var FileStore = require('session-file-store')(session);
// var OrientoStore = require('connect-oriento')(session);
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

app.set('view engine', 'jade');
app.use(express.static('public'));
app.use('/user', express.static('uploads'));
app.set('views', './views');
app.locals.pretty = true;
// app.use(session({
//     secret: 'aeoifja12312!@#%@#adfeas',
//     resave: false,
//     saveUninitialized: true,
//     // store: new FileStore({logFn: function(){}})
//     store: new OrientoStore({
//         server: "host=localhost&port=2480username=root&password=cho8535&db=test"
//     })
//     // cookie: { secure: true }
// }));

// app.get('/count', function (req, res) {
//     if(req.session.count) {
//         req.session.count++;
//     } else {
//         req.session.count = 1;
//     }
//
//    res.send('count : ' + req.session.count);
// });
app.get('/mico/:id', function(req, res) {
    // req.session.aaa = req.params.id;
    res.render('original_animate',
        { id : req.params.id }
        );
});

app.get('/originalanimate', function(req, res) {
    res.render('original_animate');
});

app.get('/animate', function(req, res) {
    res.render('animate');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.get('/upload', function(req, res) {
    res.render('upload');
});

app.post('/upload', upload.single('userfile'), function(req, res) {
    console.log(req.file);
    res.send('upload : '+req.file.originalname);
});

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

app.listen(8081, function () {
    console.log('Connected 8081 port!');
});