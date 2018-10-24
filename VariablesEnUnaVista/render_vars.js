var http = require("http"),
    fs = require("fs");

http.createServer(function(req, res) {
    var html = fs.readFile("./index.html",function(err, html) {
        var html_str = html.toString();
        //Expresion regular que busca en el HTML donde haya {x}
        var variables = html_str.match( /[^\{\}]+(?=\})/g );

        var nombre = "Santiago";

        for (let index = 0; index < variables.length; index++) {
            //Lo ejecutamos como código de JS para obtener el valor de dicha variable
            var value = eval(variables[index]);

            //Reemplazar el contenido con llaves {x} por su valor correspondiente
            html_str = html_str.replace("{" + variables[index] + "}", value);
        }

        //Escribimos el contenido
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(html_str);
        res.end();
    })
}).listen(8080)