/**
 * Created by Administrator on 2016/3/20.
 */
/**
 * Created by Administrator on 2016/2/25.
 */
var mysql = require('mysql');  //调用MySQL模块
var express = require('express');//调用express模块
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({extended: false});


var app = express();
app.use(express.static('../myNode'));
app.get('/', function (req, res) {
    res.send('Hello World');
});

//登录的接口
app.post('/login', urlencodedParser, function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var isLogin = false;
    var selectSQL = 'select * from node';
    var connection = mysql.createConnection({
        host: 'localhost',       //主机
        user: 'root',               //MySQL认证用户名
        database: 'nodejs',              //数据库名称
        password: 'root',        //MySQL认证用户密码
        port: '3306',                   //端口号
        charset: "utf8"
    });
    //创建一个connection
    connection.connect(function (err) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        console.log('[connection connect]  succeed!');
    });
    //执行SQL语句
    connection.query(selectSQL, function (err, rows, fields) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        } else {
            for (var i = 0; i < rows.length; i++) {
                if (username == rows[i].username && password == rows[i].password) {
                    isLogin = true;
                    break;
                }
            }
            // 输出 JSON 格式
            response = {
                isLogin: isLogin
            };
            console.log(response);
            res.end(JSON.stringify(response));
        }
    })
});
//注册的接口
app.post('/register', urlencodedParser, function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var isLogin = false;
    var isRegister = false;
    var selectSQL = 'select * from node';
    var connection = mysql.createConnection({
        host: 'localhost',       //主机
        user: 'root',               //MySQL认证用户名
        database: 'nodejs',              //数据库名称
        password: 'root',        //MySQL认证用户密码
        port: '3306',                   //端口号
        charset: "utf8"
    });
    //创建一个connection
    connection.connect(function (err) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        console.log('[connection connect]  succeed!');
    });
    //执行SQL语句
    connection.query(selectSQL, function (err, rows, fields) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        } else {
            for (var i = 0; i < rows.length; i++) {
                if (username == rows[i].username) {
                    isRegister = true;
                    break;
                }
            }

            if (isRegister) {
                // 输出 JSON 格式
                response = {
                    isRegister: isRegister
                };
                console.log(response);
                res.end(JSON.stringify(response));
            } else {
                var insertSQL='insert into node(username,password) VALUES(?,?)';
                connection.query(insertSQL,[username,password], function(err, rows, fields) {
                    if (err) {
                        console.log('[query] - :'+err);
                        return;
                    }else {
                        // 输出 JSON 格式
                        response = {
                            isRegister: isRegister
                        };
                        console.log(response);
                        res.end(JSON.stringify(response));
                    }
                });
            }

        }
    })
});
app.listen(8082);


