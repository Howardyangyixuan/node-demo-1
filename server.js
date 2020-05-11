var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("错误:请指定端口!\nnode server.js 8888\n");
  process.exit(1);
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;
  // 声明文件操作系统对象
  var fs = require("fs");
  /******** 从这里开始看，上面不要看 ************/

  console.log("收到请求！路径（带查询参数）为：" + pathWithQuery);

  if (path === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`
      <!DOCTYPE html>
      <head>
      <link rel="stylesheet" href="/css">
      <script src="/js"></script>
      </head>
      <body>
      </body>
      `);
    fs.readFile("./intro.html", "utf-8", function (err, data) {
      if (err) {
        throw err;
      } else {
        response.write(data);
        response.end();
      }
    });
  } else if (path === "/css") {
    console.log("还没有设计css，这个坑以后填上");
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/css;charset=utf-8");
    response.write(``);
    response.end();
  } else if (path === "/js") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/javascript;charset=utf-8");
    response.write(`console.log('这是js内容')`);
    response.end();
  } else if (path === "/images/1.jpg") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "image/jpeg");
    fs.readFile("./images/1.jpg", "binary", function (err, data) {
      if (err) {
        throw err;
      }
      console.log("输出图片1");
      response.write(data, "binary");
      response.end();
    });
  } else if (path === "/images/2.jpg") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "image/jpeg");
    fs.readFile("./images/2.jpg", "binary", function (err, data) {
      if (err) {
        throw err;
      }
      console.log("输出图片2");
      response.write(data, "binary");
      response.end();
    });
  } else if (path === "/hearts") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    fs.readFile("./hearts.html", "utf-8", function (err, data) {
      if (err) {
        throw err;
      }
      console.log("hearts");
      response.write(data);
      response.end();
    });
  } else if (path === "/heart") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/css;charset=utf-8");
    fs.readFile("./heart.css", "utf-8", function (err, data) {
      if (err) {
        throw err;
      }
      console.log("heart.css");
      response.write(data);
      response.end();
    });
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`你输入的路径不存在对应的内容`);
    response.end();
  }

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log("监听 " + port + " 成功\n请用浏览器打开 http://localhost:" + port);
