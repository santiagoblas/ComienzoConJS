
var express = require("express");
var bodyParser = require("body-parser");
//nos retorna el objeto sobre el cual trabajaremos
var app = express();
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos", { useNewUrlParser: true });

//Colecciones => tablas
//Documetos => filas

//Creo la estructura del objeto en JSON
var userSchemaJSON = {
    email:String,
    password:String
};

//Inicializo un modelo para conectarme, con ese schema
var User = mongoose.model("User", user_schema);

//Doy acceso a mi carpeta public añadiendo el prefijo /estatico a la url
app.use("/estatico", express.static("public"));

app.use(bodyParser.json()); //para peticiones application/json
app.use(bodyParser.urlencoded({extended: true /*define con que algoritmo va a hacer el parser la librería. Permite parsear arrays y bla bla*/}));

app.set('view engine', 'jade');

app.get("/", function (req, res) {
    res.render("index");
})

app.get("/login", function (req, res) {
    User.find(function(err,doc) {
        console.log(doc);
        res.render("login");
    });
})

app.post("/users", function(req,res) {
    var user = new User({email: req.body.email, password: req.body.password});

    user.save(function() {
        res.send("Guardamos tus datos");
    });
});

app.listen(8080);