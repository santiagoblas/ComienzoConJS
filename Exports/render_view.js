function render(html, parametros) {
    var variables = html.match( /[^\{\}]+(?=\})/g );
    var nombre = "";

    for (let index = 0; index < variables.length; index++) {
        var value = parametros[variables[index]];

        html = html.replace("{" + variables[index] + "}", value);
    }

    return html
}

module.exports.render = render;