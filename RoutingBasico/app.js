var express = require("express");

//nos retorna el objeto sobre el cual trabajaremos
var app = express();

app.set('view engine', 'jade');

//Verbos Http => GET / POST / PUT / PATCH / OPTIONS / HEADERS / DELETE. Express por default tiene solo Get y Post.

app.get("/", function (req, res) {
    res.render("index",{hola: "Hola Santi"});
});

app.get("/algo", function(req,res) {
    res.render("form")
});

// :nombreVariable se puede acceder a esa información con el identificador proporcionado
app.get("/:nombre", function(req,res) {
    console.log(req.params.nombre);
    res.render("form", {nombre: req.params.nombre})
});

app.post("/", function(req,res) {
    res.render("form")
});

app.listen(8080);