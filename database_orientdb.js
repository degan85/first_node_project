// var Oriento = require('oriento');
// var db_config = require('./config/db-config.json');
var nopt = require('nopt');
var express = require('express');
var app = express();
var session = require('express-session');
var longOpts = {
    "sessionSecret" : String,
};

var shortOpt = {
    "s": ["--sessionSecret"],
}

// var parsed = nopt(longOpts, shortOpt, process.argv, 2);
// console.log("session secret is : ",parsed.sessionSecret.a);
console.log(app.use(session({secret: process.env.SESSION_SECRET})));
// var server = Oriento({
//     host: 'localhost',
//     HTTPport: 2480,
//     username: 'root',
//     password: 'cho8535'
// });

// var db = server.use('test');
// console.log('Using database: ' + db.name);

// db.record.get('#22:0').then(function (record) {
//     console.log('Loaded record:', record);
// });


// CREATE

// var sql = 'SELECT FROM topic';
// db.query(sql).then(function(result) {
//    console.log(result);
// });

// var sql = 'SELECT FROM topic WHERE @rid = :rid';
// var param = {
//     params:{
//         rid : '#22:0'
//     }
// }
//
// db.query(sql, param).then(function(result) {
//     console.log(result);
// });

// var sql = 'INSERT INTO topic (title, description) VALUES(:title, :desc)';
// db.query(sql, {
//     params: {
//         title: 'Express',
//         desc: 'Express is framework for web'
//     }
// }).then(function(result) {
//     console.log(result);
// });

// server.list()
//     .then(function (dbs) {
//         console.log('There are ' + dbs + ' databases on the server.');
//     });

// var sql = "UPDATE topic SET title=:title where @rid=:rid";
// db.query(sql, {params:{title : 'Expressjs', rid : '#23:0'}}).then(function (result) {
//     console.log(result);
// });

// var sql = "DELETE FROM topic WHERE @rid=:rid";
// db.query(sql, {params:{rid : '#23:0'}}).then(function (result) {
//     console.log(result);
// });



// db.close();