'use strict';

/**
 * @module ejercito
 */

/**Import configuracion del ejercito.*/
import { config } from './config.js';
/**Import generador de tipo Nave.*/
import { crearNave } from './nave.js';

/**
 *Crear un tipo ejercito y lo llena de tipos Nave.
 *
 * @export
 * @param {String} jugador PJ o NPC.
 * @param {String} ejercito Verde o Rojo.
 * @param {Number} numInt Número de interceptores del ejercito.
 * @param {Number} numExp Número de exploradores del ejercito.
 * @param {Number} numAcor Número de acorazados del ejercito.
 */
function crearEjercito(jugador, ejercito, numInt, numExp, numAcor) {
    if ((numInt + numExp + numAcor) === config.tamanoEjercito) {
        const ejercNuevo = new Ejercito(jugador, ejercito);
        ejercNuevo._anadirNaves(numInt, numExp, numAcor);
        return ejercNuevo;
    } else {
        cosole.log('Número incorrecto de naves al crear el ejercito');
    };
};

/**
 *Clase Ejercito.
 *
 * @class Ejercito
 */
class Ejercito {
    /**
     *Crea una instancia de Ejercito.
     * @param {String} jugador PJ o NPC.
     * @param {String} ejercito Verdo o Rojo.
     * @memberof Ejercito
     */
    constructor(jugador, ejercito) {
        /**@param {String} tamano Número de naves que tiene el ejercito.*/
        this.tamano = config.tamanoEjercito;

        /**@param {String} ejercito El ejercito que es, Rojo o Verde.*/
        this.ejercito = ejercito;

        /**@param {String} jugador Tipo de jugador, PJ o NPC.*/
        this.jugador = jugador;

        /**@param {Nave[]} naves Array con las naves que componene el ejercito.*/
        this.naves = [];

        /**@param {Boolean} derrotado Si el ejercito está derrotado(true) o aún luchando(false).*/
        this.derrotado = false;
    };

    /**
     *Comprueba si el ejercito perdio la batalla
     * @returns {Boolean} true si destruido, false si aún vivo.
     * @memberof Ejercito
     */
    comprobarEjercitoSiDestruido() {
        this.naves.forEach(nave => {
            if (!nave.comprobarSiDestruida()) return this.derrotado;
        });
        this.derrotado = true;
        return this.derrotado;
    };

    /**
     *Retorna el estado de cada nave del ejercito.
     * @returns {String[]} Array de string para mostrar por pantalla.
     * @memberof Ejercito
     */
    informeEjercito() {
        const informe = this.naves.map(nave => {
            if (nave.vida <= 0) {
                return `Nave ${nave.nombre} está destruida.`
            } else {
                return `Nave ${nave.nombre} tiene ${nave.vida} puntos de vida.`
            };
        });
        return informe;
    };

    /**
     *Desordena el array de Naves cuando el jugador es la máquina. Para que no mueva siempre en el mismo orden.
     * @memberof Ejercito
     */
    desordenarEjercitoNPC() {
        if (this.jugador === 'NPC') {
            this.naves = this.naves.sort((a, b) => (Math.random() - 0.5))
        };
    };

    /**
     *Para rellenar el ejercito de naves.
     * @param {Number} numInter Número de Interceptores.
     * @param {Number} numExp Número de Exploradores.
     * @param {Number} numExp Número de Acorazados.
     * @memberof Ejercito
     */
    _anadirNaves(numInter, numExp, numAcor) {
        this._crearNuevasNaves('Interceptor', numInter);
        this._crearNuevasNaves('Explorador', numExp);
        this._crearNuevasNaves('Acorazado', numAcor);
        this.desordenarEjercitoNPC();
    };

    /**
     *Crea una nueva nave y la añade al array de naves.
     * @param {String} tipo Interceptor, Explorador o Acorazado.
     * @param {Number} totalNaves Número de naves del mismo tipo.
     * @memberof Ejercito
     */
    _crearNuevasNaves(tipo, totalNaves) {
        for (let i = 0; i < totalNaves; i++) {
            const nave = crearNave(this.jugador, this.ejercito, tipo, i + 1);
            this.naves.push(nave);
        };
    };
};

export { crearEjercito };