var express = require("express");
var Imagen = require("./models/imagenes");
var router = express.Router();
var image_finder_middleware = require("./middlewares/findImage");


router.get("/", function(req,res) {
    res.render("app/home");
});

/**REST */

router.all("/imagenes/:id*", image_finder_middleware);

router.get("/imagenes/new",function(req,res) {
    res.render("app/imagenes/new");
});

router.get("/imagenes/:id/edit",function(req,res) {
    res.render("app/imagenes/edit");
});

//Seteamos una url y concatenamos las funciones que identifican las acciones que se pueden realizar sobre el recurso.
router.route("/imagenes/:id")
    .get(function(req, res) {
        res.render("app/imagenes/show");
    })
    .put(function(req, res) {
        res.locals.imagen.title = req.body.titulo;
        res.locals.imagen.save(function(err) {
            if(!err) {
                res.redirect("/app/imagenes");
            } else {
                res.render("app/imagenes/edit");
            }
        });
    })
    .delete(function(req, res) {
        Imagen.findOneAndDelete({_id: req.params.id},function(err) {
            if(!err) {
                res.redirect("/app/imagenes");
            } else {
                res.redirect("/app/imagenes/"+req.params.id);
                console.log(err);
            }
        });
    });

router.route("/imagenes")
    .get(function(req, res) {
        Imagen.find({}, function(err,imagenes) {  
            if(err) {res.redirect("/app");return;}
            res.render("app/imagenes/index", {imagenes: imagenes});
        });
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