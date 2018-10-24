var http = require("http"),
    fs = require("fs");

http.createServer(function(req, res) {

    if(req.url.indexOf("favicon.ico") > 0) { return; }

    fs.readFile("./index.html",function(err, html) {
        var html_str = html.toString();
        var variables = html_str.match( /[^\{\}]+(?=\})/g );
        var arreglo_parametros = [], parametros = [];
        var nombre = "Santiago";

        if(req.url.indexOf("?") > 0) {
            // /?nombre=Santiago&otro=Otro =split("?")=> ['/','nombre=Santiago&otro=Otro'] =[1]=> 'nombre=Santiago&otro=Otro'
            var url_data = req.url.split("?")[1];

            // 'nombre=Santiago&otro=Otro' =split("&")=> ["nombre=Santiago","otro=Otro"]
            arreglo_parametros = url_data.split("&");
        }

        for(var i = arreglo_parametros.length - 1; i >= 0; i--) {
            var parametro = arreglo_parametros[i];
            // "nombre=Santiago"
            var param_data = parametro.split("=");
            // ["nombre", "Santiago"];
            parametros[param_data[0]] = param_data[1];
            // {"nombre": "Santiago";}
        }

        for (let index = 0; index < variables.length; index++) {
            var value = parametros[variables[index]];

            html_str = html_str.replace("{" + variables[index] + "}", value);
        }

        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(html_str);
        res.end();
    });
}).listen(8080);