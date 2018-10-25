var http = require("http"),
    fs = require("fs"),
    parser = require("./params_parser.js"),
    renderer = require("./render_view.js");

var parse   = parser.parse;
var render  = renderer.render;

http.createServer(function(req, res) {

    if(req.url.indexOf("favicon.ico") > 0) { return; }

    fs.readFile("./index.html",function(err, html) {
        var html_str = html.toString();

        var parametros = parse(req);

        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(render(html_str, parametros));
        res.end();
    });
}).listen(8080);