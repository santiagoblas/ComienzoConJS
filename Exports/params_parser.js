function parse(req) {
    var arreglo_parametros = [], parametros = [];

    if(req.url.indexOf("?") > 0) {
        // /?nombre=Santiago&otro=Otro =split("?")=> ['/','nombre=Santiago&otro=Otro'] =[1]=> 'nombre=Santiago&otro=Otro'
        var url_data = req.url.split("?")[1];

        // 'nombre=Santiago&otro=Otro' =split("&")=> ["nombre=Santiago","otro=Otro"]
        arreglo_parametros = url_data.split("&");
    }

    for(var i = arreglo_parametros.length - 1; i >= 0; i--) {
        var parametro = arreglo_parametros[i];
        // "nombre=Santiago"
        var param_data = parametro.split("=");
        // ["nombre", "Santiago"];
        parametros[param_data[0]] = param_data[1];
        // {"nombre": "Santiago";}
    }

    return parametros;
}

module.exports.parse = parse;