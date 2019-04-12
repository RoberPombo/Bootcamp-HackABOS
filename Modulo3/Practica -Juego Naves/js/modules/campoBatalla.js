'use strict';

/**
 * @module campoBatalla
 */

/**Import configuracion del ejercito.*/
import { config } from './config.js';
/**Import generador de tipo Ejercito */
import { crearEjercito } from './ejercito.js';
/**Import funcion para crear el HTML del tablero */
import { crearTableroHTML } from './documentHTML.js';

/**
 *Singelton para crear un tipo CampoBatalla.
 *
 * @class CrearCampoBatalla
 */
class CrearCampoBatalla {
    /**
     *Crea una instancia de CrearCampoBatalla.
     * @memberof CrearCampoBatalla
     */
    constructor() {
        this.instance = null;
    };

    /**
     *Crea un tipo CampoBatalla si no hay uno existente.
     * @param {String} tipoPartida PJvsPJ, PJvsNPC o NPCvsNPC.
     * @param {String} nombre Nombre de la batalla.
     * @returns {CampoBatalla} El único campo de Batalla.
     * @memberof CrearCampoBatalla
     */
    crearCB(tipoPartida, nombre) {
        if (this.instance === null) {
            this.instance = new CampoBatalla(tipoPartida, nombre);
            this.instance._generarTablero();
        };
        return this.instance;
    };
};

/**
 *Clase CampoBatalla. Se encarga del tablero de juego.
 *
 * @class CampoBatalla
 */
class CampoBatalla {
    /**
     *Crea una instancia de CampoBatalla.
     * @param {String} tipoPartida PJvsPJ, PJvsNPC o NPCvsNPC.
     * @param {String} nombre Nombre de la batalla.
     * @memberof CampoBatalla
     */
    constructor(tipoPartida, nombre) {
        /**@param {String} tipoPartida PJvsPJ, PJvsNPC o NPCvsNPC.*/
        this.tipoPartida = tipoPartida;
        /**@param {String} nombre Nombre de la batalla.*/
        this.nombre = nombre;
        /**@param {Number} tamanoX Número de filas del tablero*/
        this.tamanoX = config.tamanoCB.tamX;
        /**@param {Number} tamanoY Número de columnas del tablero*/
        this.tamanoY = config.tamanoCB.tamY;
        /**@param {Object[]} tablero Celdas del tablero.*/
        this.tablero = [];
        /**@param {Ejercito} ejercitoVerde Ejercito verde y sus naves vivas.*/
        this.ejercitoVerde = null;
        /**@param {Ejercito} ejerVerdeMuertas Naves muertas del ejercito Verde.*/
        this.ejerVerdeMuertas = [];
        /**@param {Ejercito} ejercitoRojo Ejercito rojo y sus naves vivas.*/
        this.ejercitoRojo = null;
        /**@param {Nave[]} ejerRojoMuertas Naves muertas del ejercito Rojo.*/
        this.ejerRojoMuertas = [];
        /**@param {String[]} infoCombate Array con todas las rondas del combate.*/
        this.infoCombate = [];
        /**@param {String[]} infoRonda Array con todos los turnos del combate.*/
        this.infoRonda = [];
    };

    /**
     *Actualiza el estado de las celdas del tablero. Eliminando las naves muertas.
     * @memberof CampoBatalla
     */
    actualizarTablero() {
        for (let i = 0; i < this.tamanoX; i++) {
            for (let j = 0; j < this.tamanoY; j++) {
                const celda = this.tablero[i][j];
                if (!celda.nave.nombre || (celda.nave.vida === 0 && celda.nave.turno === true)) {
                    celda.nave = { nombre: null };
                };
            };
        };
    };

