var mongoose = require("mongoose");
var Schema = mongoose.Schema; //constructor para crear nuestros schemas

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