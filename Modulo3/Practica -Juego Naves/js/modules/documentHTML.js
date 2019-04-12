'use strict';

/**
 *Actualiza el HTML con las imagenes y lo sucedido en cada ronda de juego.
 *
 * @param {CampoBatalla} campBat Clase CampoBatalla
 * @param {String} jugadorActual Verde o Rojo.
 * @returns
 */
function actualizarEstadoTablero(campBat, jugadorActual) {
    const titulo = document.getElementById('titulo');
    titulo.innerHTML = `Campo de Batalla - ${campBat.nombre}:`
    const ronda = document.getElementById('ronda');
    let color = '';
    (jugadorActual === 'Verde') ? color = '<font color="green">': color = '<font color="red">';
    const numRonda = campBat.infoCombate.length + 1;
    ronda.innerHTML = `Ronda ${numRonda}: Turno jugador ${color}${jugadorActual}</font>`;

    for (let i = 0; i < campBat.tamanoX; i++) {
        for (let j = 0; j < campBat.tamanoY; j++) {
            const celda = campBat.tablero[i][j];
            const celdaHTML = document.getElementById(`${i}-${j}`);
            celdaHTML.value = celda;
            if (celda.nave.nombre === null || (celda.nave.vida === 0 && celda.nave.turno === true)) {
                celdaHTML.removeAttribute('onmouseover');
                celdaHTML.removeAttribute('onmouseout');
                celdaHTML.innerHTML = '';
                celdaHTML.style.backgroundColor = 'transparent';
            } else {
                celdaHTML.setAttribute('onmouseover', 'mostrarNave(this)');
                celdaHTML.setAttribute('onmouseout', 'ocultarNave(this)');
                if (celda.nave.vida === 0) {
                    celdaHTML.innerHTML = `<img src="./img/${celda.nave.ejercito}${celda.nave.tipo}-muerta.png">`;
                } else {
                    celdaHTML.innerHTML = `<img src="./img/${celda.nave.ejercito}${celda.nave.tipo}.png">`;
                };
                if (celda.nave.turno === true) {
                    celdaHTML.style.backgroundColor = 'rgb(204, 204, 204)';
                } else {
                    celdaHTML.style.backgroundColor = 'transparent';
                };
            };
        };
    };
    return;
};

/**
 *Cambia de color las celdas adjacentes de la nave con el ratón encima, para marcar la distancia de movimiento y el alcance de disparo.
 *
 * @param {String} mostrarOcultar mostrar o ocultar
 * @param {CampoBatalla} campBat Clase CampoBatalla
 * @param {Object} celda
 */
function pintarCeldasAlcanceMovimiento(mostrarOcultar, campBat, celda) {
    let colorAlc = 'transparent';
    let colorMov = 'transparent';
    let colorAmb = 'transparent';
    if (mostrarOcultar === 'mostrar') {
        colorAlc = 'rgb(236, 112, 99)';
        colorMov = 'rgb(88, 214, 141)';
        colorAmb = 'rgb(245, 176, 65)';
    };
    const nave = celda.value.nave;
    for (let i = 0; i < campBat.tamanoX; i++) {
        for (let j = 0; j < campBat.tamanoY; j++) {
            const distancia = campBat.calcularDistancia('total', celda.value, campBat.tablero[i][j]);
            const celdaHTML = document.getElementById(`${i}-${j}`);
            if (celda != celdaHTML && celdaHTML.value.nave.nombre === null) {
                if (nave.movimiento > nave.alcance) {
                    if (distancia <= nave.alcance) {
                        celdaHTML.style.backgroundColor = colorAlc;
                    } else if (distancia <= nave.movimiento) {
                        celdaHTML.style.backgroundColor = colorMov;
                    }
                } else if (nave.movimiento < nave.alcance) {
                    if (distancia <= nave.movimiento) {
                        celdaHTML.style.backgroundColor = colorMov;
                    } else if (distancia <= nave.alcance) {
                        celdaHTML.style.backgroundColor = colorAlc;
                    };
                } else {
                    if (distancia <= nave.alcance) {
                        celdaHTML.style.backgroundColor = colorAmb;
                    }
                };
            };
        };
    };
};

/**
 *Crea en el HTML la tabla que contiene el tablero de juego.
 *
 * @param {CampoBatalla} campBat
 */
function crearTableroHTML(campBat) {
    const tabla = document.getElementById('tablero');
    const tBody = document.createElement('tbody');
    for (let i = 0; i < campBat.tamanoX; i++) {
        const hilera = document.createElement('tr');
        for (let j = 0; j < campBat.tamanoY; j++) {
            const celda = document.createElement('td');
            celda.id = `${i}-${j}`;
            celda.value = campBat.tablero[i][j];
            celda.setAttribute('onclick', 'seleccionarCelda(this)');
            hilera.appendChild(celda);
        };
        tBody.appendChild(hilera);
    };
    tabla.appendChild(tBody);
    tabla.setAttribute('border', '2');
};


export { actualizarEstadoTablero, crearTableroHTML, pintarCeldasAlcanceMovimiento };