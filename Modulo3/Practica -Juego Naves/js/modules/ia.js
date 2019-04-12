'use strict';

/**
 * @module ia
 */

/**
 *Singelton para crear un tipo IntArt.
 *
 * @class CrearIntArt
 */
class CrearIntArt {
    /**
     *Crea una instancia de CrearIntArt.
     * @memberof CrearIntArt
     */
    constructor() {
        this.instance = null;
    };

    /**
     *Crea un tipo IntArt si no hay uno existente.
     * @param {CampoBatalla} campoBatalla
     * @returns {IntArt} retorna la ia existente o la recien creada.
     * @memberof CrearIntArt
     */
    crearIA(campoBatalla) {
        if (this.instance === null) {
            this.instance = new IntArt(campoBatalla);
        };
        return this.instance;
    }
};

/**
 *Clase IntArt. Se encarga de los movimientos de la máquina.
 *
 * @class IntArt
 */
class IntArt {
    /**
     *Crea una instancia de IntArt.
     * @param {CampoBatalla} campoBatalla clase CampoBatalla.
     * @memberof IntArt
     */
    constructor(campoBatalla) {
        /**@param {CampoBatalla} cB Guarda el campo de batalla generado.*/
        this.cB = campoBatalla;
        /**@param {Ejercito} ejercito Para guardar el ejercito que tiene que realizar una acción.*/
        this.ejercito = [];
        /**@param {Object[]} accionMatar Guarda las celdas que contienen naves enemigas con una vida inferior o igual al daño de nuestras naves.*/
        this.accionMatar = [];
        /**@param {Object[]} accionDanar Guarda las celdas que contienen naves enemigas con una vida superior al daño de nuestras naves.*/
        this.accionDanar = [];
        /**@param {Object[]} accionMover Guarda las celdas vacias a las que se pueden mover nuestras naves.*/
        this.accionMover = [];
    };

    /**
     *Recorre las naves del ejercito actual para comprobar que acciones pueden hacer.
     * @param {String} jugActual Rojo o Verde
     * @returns {Object} retorna la celda con la nave que va a realizar una accion y la celda sobre la que realiza dicha acción.
     * @memberof IntArt
     */
    recorrerNavesAliadas(jugActual) {
        this.ejercito = [];
        this.accionMatar = [];
        this.accionDanar = [];
        this.accionMover = [];

        (jugActual === 'Verde') ? this.ejercito = this.cB.ejercitoVerde: this.ejercito = this.cB.ejercitoRojo;

        this.ejercito.naves.forEach(nave => {
            if (!nave.turno) {
                const celdaNave = this.buscarNaveTablero(nave);

                const { tipoAccion, arrayAccion } = this.comprobarTablero(celdaNave);

                const posibleAccion = this.filtrarAcciones(tipoAccion, arrayAccion);

                if (tipoAccion === 'matar') this.accionMatar.push([celdaNave, posibleAccion]);
                if (tipoAccion === 'danar') this.accionDanar.push([celdaNave, posibleAccion]);
                if (tipoAccion === 'mover') this.accionMover.push([celdaNave, posibleAccion]);
            };
        });
        if (this.accionMatar.length > 0) {
            this.accionMatar.sort((celA, celB) => celA[1].probabilidad - celB[1].probabilidad);
            return [this.accionMatar[0][0], this.accionMatar[0][1].zona];
        } else if (this.accionDanar.length > 0) {
            this.accionDanar.sort((celA, celB) => celA[1].probabilidad - celB[1].probabilidad);
            return [this.accionDanar[0][0], this.accionDanar[0][1].zona];
        } else if (this.accionMover.length > 0) {
            this.accionMover.sort((celA, celB) => celA[1].distanciaEnemigo - celB[1].distanciaEnemigo);
            return [this.accionMover[0][0], this.accionMover[0][1].zona.zona];
        } else {
            return [null, null];
        }
    };

    /**
     *Busca la celda que contienen a una nave en concreto.
     * @param {Nave} nave nave aliada que buscamos.
     * @returns {Object} la celda que contiene a dicha nave.
     * @memberof IntArt
     */
    buscarNaveTablero(nave) {
        for (let i = 0; i < this.cB.tamanoX; i++) {
            for (let j = 0; j < this.cB.tamanoY; j++) {
                if (this.cB.tablero[i][j].nave === nave) {
                    return this.cB.tablero[i][j]
                };
            };
        };
    };

