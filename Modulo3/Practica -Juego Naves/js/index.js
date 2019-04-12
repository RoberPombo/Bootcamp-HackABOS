'use strict';

// Imports ===============================================================
import { CrearCampoBatalla } from './modules/campoBatalla.js';
import { actualizarEstadoTablero } from './modules/documentHTML.js';
import { pintarCeldasAlcanceMovimiento } from './modules/documentHTML.js';
import { CrearIntArt } from './modules/ia.js';

// Eventos onclick del HTML ==============================================
window.seleccionarCelda = seleccionarCelda;
window.mostrarNave = mostrarNave;
window.ocultarNave = ocultarNave;
window.configurarPartida = configurarPartida;

// Variables globales ====================================================
let seleccion = null;
const jugadorIzq = 'Verde';
const jugadorDcha = 'Rojo';
let jugadorInicial = '';
let jugadorActual = '';
let campoBatalla = null;
let ia = null;
let jugador1 = '';
let jugador2 = '';
let tiempoDelay = 100;

const generadorCB = new CrearCampoBatalla();


/**
 *Inicia una partida con los datos introducidos en el formulario.
 *
 * @return una alerta si los datos introducidos en el formulario son erroneos.
 */
function configurarPartida() {
    const partida = document.getElementsByName('partida')[0].value;
    const nombreCB = document.getElementsByName('campoBatalla')[0].value;
    const numInter = +document.getElementsByName('numInt')[0].value;
    const numExp = +document.getElementsByName('numExp')[0].value;
    const numAcor = +document.getElementsByName('numAco')[0].value;
    tiempoDelay = document.getElementsByName('timeDelay')[0].value;

    let mensaje = null;
    if (!nombreCB) mensaje = 'Es obligatorio contestar todos los campos\n';
    if ((numInter + numExp + numAcor) !== 12) {
        if (mensaje) mensaje += 'El ejercito tiene que estar formado por 12 naves.';
        if (!mensaje) mensaje = 'El ejercito tiene que estar formado por 12 naves.';
    }
    if (mensaje) return alert(mensaje);

    const formulario = document.getElementById('formulario');
    formulario.style.display = 'none';

    const batalla = document.getElementById('batalla');
    const infoRonda = document.getElementById('infoRonda');

    batalla.style.display = 'flex';
    infoRonda.style.display = 'flex';


    if (Math.random() >= 0.5) {
        jugadorInicial = jugadorIzq;
    } else {
        jugadorInicial = jugadorDcha;
    };
    [jugador1, jugador2] = partida.split('vs');

    campoBatalla = generadorCB.crearCB(partida, nombreCB);
    campoBatalla._crearEjercitoCB(jugador1, numInter, numExp, numAcor);
    campoBatalla._crearEjercitoCB(jugador2, numInter, numExp, numAcor);

    jugadorActual = campoBatalla.comprobarJugadorActual(jugadorInicial);

    if (jugador2 === 'NPC') {
        const generadorIA = new CrearIntArt();
        ia = generadorIA.crearIA(campoBatalla);
    };

    comprobarTurno();
};

/**
 *Comprueba si se terminó la partida, si le toca jugar a la máquina y actualiza el tablero de juego.
 */