    /**
     *Activa la nave seleccionada para moverla o que dispare a otra nave.
     * @param {Object} celdaInit
     * @param {Object} celdaFin
     * @returns {String} Mensaje de lo que sucedió en la activación.
     * @memberof CampoBatalla
     */
    activarNave(celdaInit, celdaFin) {
        const distancia = this.calcularDistancia('total', celdaInit, celdaFin);
        const nave1 = celdaInit.nave;
        const nave2 = celdaFin.nave;
        let mensaje = null;
        if (nave2.jugador && nave1.ejercito !== nave2.ejercito && distancia <= nave1.alcance) {
            nave1.turno = true;
            mensaje = nave1.disparar(nave2);
        } else if (!nave2.nombre && distancia <= nave1.movimiento) {
            nave1.turno = true;
            this.tablero[celdaInit.posX][celdaInit.posY].nave = nave2;
            this.tablero[celdaFin.posX][celdaFin.posY].nave = nave1;
            mensaje = `${nave1.ejercito}: La nave ${nave1.nombre} termina su movimiento.`;
        } else {
            console.log('Error, la nave ni se mueve ni ataca.');
        };

        this.infoRonda.push(mensaje);
        const infoHTML = document.getElementById('infoRonda');
        const parrafo = document.createElement('font');
        if (mensaje.substring(0, 1) === 'V') {
            parrafo.setAttribute('color', 'green');
        } else if (mensaje.substring(0, 1) === 'R') {
            parrafo.setAttribute('color', 'red');
        };
        const small = document.createElement('small');
        small.innerHTML = mensaje;
        parrafo.appendChild(small);
        infoHTML.appendChild(parrafo);
        return mensaje;
    };

    /**
     *Calcula la distancia entre dos celdas. Distancia total(total), distancia de filas(ejeX) o distancia de columnas(ejeY).
     * @param {String} tipoDist Distancia que se quiere calcular: total, ejeX o ejeY.
     * @param {Object} celdaInit Celda inicial.
     * @param {Object} celdaFin Celda fin.
     * @returns {Number} Retorna la distancia solicitada.
     * @memberof CampoBatalla
     */
    calcularDistancia(tipoDist, celdaInit, celdaFin) {
        if (tipoDist === 'total') {
            return Math.abs(celdaInit.posX - celdaFin.posX) + Math.abs(celdaInit.posY - celdaFin.posY)
        };
        if (tipoDist === 'ejeX') {
            return Math.abs(celdaInit.posX - celdaFin.posX)
        };
        if (tipoDist === 'ejeY') {
            return Math.abs(celdaInit.posY - celdaFin.posY)
        };
        console.log('Calcular distancia(CB), el tipoDist enviado es incorrecto');
    };

    /**
     *Comprueba si es el final de la Ronda y reinicia el turno.
     *Devuelve el jugador actual.
     * @param {String} jugInicial Jugador que empezó la batalla.
     * @returns {String} Jugador que tiene que hacer una acción.
     * @memberof CampoBatalla
     */
    comprobarJugadorActual(jugInicial) {
        const jugEjercitoVerde = this.ejercitoVerde.naves.filter(nave => nave.turno === true);
        const jugEjercitoRojo = this.ejercitoRojo.naves.filter(nave => nave.turno === true);

        if (jugEjercitoVerde.length === this.ejercitoVerde.naves.length && jugEjercitoRojo.length === this.ejercitoRojo.naves.length) {
            if (this.infoRonda.length > 0) this.infoCombate.push(this.infoRonda);
            this.infoRonda = [];
            this.infoRonda.push(`RONDA ${this.infoCombate.length+1}:`);
            const infoHTML = document.getElementById('infoRonda');
            infoHTML.innerHTML = `<h3>RONDA ${this.infoCombate.length+1}:</h3>`;
            for (let i = 0; i < this.ejercitoVerde.naves.length; i) {
                if (this.ejercitoVerde.naves[i].vida > 0) {
                    this.ejercitoVerde.naves[i].turno = false;
                    i += 1;
                } else {
                    this.ejercitoVerde.naves[i].estado = 'muerta';
                    this.ejerVerdeMuertas.push(this.ejercitoVerde.naves.splice(i, 1));
                };
            };
            for (let i = 0; i < this.ejercitoRojo.naves.length; i) {
                if (this.ejercitoRojo.naves[i].vida > 0) {
                    this.ejercitoRojo.naves[i].turno = false;
                    i += 1;
                } else {
                    this.ejercitoRojo.naves[i].estado = 'muerta';
                    this.ejerRojoMuertas.push(this.ejercitoRojo.naves.splice(i, 1));
                };
            };
            if (this.ejercitoVerde.naves.length === 0 || this.ejercitoRojo.naves.length === 0) {
                return 'Final';
            };
            return jugInicial;
        };

        if (jugEjercitoVerde.length === this.ejercitoVerde.naves.length) return 'Rojo';
        if (jugEjercitoRojo.length === this.ejercitoRojo.naves.length) return 'Verde';

        if (jugEjercitoVerde.length === jugEjercitoRojo.length) {
            if (jugInicial === 'Verde') return 'Verde';
            return 'Rojo';
        };
        if (jugEjercitoVerde.length < jugEjercitoRojo.length) return 'Verde';
        return 'Rojo';
    };

