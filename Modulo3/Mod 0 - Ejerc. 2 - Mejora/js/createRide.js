'use strict'

function createRide() {

    let ride = { id: 0, to: "", from: "", cost: 0, scale: false }

    while (true) {
        ride.from = prompt("Introducca la ciudad de salida del viaje:");
        if (ride.from) { break; };
    };

    while (true) {
        ride.to = prompt("Introducca el destino del viaje:");
        if (ride.to) { break; };
    };

    while (true) {
        ride.cost = Number(prompt("Introducta el coste del viaje"));
        if (ride.cost >= 0) { break; };
    };

    while (true) {
        let auxSca = +prompt("¿El viaje tiene escalas?\n(1 - con escalas. 0 - sin escalas)");
        if (auxSca === 0) {
            ride.scale = false;
            break;
        } else if (auxSca === 1) {
            ride.scale = true;
            break;
        };
        alert('El valor introducido es incorrecto')
    };

    return ride;
};

export { createRide };