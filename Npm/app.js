var express = require("express");

//nos retorna el objeto sobre el cual trabajaremos
var app = express();

app.get("/", function (req, res) {
    res.send("Hola Santi");
})

app.listen(8080);