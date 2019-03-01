var rides = [
    { id: 00, to: "A Coruña", from: "Santiago", cost: 60, scale: false },
    { id: 01, to: "New York", from: "New Yersey", cost: 120, scale: false },
    { id: 02, to: "Valencia", from: "Madrid", cost: 300, scale: true },
    { id: 03, to: "O Porto", from: "Guimaraes", cost: 50, scale: false },
    { id: 04, to: "Roma", from: "Milan", cost: 300, scale: false },
    { id: 05, to: "London", from: "Manchester", cost: 200, scale: false }
];
let auxRides = [];
let rideBuy = '';
let name = "";
let isAdmin = "";

bienvenida()


/* ------------- FUNCION PARA PREGUNTAR EL NOMBRE Y QUE TIPO DE USUARIO ES ------- */
function bienvenida() {
    name = prompt("\nHola. ¿Cuál es su nombre?");

    while (isAdmin === "") {
        if (name === "" || name === null) {
            isAdmin = prompt("\nBienvenido al sistema de compra de billetes de avión.\n\nEs usted:\n1 - Usuario\n2 - Admin\n\n(Por favor, indiquenos el número)")
        } else {
            isAdmin = prompt("\nHola " + name + ".\n\nBienvenido al sistema de compra de billetes de avión.\n\nEs usted:\n1 - Usuario\n2 - Admin\n\n(Por favor, indiquenos el número)");
        }
        if (isAdmin == 1) {
            document.getElementById("admin").style.display = "none";
            document.getElementById("user").style.display = "block";
        } else if (isAdmin == 2) {
            document.getElementById("admin").style.display = "block";
            document.getElementById("user").style.display = "none";
        } else {
            isAdmin = "";
            alert("\nA introducido un valor incorrecto. Los valores admitidos son: 1 o 2.\n\nPor favor, vuelva a intentarlo.")
        }
    }
}


/* ------------- FUNCION PARA MOSTRAR LOS VUELOS ------------------------------- */
function mostrarVuelos(mostrar, noEscalas) {

    let auxNum = 0;
    let auxTotal = 0;
    let txtVuelos = "";
    let costeMed = 0;

    if (mostrar == "todos") {
        auxNum = 0;
    } else if (mostrar == "ultimos") {
        auxNum = rides.length - 5;
    }

    auxRides = [];

    for (let i = auxNum; i < rides.length; i++) {
        let vuelo = "";

        if (rides[i].scale && noEscalas == "todo") {
            vuelo = " - ID: " + rides[i].id + ". Vuelo de " + rides[i].from + " a " + rides[i].to + ". Coste: " + rides[i].cost + "€. Con escalas.\n\n";
            auxTotal += 1
            costeMed = costeMed + rides[i].cost;
            txtVuelos = txtVuelos + vuelo;
            auxRides.push(rides[i]);
        } else if (!rides[i].scale) {
            vuelo = " - ID: " + rides[i].id + ". Vuelo de " + rides[i].from + " a " + rides[i].to + ". Coste: " + rides[i].cost + "€.\n\n";
            auxTotal += 1
            costeMed = costeMed + rides[i].cost;
            txtVuelos = txtVuelos + vuelo;
            auxRides.push(rides[i]);
        };

    }
    document.getElementById("listaVuelos").innerText = txtVuelos;

    if (costeMed != 0) {
        costeMed = (costeMed / auxTotal).toFixed(2)
    } else {
        costeMed = 0;
    };
    document.getElementById("costeMedio").innerText = "Coste medio: " + costeMed + "€.";
}


/* ------------- FUNCION PARA COMPRAR UN VUELO --------------------------------- */
function comprar() {
    let vueloComprado;
    let id = document.getElementById("idVuelo").value;

    auxRides.find(ride => {
        if (ride.id == id) {
            vueloComprado = ride;
        }
    });

    if (vueloComprado) {
        let textoCompra = "\nGracias por comprar el vuelo:\n\n" + vueloComprado.from + "-" + vueloComprado.to + "\nDe " + vueloComprado.cost + "€."
        alert(textoCompra);
        finishBuy();
    } else {
        alert("El vuelo con ID " + id + " no existe en los vuelos mostrados.\nPor favor, vuelva a intentar poner un ID correcto.")
    }

    document.getElementById("idVuelo").value = null;
}


