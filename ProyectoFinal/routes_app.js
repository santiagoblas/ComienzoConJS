var express = require("express");
var Imagen = require("./models/imagenes");
var router = express.Router();


router.get("/", function(req,res) {
    res.render("app/home");
});

/**REST */

router.get("/imagenes/new",function(req,res) {
    res.render("app/imagenes/new");
});

router.get("/imagenes/:id/edit",function(req,res) {

});

//Seteamos una url y concatenamos las funciones que identifican las acciones que se pueden realizar sobre el recurso.
router.route("/imagenes/:id")
    .get(function(req, res) {
        Imagen.findById(req.params.id, function(err,imagen) {
            res.render("app/imagenes/show", {imagen:imagen});
        });
    })
    .put(function(req, res) {

    })
    .delete(function(req, res) {

    });

router.route("/imagenes")
    .get(function(req, res) {

    })
    .post(function(req, res) {
        var data = {
            title: req.body.titulo
        }

        var imagen = new Imagen(data);

        imagen.save(function(err){
            if(!err) {
                res.redirect("/app/imagenes/" + imagen._id);
            } else {
                res.render(err);
            }
        });
    });

module.exports = router;