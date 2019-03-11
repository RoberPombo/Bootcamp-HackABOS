'use strict';

function welcome(name) {
    name = prompt('Hola, ¿Cuál es su nombre?');

    if (!name) {
        alert(`\nBienvenido al sistema de compra de billetes para viajar.`);
        return '';
    } else {
        alert(`\nHola ${name}.\nBienvenido al sistema de compra de billetes para viajar.`);
        return name;
    };

}

function authUser() {
    let user = '';
    while (user === '') {
        user = parseInt(prompt(`\n\nLogin:\nSistema de ultraseguridad:\n\nEs usted:\n1 - User\n2 - Admin`));

        switch (user) {
            case 1:
                return 'isUser';
            case 2:
                return 'isAdmin';
            default:
                user = '';
                alert('\nA introducido un valor incorrecto. Los valores admitidos son: 1 o 2.\n\nPor favor, vuelva a intentarlo.');
        };
    };
};

export { welcome, authUser };