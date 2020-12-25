let mysql = require('mysql');

let con = mysql.createConnection({
    host: "sql7.freemysqlhosting.net",
    user: "sql7383845",
    password: "T6AdIhdBBu",
    database : 'sql7383845'
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});