/* ------------- FUNCION PARA DESPEDIRSE DESPUES DE COMPRAR UN VUELO ------------- */
function finishBuy() {
    if (name === "" || name === null) {
        alert("Gracias por su compra.\n\n Disfrute de su vuelo y esperamos que nos visite pronto.")
    } else {
        alert(name + " , gracias por su compra.\n\n Disfrute de su vuelo y esperamos que nos visite pronto.")
    }
}


/* ------------- FUNCION PARA BUSCAR VUELOS POR PRECIO -------------------------- */
function buscar() {

    let auxNum = 0;
    let auxTotal = 0;
    let txtVuelos = "";
    let costeMed = 0;

    auxRides = [];

    let comprobar = document.getElementById("tipoBusqueda").value;
    let costeComp = document.getElementById("costeVuelo").value;

    for (let i = 0; i < rides.length; i++) {
        let vuelo = "";

        if (comprobar === "mas" && costeComp < rides[i].cost) {
            vuelo = " - ID: " + rides[i].id + ". Vuelo de " + rides[i].from + " a " + rides[i].to + ". Coste: " + rides[i].cost + "€. Con escalas.\n\n";
            auxTotal += 1
            costeMed = costeMed + rides[i].cost;
            txtVuelos = txtVuelos + vuelo;
            auxRides.push(rides[i]);
        } else if (comprobar === "igual" && costeComp == rides[i].cost) {
            vuelo = " - ID: " + rides[i].id + ". Vuelo de " + rides[i].from + " a " + rides[i].to + ". Coste: " + rides[i].cost + "€.\n\n";
            auxTotal += 1
            costeMed = costeMed + rides[i].cost;
            txtVuelos = txtVuelos + vuelo;
            auxRides.push(rides[i]);
        } else if (comprobar === "menos" && costeComp > rides[i].cost) {
            vuelo = " - ID: " + rides[i].id + ". Vuelo de " + rides[i].from + " a " + rides[i].to + ". Coste: " + rides[i].cost + "€.\n\n";
            auxTotal += 1
            costeMed = costeMed + rides[i].cost;
            txtVuelos = txtVuelos + vuelo;
            auxRides.push(rides[i]);
        };

    }
    document.getElementById("listaVuelos").innerText = txtVuelos;

    if (costeMed != 0) {
        costeMed = (costeMed / auxTotal).toFixed(2)
    } else {
        costeMed = 0;
    };
    document.getElementById("costeMedio").innerText = "Coste medio: " + costeMed + "€.";
}


/* ------------- FUNCION PARA CREAR UN NUEVO VUELO ------------------------------- */
function addVuelo() {
    let aux = false;
    let vuelo = { id: 0, to: "", from: "", cost: 0, scale: false }
    while (!aux) {
        vuelo.from = prompt("Introducca la ciudad de salida del vuelo:");
        if (vuelo.from != "") { aux = true; };
    }
    aux = false;
    while (!aux) {
        vuelo.to = prompt("Introducca el destino del vuelo:");
        if (vuelo.to != "") { aux = true };
    }
    aux = false;
    while (!aux) {
        vuelo.cost = Number(prompt("Introducta el coste del vuelo"));
        if (vuelo.cost >= 0) { aux = true };
    }
    aux = false;
    while (!aux) {
        auxEsc = prompt("¿El vuelo tiene escalas?\n(1 - con escalas. Vacio - sin escalas)");
        if (auxEsc == 0) {
            vuelo.scale = false;
            aux = true;
        } else if (auxEsc == 1) {
            vuelo.scale = true;
            aux = true;
        };
    }
    ultVuelo = rides.length - 1
    vuelo.id = rides[ultVuelo].id + 1

    rides.push(vuelo);
    mostrarVuelos("todos", "todo");
}

/* ------------- FUNCION PARA ELIMINAR UN VUELO EXISTENTE ------------------------ */
function deleteVuelo() {
    let id = prompt("¿El vuelo a borrar que ID tiene?")
    let i = 0;
    for (i; i < rides.length; i++) {
        if (rides[i].id == id) { break };
    }
    rides.splice(i, i);
    alert("Vuelo eliminado");
    mostrarVuelos("todos", "todo");
}