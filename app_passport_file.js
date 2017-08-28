var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
// var FileStore = require('session-file-store')(session);
var OrientoStore = require('connect-oriento')(session);
var db_config = require('./config/db-config.json');

var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var assert = require("assert");
var opts = {
    password: "helloorld"
};
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(session({
    secret: 'aeoifja12312!@#%@#adfeas',
    resave: false,
    saveUninitialized: true,
    store: new OrientoStore({server : db_config})
    // cookie: { secure: true }
}));

app.listen(3003, function() {
    console.log('Connected 3003 port!!!!')
});

app.use(bodyParser.urlencoded({ extended : false}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/count',function (req, res) {

    if(req.session.count) {
        req.session.count++;
    }else {
        req.session.count = 1;
    }
    res.send('count : '+req.session.count);
});

var users = [
    {
        username : 'degan',
        password : 'Dm0Emwy/jLfGXS50Q36VzaM03WrLtmd9veObf7qvuMDXew8UzhI2d90Bu/l22fz5XAYQCaCLDQViRshZG63g2E35w1OrLhCwWyCOpQlTFwY21EOTAbXcnL5WNWG+rvMT7bs1/MlZorID1EXOFrKdQAWGDV3HnRYhv5JkpfHHz44=',
        displayName:'대근짱',
        salt : 'PRlbu4T4AZ9fe/YfO4K3Pe78AzxmVZIDNQBgmnuYQkvwvE1uSUOMdZiTXrMkYyK82HT+dEnaxu05iwcEDq6nCQ=='
    }
];



app.get('/auth/register', function (req, res) {
    var output = `
    <h1>Register</h1>
    <form action="/auth/register" method="post">
        <p>
            <input type="text" name ="username" placeholder="username">
        </p>
        <p>
            <input type="password" name ="password" placeholder="password">
        </p>
        <p>
            <input type="text" name ="displayName" placeholder="displayName">
        </p>
 
        <p>
            <input type="submit">
        </p>
    </form>
    `;

    res.send(output);
});

app.post('/auth/register', function (req, res) {
    hasher({password:req.body.password}, function (err, pass, salt, hash) {
        var user = {
            username : req.body.username,
            password : hash,
            salt : salt,
            displayName: req.body.displayName
        };
        users.push(user);

        req.session.displayName = req.body.displayName;
        req.session.save(function () {
            res.redirect('/welcome');
        });
    });
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

passport.use(new LocalStrategy(
    function (username, password, done) {
        var uname = req.body.username;
        var pwd = req.body.password;
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            if (uname === user.username) {
                return hasher({password: pwd, salt: user.salt}, function (err, pass, salt, hash) {
                    if (hash === user.password) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                });
            }
        }
        done(null, false);
    }
));
app.post(
    '/auth/login', 
    passport.authenticate(
        'local', 
        { 
            successRedirect: '/welcome',
            failureRedirect: '/auth/login',
            failureFlash: false 
        }
    )
);


// app.post('/auth/login', function (req, res) {
//     var uname = req.body.username;
//     var pwd = req.body.password;
//     for(var i=0; i<users.length; i++) {
//         var user = users[i];
//         if(uname === user.username) {
//             return hasher({password : pwd, salt : user.salt}, function(err, pass, salt, hash){
//                 if(hash === user.password) {
//                     req.session.displayName = user.displayName;
//                     req.session.save(function () {
//                         res.redirect('/welcome');
//                     })
//                 }else {
//                     res.send('Who are you? <a href="/auth/login">login</a>');
//                 }
//             });
//         }
//     }
// });

app.get('/welcome', function (req, res) {
    if(req.session.displayName) {
        res.send(`<h1>Hello, ${req.session.displayName}</h1><a href="/auth/logout">logout</a>`)
    }else {
        res.send(`
            <h1>Welcome</h1>
            <ul>
                <li><a href="/auth/login">Login</a></li>
                <li><a href="/auth/register">Register</a></li>
            </ul>
`)
    }
});

app.get('/auth/logout', function (req, res) {
    delete req.session.displayName;
    res.redirect('/welcome');
});