function comprobarTurno() {
    jugadorActual = campoBatalla.comprobarJugadorActual(jugadorInicial);
    if (jugadorActual !== 'Final') {
        campoBatalla.actualizarTablero();
        actualizarEstadoTablero(campoBatalla, jugadorActual);
        if ((jugadorActual === 'Verde' && jugador1 === 'NPC') || (jugadorActual === 'Rojo' && jugador2 === 'NPC')) {
            hacerDelay(tiempoDelay);
        };
    } else {
        const numRonda = campoBatalla.infoCombate.length;
        const ganador = ((campoBatalla.ejercitoVerde.naves.length === 0) ? ('Rojo') : ('Verde'));
        const color = (ganador === 'Verde') ? '<font color="green">' : '<font color="red">'
        ronda.innerHTML = `<h3>${color}Gana ejercito ${ganador} en ${numRonda} rondas</font></h3>`;
        const infoHTML = document.getElementById('infoRonda');
        infoHTML.innerHTML = `<h3>FINAL DE PARTIDA:</h3>`;
        for (let i = 0; i < campoBatalla.infoCombate.length; i++) {
            for (let j = 0; j < campoBatalla.infoCombate[i].length; j++) {
                let mensaje = campoBatalla.infoCombate[i][j];
                const parrafo = document.createElement('font');
                if (mensaje.substring(0, 1) === 'V') {
                    parrafo.setAttribute('color', 'green');
                } else if (mensaje.substring(0, 3) === 'Roj') {
                    parrafo.setAttribute('color', 'red');
                } else {
                    mensaje = `==================== ${mensaje} ====================`;
                };
                const small = document.createElement('small');
                small.innerHTML = mensaje;
                parrafo.appendChild(small);
                infoHTML.appendChild(parrafo);
            };
        };
    };
};

/**
 *Pequeño delay asyncrono para poder ver los movimientos de las naves cuando la partida es simulada.
 *
 * @param {Number} ms tiempo en milisegundos para que se puedan ver los movimientos cuando la partida es simulada.
 */
function hacerDelay(ms) {
    setTimeout(function() {
        turnoNPC(jugadorActual);
    }, ms);
};

/**
 *Si le toca jugar a la máquina, llama a la I.A. y hace el movimiento.
 *
 * @param {String} jugadorActual Rojo o Verde.
 */
function turnoNPC(jugadorActual) {
    const [celdaInit, celdaFin] = ia.recorrerNavesAliadas(jugadorActual);
    if (campoBatalla.comprobarJugadorActual(jugadorInicial) !== 'Final') {
        const celdaInitHTML = document.getElementById(celdaInit.id);
        celdaInitHTML.value = celdaInit;
        const celdaFinHTML = document.getElementById(celdaFin.id);
        celdaFinHTML.value = celdaFin;
        seleccion = celdaInitHTML;
        seleccionarCelda(celdaFinHTML);
    };
};

/**
 *Ejecuta la acción señalada por el jugador o enviada por la función turnoNPC.
 *
 * @param {Object} celda
 * @returns Undefined si la selección de celdas para la acción es incorrecta.
 */
function seleccionarCelda(celda) {
    if (campoBatalla.ejercitoVerde.length === 0 || campoBatalla.ejercitoRojo.length === 0) return;
    if (celda === seleccion) {
        seleccion.style.backgroundColor = 'transparent';
        seleccion = null;
        return;
    };

    if (!seleccion && jugadorActual !== celda.value.nave.ejercito) return;

    if (!seleccion) {
        celda.style.backgroundColor = 'rgb(204, 204, 204)';
        seleccion = celda;
        return;
    };

    if (celda.value.nave.ejercito === jugadorActual) return;
    if (!seleccion && seleccion.value.nave.turno === true) return;

    if (campoBatalla.activarNave(seleccion.value, celda.value)) {
        seleccion = null
    } else {
        return;
    };

    comprobarTurno();
};

/**
 *Muestra el nombre y algunos stats de la nave al pasarle el ratón por encima.
 *
 * @param {Object} celda
 */
function mostrarNave(celda) {
    let nave = celda.value.nave;
    document.getElementById('ver').innerHTML =
        ` <h4> Nombre: ${ nave.nombre } </h4>
    <p> Vida actual: ${ nave.vida } - Daño: ${ nave.dano } </p>
    <p> Movimiento: ${ nave.movimiento } - Alcance: ${ nave.alcance } </p>`;
    document.getElementById('ver').style.opacity = 1;
    pintarCeldasAlcanceMovimiento('mostrar', campoBatalla, celda);
};

/**
 *Oculta el nombre y los stats de la nave al retirar el mouse de encima de la nave.
 *
 * @param {Object} celda
 */
function ocultarNave(celda) {
    document.getElementById('ver').style.opacity = 0;
    pintarCeldasAlcanceMovimiento('ocultar', campoBatalla, celda);
};