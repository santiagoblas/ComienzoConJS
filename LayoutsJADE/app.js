
var express = require("express");

//nos retorna el objeto sobre el cual trabajaremos
var app = express();

app.set('view engine', 'jade');

app.get("/", function (req, res) {
    res.render("index");
})

app.get("/login", function (req, res) {
    res.render("login");
})

app.listen(8080);