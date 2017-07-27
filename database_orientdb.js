var Oriento = require('oriento');

var server = Oriento({
    host: 'localhost',
    HTTPport: 2480,
    username: 'root',
    password: 'cho8535'
});

var db = server.use('test');
console.log('Using database: ' + db.name);

db.record.get('#22:0').then(function (record) {
    console.log('Loaded record:', record);
});


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

var sql = 'INSERT INTO topic (title, description) VALUES(:title, :desc)';
db.query(sql, {
    params: {
        title: 'Express',
        desc: 'Express is framework for web'
    }
}).then(function(result) {
    console.log(result);
});