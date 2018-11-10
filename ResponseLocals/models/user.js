var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/fotos", { useNewUrlParser: true });

var posibles_valores = ["M", "F", "X"]

var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Coloca un email válido"];

var validation_password = {
                                validator: function(pass){
                                        return this.password_confirmation == pass
                                },
                                message: "Las password son disntintas"
                        };
var user_schema = new Schema({
    
    name: String,
    username: {
            type: String, 
            required:true,
            maxlength:[50, "Usuario muy largo (max: 50)"]
        },
    password: {
            type: String, 
            required:true,
            minlength:[8, "Pass muy corto"],
            validate: validation_password
        },
    age:    {
            type: Number, 
            min:[5,"La edad no puede ser menor a 5"],
            max:[100,"La edad máxima es 100"]
        },
    email: {
            type: String, 
            required: "El email es obligatorio",
            match: email_match
        },
    date_of_birth: Date,
    sex: {
            type:String,
            enum:{
                    values: posibles_valores, message: "Opcion no válida"
                }
        }
});

user_schema.virtual("password_confirmation")
.get(function() {
    return this.p_c;
})
.set(function(password) {
    this.p_c = password;
});

var User = mongoose.model("User", user_schema);

module.exports.User = User;