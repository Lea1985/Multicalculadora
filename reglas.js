var resOP;

var parametro = new Array();

var estadoCalFec = 0;

var visor = document.getElementById("lineaPantalla");

var limpiaPantalla = document.getElementById("limPantalla");

var volver = document.getElementById("volverCalcu");

var fecDesde = document.getElementById("desde");

var obtenerFec = document.querySelector(".obtenerFec");

var limpFec = document.getElementById("limpiarFechas");


limpFec.addEventListener("click", limpiarFechas);

volver.addEventListener("click", cambiarCalcu);

visor.textContent = 'Comencemos!!!';

limpiaPantalla.addEventListener("click", limpiarPantalla);

obtenerFec.addEventListener("click", calcularFecha);



function refrescarVisor(resultado) {
    visor.textContent = resultado;
}

function limpiarPantalla() {
    var visor = document.getElementById("lineaPantalla");
    visor.textContent = 'Comencemos!!!';
    parametro = new Array();

}

function cambiarCalcu() {

    if (estadoCalFec == 0) {
        document.getElementById("calFechas").style.display = "inline-block";
        document.getElementById("calculadora").style.display = "none";
        estadoCalFec = ++estadoCalFec;
    } else {
        document.getElementById("calFechas").style.display = "none";
        document.getElementById("calculadora").style.display = "inline-block";
        estadoCalFec = --estadoCalFec;
    }

}

function verifDoc(aux) {

    var posicines = new Array;

    for (let i = 0; i <= parametro.length - 1; ++i) {
        if (parametro[i] == "/" || parametro[i] == "*" || parametro[i] == "-" || parametro[i] == "+") { posicines.push(i) }
    }

    if (parametro.length == 0) {
        parametro.push('0');
        parametro.push('.');

    } else {

        if (posicines.length == 0) {

            if (!parametro.includes(".")) {
                parametro.push(aux);
            }

        } else {

            let p = parametro.slice(posicines[posicines.length - 1] + 1);

            console.log(p.length);
            if (p.length == 0) {
                parametro.push("0");
                parametro.push(aux);
            } else { if (!p.includes(".")) { parametro.push(aux); } }

        }


    }


}

function myFunction(event) {

    var aux = event.target.getAttribute("value");
    /* console.log(aux);*/

    if (aux == "spock") {
        cambiarCalcu();

    }

    if (parametro.length < 15) {




        if (aux == '.') {

            verifDoc(aux);

        }


        if (aux <= 9) {
            if (parametro[0] == '0' && parametro.length == '1') {

            } else { parametro.push(aux); }
        }

        if (aux == 'borrar') {
            parametro.pop();
        }

        if (aux == 'porcentaje') {
            let x = String(parametro).replaceAll(',', '');
            x = x / 100;
            parametro = [x];
            console.log(String(parametro).replaceAll(',', ''));
        }

        if (aux == "/") {
            if (parametro[parametro.length - 1] == aux || parametro[parametro.length - 1] == "+" || parametro[parametro.length - 1] == "-" || parametro[parametro.length - 1] == "*" || parametro[parametro.length - 1] == ".") {

            } else {
                if (parametro.length != 0) { parametro.push(aux); }
            }
        }

        if (aux == "*") {
            if (parametro[parametro.length - 1] == aux || parametro[parametro.length - 1] == "+" || parametro[parametro.length - 1] == "-" || parametro[parametro.length - 1] == "/" || parametro[parametro.length - 1] == ".") {

            } else {
                if (parametro.length != 0) { parametro.push(aux); }
            }
        }

        if (aux == "-") {
            if (parametro[parametro.length - 1] == aux || parametro[parametro.length - 1] == "+" || parametro[parametro.length - 1] == "*" || parametro[parametro.length - 1] == "/" || parametro[parametro.length - 1] == ".") {} else {
                parametro.push(aux);
            }
        }

        if (aux == "+") {
            if (parametro[parametro.length - 1] == aux || parametro[parametro.length - 1] == "-" || parametro[parametro.length - 1] == "*" || parametro[parametro.length - 1] == "/" || parametro[parametro.length - 1] == ".") {

            } else {
                if (parametro.length != 0) { parametro.push(aux); }
            }

        }


        if (aux == "=") {
            if (parametro[0] == "-") { parametro.unshift("0") }
            var subBloque = new Array;
            if (parametro[parametro.length - 1] == ("+") || parametro[parametro.length - 1] == ("-") || parametro[parametro.length - 1] == ("*") || parametro[parametro.length - 1] == ("/") || parametro[parametro.length - 1] == ".") {
                alert("El ultimo elemento ingresedado debe ser un numero y no un operador");
            } else {
                var posicion = -1;
                parametro.forEach(function(element) {
                    posicion = ++posicion;
                    if (element == "+" || element == "-" || element == "*" || element == "/") {
                        subBloque.push(posicion);
                    }
                })

                //console.log(subBloque);
                subBloque.push(parametro.length + 1);
                // console.log(subBloque);
                var bloque = new Array;
                var cadNumero = new Array;
                //console.log(subBloque);
                posicion = 0;
                for (var i = 0; i < parametro.length; ++i) {

                    if (i < subBloque[posicion]) {
                        cadNumero.push(parametro[i]);
                    } else {
                        bloque.push(parseFloat(String(cadNumero).replaceAll(',', '')));
                        cadNumero = [];
                        posicion = ++posicion;
                    }
                }

                bloque.push(parseFloat(String(cadNumero).replaceAll(',', '')));
                console.log(bloque);
                console.log(subBloque);
                console.log(parametro);

                // bloque --> los numeros de la operacion
                //subBloque --> la posicion de los operadores en la cadena de paramatro incluido la posicion del igual 
                // parametro--> la cadena completa

                var neu = 0;
                resOP = bloque[neu];
                subBloque.forEach(function(element) {
                    neu = ++neu;
                    if (parametro[element] == "+") {
                        resOP = resOP + bloque[neu];
                    }
                    if (parametro[element] == "-") {
                        resOP = resOP - bloque[neu];
                    }

                    if (parametro[element] == '/') {
                        resOP = (resOP / bloque[neu]);
                    }

                    if (parametro[element] == "*") {
                        resOP = resOP * bloque[neu];
                    }
                })
                parametro = [];
                parametro.push(String(resOP));
                console.log(resOP);
            }
        }

    }

    console.log((String(parametro)).replaceAll(',', ''));

    refrescarVisor((String(parametro)).replaceAll(',', ''));

}

function calcularFecha() {

    const anio = 365;

    const mes = 30;

    const msDia = 86400000;


    let desde = document.getElementById("num").value;
    let hasta = document.getElementById("num1").value;

    desde = new Date(desde);
    hasta = new Date(hasta);

    let tiempoTrasnc = Date.parse(hasta) - Date.parse(desde);

    let dias = tiempoTrasnc / msDia;

    dias = Math.trunc(dias);

    let anios = dias / anio;

    dias = dias - Math.trunc(anios) * 365;

    let meses = dias / mes;

    dias = dias - Math.trunc(meses) * 30;

    let x = document.getElementById("anios");

    let y = document.getElementById("meses");

    let z = document.getElementById("dias");

    x.innerHTML = Math.trunc(anios) + " Años ";

    y.innerHTML = Math.trunc(meses) + " Meses ";

    z.innerHTML = Math.trunc(dias) + " Días ";

}

function limpiarFechas() {
    document.getElementById("num").value = "";
    document.getElementById("num1").value = "";
    document.getElementById("anios").innerHTML = "Años";
    document.getElementById("meses").innerHTML = "Meses";
    document.getElementById("dias").innerHTML = "Dias";
}