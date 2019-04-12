'use strict';
/**
 * @module config 
 */


/**Constante con los stats de las naves del juego.*/
const config = {
    nave: {
        interceptor: {
            tipo: 'Interceptor',
            punteria: 0.25,
            esquiva: 0.15,
            dano: 12,
            vida: 8,
            alcance: 2,
            movimiento: 4
        },
        explorador: {
            tipo: 'Explorador',
            punteria: 0.20,
            esquiva: 0.20,
            dano: 10,
            vida: 10,
            alcance: 3,
            movimiento: 3
        },
        acorazado: {
            tipo: 'Acorazado',
            punteria: 0.15,
            esquiva: 0.25,
            dano: 8,
            vida: 12,
            alcance: 4,
            movimiento: 2
        },
    },

    /**Constante con el tamaño de naves que tiene el ejercito */
    tamanoEjercito: 12,

    /**Contante con el tamaño del campo de Batalla, la disposición y nombre de los ejercitos.*/
    tamanoCB: {
        tamX: 9,
        tamY: 9,
        ejercIzq: {
            nombre: 'Verde',
            columInit: 0,
            columFin: 2,
        },
        ejercDcha: {
            nombre: 'Rojo',
            columInit: 6,
            columFin: 8,
        },
    },
};

export { config };