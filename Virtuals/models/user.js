var mongoose = require("mongoose");
var Schema = mongoose.Schema; //constructor para crear nuestros schemas
mongoose.connect("mongodb://localhost/fotos", { useNewUrlParser: true });

/*
TIPOS DE DATOS QUE PODEMOS USAR CON MONGOOSE

String
Number
Date
Buffer
Boolean
Mixed
Objectid
Array
*/

//Inicializo un schema con esa estructura JSON
var user_schema = new Schema({
    name: String,
    username: String,
    password: String,
    age: Number,
    email: String,
    date_of_birth: Date
});

user_schema.virtual("password_confirmation")
.get(function() {
    return this.p_c;
})
.set(function(password) {
    this.p_c = password;
});

//Inicializo el modelo con el que me voy a conectar
var User = mongoose.model("User", user_schema);

module.exports.User = User;