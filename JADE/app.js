var express = require("express");

//nos retorna el objeto sobre el cual trabajaremos
var app = express();

app.set('view engine', 'jade');

app.get("/", function (req, res) {
    res.render("index",{hola: "Hola Santiiii"});
})

app.listen(8080);