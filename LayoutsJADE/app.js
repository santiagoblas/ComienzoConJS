
var express = require("express");
var bodyParser = require("body-parser");
//nos retorna el objeto sobre el cual trabajaremos
var app = express();

//Doy acceso a mi carpeta public añadiendo el prefijo /estatico a la url
app.use("/estatico", express.static("public"));
app.use(bodyParser.json()); //para peticiones application/json
app.use(bodyParser.urlencoded({extended: true /*define con que algoritmo va a hacer el parser la librería. Permite parsear arrays y bla bla*/}));

app.set('view engine', 'jade');

app.get("/", function (req, res) {
    res.render("index");
})

app.get("/login", function (req, res) {
    res.render("login");
})

app.post("/users", function(req,res) {
    console.log("Email: " + req.body.email);
    console.log("Contraseña: " + req.body.password);
    res.send("Recibimos tus datos");
});

app.listen(8080);