    /**
     *Recorre el tablero para encontrar las posibles acciones que puede realizar una nave.
     * @param {Object} zonaNave la celda que contiene a la nave.
     * @returns {Object[]} array con la celda de nuestra nave y la celda sobre la que realizar una acción.
     * @memberof IntArt
     */
    comprobarTablero(zonaNave) {
        const navesMatables = [];
        const navesDanables = [];
        const posibleMovimiento = [
            [],
            []
        ]
        for (let i = 0; i < this.cB.tamanoX; i++) {
            for (let j = 0; j < this.cB.tamanoY; j++) {
                const zona = this.cB.tablero[i][j];

                if (zona.nave.nombre && (zona.nave.ejercito !== zonaNave.nave.ejercito && zona.nave.vida > 0)) {
                    const distanciaEnemigo = this.cB.calcularDistancia('total', zonaNave, zona);
                    if (distanciaEnemigo <= zonaNave.nave.alcance) {
                        const probabilidad = zonaNave.nave.punteria - zona.nave.esquiva;
                        if (zona.nave.vida <= zonaNave.nave.dano) {
                            navesMatables.push({
                                accion: 'matar',
                                distanciaEnemigo,
                                probabilidad,
                                zona,
                            });
                        } else {
                            navesDanables.push({
                                accion: 'dañar',
                                distanciaEnemigo,
                                probabilidad,
                                zona,
                            });
                        };
                    };
                    posibleMovimiento[1].push({
                        distanciaEnemigo,
                        zona,
                    });
                } else if (!zona.nave.nombre && zona.nave.ejercito !== zonaNave.nave.ejercito) {
                    const distanciaCeldas = this.cB.calcularDistancia('total', zonaNave, zona);
                    if (distanciaCeldas <= zonaNave.nave.movimiento) {
                        posibleMovimiento[0].push({
                            accion: 'mover',
                            distanciaCeldas,
                            zona,
                        });
                    };
                };
            };
        };
        if (navesMatables.length > 0) return { tipoAccion: 'matar', arrayAccion: navesMatables };
        if (navesDanables.length > 0) return { tipoAccion: 'danar', arrayAccion: navesDanables };
        if (posibleMovimiento[0].length > 0) return { tipoAccion: 'mover', arrayAccion: posibleMovimiento };
        console.log('Hay algun error al buscar las posibles acciones en IA');
    };

    /**
     *Filtra el array de posibles acciones para dejar solo una acción.
     * @param {String} tipoAccion matar, dañar o mover.
     * @param {Object[]} arrayAccion array con las celdas sobre las que podemos realizar la accion.
     * @returns {Object} devuelve una celda sobre la que realizar una acción.
     * @memberof IntArt
     */
    filtrarAcciones(tipoAccion, arrayAccion) {
        if (tipoAccion === 'matar' || tipoAccion === 'danar') {
            arrayAccion.sort((navA, navB) => navB.probabilidad - navA.probabilidad);
            return arrayAccion[0];
        } else if (tipoAccion === 'mover') {
            arrayAccion[0].sort((celA, celB) => celB.distanciaCeldas - celA.distanciaCeldas);
            arrayAccion[1].sort((celA, celB) => celA.distanciaEnemigo - celB.distanciaEnemigo);
            arrayAccion = this.filtrarMovimientos(arrayAccion);
            return arrayAccion[0];
        };
    };


    /**
     *Filtra el array de posibles movimientos.
     * @param {Object[]} arrayAccion array con las celdas sobre las que podemos realizar la acción de mover.
     * @returns {Object} devuelve una celda sobre la que realizar el movimiento.
     * @memberof IntArt
     */
    filtrarMovimientos(arrayAccion) {
        const zonasNoAlcance = [];
        const zonasAlcance = [];
        for (let i = 0; i < arrayAccion[0].length; i++) {
            let alcance = false;
            let distanciaEnemigo = 50;
            for (let j = 0; j < arrayAccion[1].length; j++) {
                const distanciaAux = this.cB.calcularDistancia('total', arrayAccion[0][i].zona, arrayAccion[1][j].zona);
                if (arrayAccion[1][j].zona.nave.alcance >= distanciaAux && arrayAccion[1][j].zona.nave.turno === true) {
                    alcance = true;
                };
                if (distanciaEnemigo > distanciaAux) distanciaEnemigo = distanciaAux;
            };
            if (alcance) {
                zonasAlcance.push({
                    distanciaEnemigo,
                    alcance,
                    zona: arrayAccion[0][i],
                });
            } else {
                zonasNoAlcance.push({
                    distanciaEnemigo,
                    alcance,
                    zona: arrayAccion[0][i],
                });
            };
        };
        if (zonasNoAlcance.length > 0) {
            zonasNoAlcance.sort((celA, celB) => celA.distanciaEnemigo - celB.distanciaEnemigo);
            return zonasNoAlcance;
        };
        if (zonasAlcance.length > 0) {
            zonasAlcance.sort((celA, celB) => celA.distanciaEnemigo - celB.distanciaEnemigo);
            return zonasAlcance;
        };
        console.log('en filtrarMovimiento hay un error, o la nave no tiene a donde moverse.');
    };
};


export { CrearIntArt };