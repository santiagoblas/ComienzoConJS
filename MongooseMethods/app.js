
var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var app = express();

app.use("/estatico", express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'jade');

app.get("/", function (req, res) {
    res.render("index");
})

app.get("/signup", function (req, res) {
    User.find(function(err,doc) {
        console.log(doc);
        res.render("signup");
    });
})

app.get("/login", function (req, res) {
    res.render("login");
})

app.post("/users", function(req,res) {
    var user = new User({
        email: req.body.email, 
        password: req.body.password, 
        password_confirmation: req.body.password_confirmation,
        username: req.body.username
    });

    /*
     * Method SAVE ---
     * user.save(callback(
     *      errores,
     *      documentoYaGuardado,
     *      numeroDocAgregados)); 
     * El guardado es asíncrono
     */ 
    /* user.save(function(err) {
        if(err){
            console.log(String(err));
        }
        res.send("Guardamos tus datos");
    }); */

    /**
     * PROMISES (en vez de callbacks)
     * user.save().then(function(usuario));
     */

    user.save().then(function(usuario){
        res.send("Guardamos el usuario exitosamente")
    },function(err){
        if(err){
            console.log(String(err));
            res.send("No pudimos guardar la información");
        }
    });
});

app.post("/sessions", function(req,res) {
    /**
     * Method FIND ---
     * User.find/findOne({query},"fields",callback(err,docs){});
     * 
     * User.findById(_id, callback(err,doc){});
     * 
     * find devuelve array. findOne y findById devuelven un solo objeto/documento.
     */

    User.findOne(
        {
            email: req.body.email, 
            password: req.body.password
        },
        "",
        function(err,docs){
            console.log(docs);
            res.send("holamundo");
        }
    )
});

app.listen(8080);