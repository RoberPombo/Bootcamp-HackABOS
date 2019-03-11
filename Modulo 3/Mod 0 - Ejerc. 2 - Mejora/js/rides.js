'use strict'

// Imports -------------------------------------------------------------------------
import { filterRides } from './filterRides.js';
import { costMed } from './costMed.js';
import { welcome, authUser } from './auth.js';
import { buildHTML } from './buildHTML.js';
import { createRide } from './createRide.js';

// Variables -----------------------------------------------------------------------
let initRides = [
    { id: 0, to: 'A Coruña', from: 'Santiago', cost: 60, scale: false },
    { id: 1, to: 'New York', from: 'New Yersey', cost: 120, scale: false },
    { id: 2, to: 'Valencia', from: 'Madrid', cost: 300, scale: true },
    { id: 3, to: 'O Porto', from: 'Guimaraes', cost: 50, scale: false },
    { id: 4, to: 'Roma', from: 'Milan', cost: 300, scale: false },
    { id: 5, to: 'London', from: 'Manchester', cost: 200, scale: false }
];
let rides = initRides;
let filteredRides = [];
let costMedNum = 0;
let userType = '';

// Eventos onclick del HTML --------------------------------------------------------
window.showRides = showRides;
window.auth = auth;
window.buyRide = buyRide;
window.newRide = newRide;
window.deleteRide = deleteRide;
window.deleteStorage = deleteStorage;

// App -----------------------------------------------------------------------------
if (localStorage.getItem('rides')) {
    rides = JSON.parse(localStorage.getItem('rides'));
} else {
    saveRides();
};
welcome();
showRides('all', 0);


function showRides(name, value) {
    filteredRides = filterRides(rides, name, value);
    costMedNum = costMed(filteredRides).toFixed(2);
    buildHTML(filteredRides, costMedNum, userType);
};

function auth() {
    userType = authUser();
    filteredRides = filterRides(rides, 'all', 0);
    costMedNum = costMed(filteredRides).toFixed(2);
    buildHTML(filteredRides, costMedNum, userType);
};

function buyRide(id) {
    if (userType === 'isAdmin' || userType === 'isUser') {
        let rideBuy = rides.find(ride => ride.id === id);
        alert(`Ha comprado el viaje:\n\n${rideBuy.from}-${rideBuy.to}\n\nCoste de: ${rideBuy.cost}€`);
    } else {
        alert('Tiene que loguearse para poder comprar un viaje.\n(El login está arriba a la derecha)');
    };
};

function newRide() {
    if (rides.length >= 8) {
        alert('No se pueden crear más de 8 viajes. Elimine alguno para poder crear más')
    } else {
        let auxRide = createRide();
        let maxId = 0;
        for (let ride of rides) {
            if (ride.id > maxId) { maxId = ride.id };
        };
        auxRide.id = maxId + 1;
        rides.push(auxRide);
        alert('El viaje ha sido creado');
        showRides('all', 0);
        saveRides();
    };
};

function deleteRide(id) {
    rides = rides.filter(ride => ride.id != id);
    alert('El viaje ha sido borrado');
    showRides('all', 0);
    saveRides();
};

function saveRides() {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem('rides', JSON.stringify(rides));
    };
};

function deleteStorage() {
    localStorage.removeItem('rides');
    rides = initRides;
    showRides('all', 0);
};