    /**
     *Crea los dos ejercitos que van a combatir en la batalla.
     *
     * @param {String} jugador PJ o NPC
     * @param {Number} numInt Número de interceptores.
     * @param {Number} numExp Número de exploradores.
     * @param {Number} numAcor Número de acorazados.
     * @memberof CampoBatalla
     */
    _crearEjercitoCB(jugador, numInt, numExp, numAcor) {
        let columInit = null;
        let columFin = null;
        let nombre = '';
        if (!this.ejercitoVerde) {
            columInit = config.tamanoCB.ejercIzq.columInit;
            columFin = config.tamanoCB.ejercIzq.columFin;
            nombre = config.tamanoCB.ejercIzq.nombre;
            this.ejercitoVerde = crearEjercito(jugador, nombre, numInt, numExp, numAcor);
            this._distribuirEjercito(this.ejercitoVerde, columInit, columFin);
        } else if (!this.ejercitoRojo) {
            columInit = config.tamanoCB.ejercDcha.columInit;
            columFin = config.tamanoCB.ejercDcha.columFin;
            nombre = config.tamanoCB.ejercDcha.nombre;
            this.ejercitoRojo = crearEjercito(jugador, nombre, numInt, numExp, numAcor);
            this._distribuirEjercito(this.ejercitoRojo, columInit, columFin);
        } else {
            console.log('Ya hay dos ejercitos añadidos al campo de batalla.');
        };
    };

    /**
     *Genera el campo de batalla(tablero).
     * @memberof CampoBatalla
     */
    _generarTablero() {
        for (let i = 0; i < this.tamanoX; i++) {
            this.tablero.push(new Array());
            for (let j = 0; j < this.tamanoY; j++) {
                this.tablero[i].push({
                    id: `${i}-${j}`,
                    posX: i,
                    posY: j,
                    nave: { nombre: null },
                });
            };
        };
        crearTableroHTML(this);
    };

    /**
     *Distribuye los ejercitos aleatoriamente en sus zonas de inicio.
     * @param {Ejercito} ejercito
     * @param {Number} columInit
     * @param {Number} columFin
     * @memberof CampoBatalla
     */
    _distribuirEjercito(ejercito, columInit, columFin) {
        for (let i = 0; i < ejercito.naves.length; i) {
            const posX = (Math.random() * (this.tamanoX - 1)).toFixed(0);
            const posY = (Math.random() * (columFin - columInit) + columInit).toFixed(0);
            if (!this.tablero[posX][posY].nave.nombre) {
                this.tablero[posX][posY].nave = ejercito.naves[i];
                i += 1;
            };
        };
    };
};

export { CrearCampoBatalla }