// var http =require("http");
// http.createServer(function(req,res){
// res.writeHead(200,{'content-Type':'text/html'});
// res.write('<head> <meta charset="utf-8"/></head>');
// res.end("你好\n");
// }).listen(1335,"127.0.0.1");
// console.log('server running');
var mysql = require('mysql');
var express = require('express');
// var app = express();
// fs = require('fs');
var app = require('http').createServer(handler);
var arr = [];
var connect = {
    //连接数据库对象
    con: mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'metadata',
        port: '3306'
    }),
    get_count: function (con) {
        con.connect();
        con.query('select * from metadata_count', function (er, rows, fileds) {
            if (er) throw err;
            for (i in rows) {
                // console.log("the id is:", rows[i]);
                arr[i]=rows[i].genre;
            }
        });
        con.end();
    },
};
var con = connect.get_count(connect.con);
// app.get('/user', function(req, res) {
//         res.send(arr);
//     });
// app.get('/', function(req, res) {
//         res.send(home.html);
//     });
// app.listen(3000);
// 加载客户端首页

function handler(req, res) {
    fs.readFile(__dirname + '/home.html', function (err, data) {
        if (err) {
            console.log(err);
            res.writeHead(500);
            return res.end('加载客户端首页发生错误...');
        }
        res.writeHead(200);
        res.end(data);
    });

}

 
