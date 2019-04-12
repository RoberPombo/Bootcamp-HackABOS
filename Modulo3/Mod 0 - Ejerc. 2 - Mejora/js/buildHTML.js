'use strict'

function buildHTML(rides, costMed, user) {

    document.getElementById('listRides').innerHTML = "";
    let tableBody = document.getElementById('listRides')

    for (let i = 0; i < rides.length; i++) {
        let tr = document.createElement('tr');

        let td = document.createElement('td');
        td.setAttribute('colespan', '2');
        td.appendChild(document.createTextNode(rides[i].from));
        tr.appendChild(td);

        td = document.createElement('td');
        td.setAttribute('colespan', '2');
        td.appendChild(document.createTextNode(rides[i].to));
        tr.appendChild(td);

        td = document.createElement('td');
        td.setAttribute('colespan', '1');
        td.appendChild(document.createTextNode(rides[i].cost));
        tr.appendChild(td);

        td = document.createElement('td');
        td.setAttribute('colespan', '1');
        let auxScale = rides[i].scale ? 'Si' : '';
        td.appendChild(document.createTextNode(auxScale));
        tr.appendChild(td);

        td = document.createElement('td');
        td.setAttribute('colespan', '1');
        let button = document.createElement('button');
        button.setAttribute('onclick', `buyRide(${rides[i].id})`);
        button.appendChild(document.createTextNode('Comprar'));
        td.appendChild(button);
        tr.appendChild(td);

        if (user === 'isAdmin') {
            td = document.createElement('td');
            let button = document.createElement('button');
            button.setAttribute('onclick', `deleteRide(${rides[i].id})`);
            button.setAttribute('class', 'warning');
            button.appendChild(document.createTextNode('Borrar'));
            td.appendChild(button);
            tr.appendChild(td);
        }

        tableBody.appendChild(tr);
    };

    document.getElementById("costMed").innerText = `El coste medio de los viajes mostrados es: ${costMed}€`;

    if (user === 'isAdmin') {
        document.getElementById("isAdmin").style.display = "block";
        document.getElementById("isUser").style.display = "none";
        document.getElementById('isAdminTh').style.display = "block";
    } else if (user === 'isUser') {
        document.getElementById("isAdmin").style.display = "none";
        document.getElementById("isUser").style.display = "block";
        document.getElementById('isAdminTh').style.display = "none";
    } else {
        document.getElementById("isAdmin").style.display = "none";
        document.getElementById("isUser").style.display = "none";
        document.getElementById('isAdminTh').style.display = "none";
    };
}

export { buildHTML };