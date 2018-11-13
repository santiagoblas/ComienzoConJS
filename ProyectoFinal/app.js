
var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var cookieSession = require("cookie-session");
var router_app = require("./routes_app");
var session_middleware = require("./middlewares/session");
var methodOverride = require("method-override");
var formidable = require("express-formidable");

var app = express();

app.use("/public", express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));
app.use(cookieSession({
    name: "sesion",
    keys: ["llave-1", "llave-2"]
}));
app.use(formidable({
    keepExtensions: true
}));

app.set('view engine', 'jade');

app.get("/", function (req, res) {
    res.render("index");
})

app.get("/signup", function (req, res) {
    User.find(function(err,doc) {
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

    user.save().then(function(usuario){
        res.send("Guardamos el usuario exitosamente")
    },function(err){
        if(err){
            res.send("No pudimos guardar la información");
        }
    });
});

app.post("/sessions", function(req,res) {
    User.findOne(
        {
            email: req.body.email, 
            password: req.body.password
        },
        "",
        function(err,user){
            req.session.user_id = user._id;
            res.redirect("/app");
        }
    )
});

var prefix_app = "app";
app.use("/" + prefix_app, session_middleware);
app.use("/" + prefix_app, router_app);

app.listen(8080);