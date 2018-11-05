var http = require("http"),
    fs = require("fs");

http.createServer(function(req, res) {
    var html = fs.readFile("./index.html",function(err, html) {
        res.writeHead(200,{"Content-Type":"application/json"})
        res.write(JSON.stringify({
            nombre: "Santiago", 
            username: "santiagoblas"})
        );
        res.write(html);
        res.end();
    })
}).listen(8080)