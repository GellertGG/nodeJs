/**
 * Created by Administrator on 2016/2/25.
 */
var mysql = require('mysql');  //调用MySQL模块
var http = require('http');       //调用http模块
var query = require("querystring");    //解析POST请求

//创建服务器
http.createServer(function (request, response) {
    var postdata = "";
    request.on("data", function (postchunk) {
        postdata += postchunk;
    });
    request.on("end", function () {
        var params = query.parse(postdata);
        var isLogin;
        var isRegister;
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
                if (params.type == "login") {
                    console.log(rows);
                    for (var i = 0; i < rows.length; i++) {
                        console.log(params);
                        if (params.username == rows[i].username && params.password == rows[i].password) {
                            isLogin = true;
                            break;
                        }
                    }
                    response.writeHead(200, {
                        "Content-Type": "text/plain",
                        "Access-Control-Allow-Origin": "http://localhost:63342"
                    });
                    console.log(isLogin);
                    if (isLogin) {
                        response.write("Y");
                    } else {
                        response.write("N");
                    }
                    response.end();
                } else {
                    console.log(rows);
                    for (var i = 0; i < rows.length; i++) {
                        console.log(params);
                        if (params.username == rows[i].username) {
                            isRegister = true;
                            break;
                        }
                    }
                    response.writeHead(200, {
                        "Content-Type": "text/plain",
                        "Access-Control-Allow-Origin": "http://localhost:63342"
                    });
                    if (isRegister) {
                        response.write("N");
                        response.end();
                    } else {
                        var insertSQL='insert into node(username,password) VALUES(?,?)';
                        console.log(insertSQL);
                        connection.query(insertSQL,[params.username,params.password], function(err, rows, fields) {
                            if (err) {
                                console.log('[query] - :'+err);
                                return;
                            }else {
                                console.log(insertSQL);

                                response.write("Y");
                                response.end();
                            }
                        });
                    }
                }

            }
        });

    })
}).listen(8080);
console.log("nodejs start listen 8080 port!");

////定义校验是否可以登录函数
//function checkLogin(params){
//
//}
//
//
////创建一个connection
//var connection = mysql.createConnection({
//    host     : 'localhost',       //主机
//    user     : 'root',               //MySQL认证用户名
//    database: 'nodejs',              //数据库名称
//    password : 'root',        //MySQL认证用户密码
//    port: '3306',                   //端口号
//    charset: "utf8"
//});
////查询
//var selectSQL='select * from node';
////添加
//var insertSQL='insert into node (username)values("mary")';
////修改
//var updateSQL='update node set username="caton",password=23 where username="mary"';
////删除
//var deleteSQL='delete from node where username="caton"';
////创建一个connection
//connection.connect(function(err){
//    if(err){
//        console.log('[query] - :'+err);
//        return;
//    }
//    console.log('[connection connect]  succeed!');
//});
////执行SQL语句
//connection.query(updateSQL, function(err, rows, fields) {
//    if (err) {
//        console.log('[query] - :'+err);
//        return;
//    }
//});
//关闭connection
//connection.end(function(err){
//    if(err){
//        return;
//    }
//    console.log('[connection end] succeed!');
//});

