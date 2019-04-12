'use strict';

/**
 * @module naves
 */

/**Import configuracion de las naves.*/
import { config } from './config.js';

/**
 *Crea un tipo Nave.
 *
 * @export {crearNave} 
 * @param {String} jugador PJ o NPC.
 * @param {String} ejercito Verde o Rojo.
 * @param {String} tipo Interceptor, Explorador o Acorazado.
 * @param {Number} numero Diferenciar naves del mismo tipo.
 * @returns {Nave} tipo Nave.
 */
function crearNave(jugador, ejercito, tipo, numero) {
    let stats = null;
    if (tipo === 'Interceptor') {
        stats = config.nave.interceptor;
    } else if (tipo === 'Explorador') {
        stats = config.nave.explorador;
    } else if (tipo === 'Acorazado') {
        stats = config.nave.acorazado;
    } else {
        console.log('Error, tipo nave recibido es erroneo');
    };
    return new Nave(jugador, ejercito, tipo, numero, stats);
};


/**
 *Clase Nave.
 *
 * @class Nave
 */
class Nave {
    /**
     *Crea una instancia de Nave.
     * @param {String} jugador PJ o NPC.
     * @param {String} ejercito Verdo o Rojo.
     * @param {String} tipo Interceptor, Explorador o Acorazado.
     * @param {Number} numero Diferenciar naves del mismo tipo.
     * @param {Object} stats Objeto con las propiedades de la nave.
     * @memberof Nave
     */
    constructor(jugador, ejercito, tipo, numero, stats) {
        /**@param {String} nombre Para diferenciar las naves.*/
        this.nombre = `${tipo} ${numero} (${ejercito})`;
        /**PJ@param {String} jugador PJ(jugador) o NPC(máquina)*/
        this.jugador = jugador;
        /**@param {String} ejercito Ejercito al que pertenece: Verde o Rojo*/
        this.ejercito = ejercito;
        /**@param {String} tipo Interceptor, Explorador o Acorazado*/
        this.tipo = tipo;
        /**@param {Number} dano Daño que causa al impactar un disparo*/
        this.dano = stats.dano;
        /**@param {Number} alcance Distancia de disparo*/
        this.alcance = stats.alcance;
        /**@param {Number} punteria Probabilidad de acertar al blanco*/
        this.punteria = stats.punteria;
        /**@param {Number} movimiento Distancia de movimiento*/
        this.movimiento = stats.movimiento;
        /**@param {Number} vida Daño soportado antes de morir*/
        this.vida = stats.vida;
        /**@param {Number} esquiva Probabilidad de esquivar un disparo*/
        this.esquiva = stats.esquiva;
        /**@param {Boolean} turno Si esta ronda jugo(true) o falta por jugar(false)*/
        this.turno = true;
        /**@param {String} estado Viva o destruida*/
        this.estado = 'viva';
    };

    /**
     *Comprueba si una nave está destruida.
     * @returns {Boolean} True si destruida, false si viva.
     * @memberof Nave
     */
    comprobarSiDestruida() {
        if (this.vida <= 0) {
            this.vida = 0;
            return true;
        };
        return false;
    };

    /**
     *Una nave dispara a otro objeto tipo Nave.
     * @param {Nave} naveEnemiga
     * @returns {String} Mensaje
     * @memberof Nave
     */
    disparar(naveEnemiga) {
        if (naveEnemiga.ejercito === this.ejercito) return `Error, nave seleccionada es aliada, ${naveEnemiga.nombre}`;
        const punteria = this.punteria + Math.random() * 0.35;
        const esquiva = naveEnemiga.esquiva + Math.random() * 0.35;
        let mensaje = '';
        if (punteria >= esquiva) {
            naveEnemiga.vida -= this.dano;
            if (naveEnemiga.comprobarSiDestruida()) {
                mensaje = `${this.ejercito}: La nave ${this.nombre} destruye a la nave ${naveEnemiga.nombre}`;
            } else {
                mensaje = `${this.ejercito}: La nave ${this.nombre} causa ${this.dano} puntos de daño a la nave ${naveEnemiga.nombre}`;
            };
        } else {
            mensaje = `${this.ejercito}: La nave ${naveEnemiga.nombre} esquiva el ataque de la nave ${this.nombre}`;
        };
        this.turno = true;
        return mensaje;
    };
};

export { crearNave };