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

var posibles_valores = ["M", "F", "X"]

var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Coloca un email válido"]

//Inicializo un schema con esa estructura JSON
var user_schema = new Schema({
    /**VALIDACION MONGOOSE
     * VALID PARA Number
     * min, max, 
     *VALID PARA String
     * maxlength, minlength, match, enum
     * las validaciones de mongoose se hacen sobre el schema.
     * Las validaciones no required no se aplican sobre type undefined.
     */
    name: String,
    username: {type: String, required:true,
            maxlength:[50, "Username muy largo (max: 50)"]},
    password: {type: String, required:true,
            minlength:[8, "Pass muy corto"]},
    age:    {type: Number, min:[5,"La edad no puede ser menor a 5"],
            max:[100,"La edad máxima es 100"]},
    email: {type: String, 
            /**required:true o */ 
            required: "El email es obligatorio",
            match: email_match},
    date_of_birth: Date,
    sex: {type:String,enum:{values: posibles_valores, message: "Opcion no válida"}}
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