var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var OrientoStore = require('connect-oriento')(session);
var db_config = require('config/db-config.json');
app.listen(3003, function() {
    console.log('Connected 3003 port!!!!')
});

app.use(bodyParser.urlencoded({ extended : false}));

// app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'aeoifja12312!@#%@#adfeas',
    resave: false,
    saveUninitialized: true,
    store: new OrientoStore({
        server: "host=localhost&port=2480username=root&password=cho8535&db=test"
    })
    // cookie: { secure: true }
}));


app.get('/count',function (req, res) {

    if(req.session.count) {
        req.session.count++;
    }else {
        req.session.count = 1;
    }
    res.send('count : '+req.session.count);
});

app.get('/auth/login', function (req, res) {
    var output = `
    <h1>Login</h1>
    <form action="/auth/login" method="post">
        <p>
            <input type="text" name ="username" placeholder="username">
        </p>
        <p>
            <input type="password" name ="password" placeholder="password">
        </p>
        <p>
            <input type="submit">
        </p>
    </form>
    `;
    res.send(output);
});

app.post('/auth/login', function (req, res) {
    var user = {
        username : 'degan',
        password : '111',
        displayName:'대근짱'
    };
    var uname = req.body.username;
    var pwd = req.body.password;

    if(uname === user.username && pwd === user.password) {
        req.session.displayName = user.displayName;
        req.session.save(function() {
            res.redirect('/welcome');
        });
    }else{
        res.send('Who are you? <a href="/auth/login">login</a>');
    }
});

app.get('/welcome', function (req, res) {
    if(req.session.displayName) {
        res.send(`<h1>Hello, ${req.session.displayName}</h1><a href="/auth/logout">logout</a>`)
    }else {
        res.send(`<h1>Welcome</h1><a href="/auth/login">Login</a>`)
    }
});

app.get('/auth/logout', function (req, res) {
    delete req.session.displayName;
    req.session.save(function() {
        res.redirect('/welcome');
    });
});