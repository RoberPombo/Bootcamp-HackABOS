let exit = false;
let numbers = [];
let raiz = 0;
let suma = 0;
let resta = 0;
let multiplicacion = 0;
let division = 0;

alert("Si se introduce un solo número, se devuelve la raiz cuadrada. \nSi se introducen dos o más numeros, se devuelve: la suma, la resta, la multiplicación y la división. \n\nCuando quiera realizar los calculos: PULSE CANCELAR.")

while (!exit) {

    let number = prompt("Añada un número para realizar las operaciones:")

    if (isNaN(number) || number == 0) {

        alert("No ha introducido un número válido!!!. Vuelva a intentarlo");

    } else if (number === null) {

        operaciones();
        exit = true

    } else {

        numbers.push(number);

    }

}



function operaciones() {

    if (numbers.length <= 0) {

        alert("No se puede realizar ninguna operación al no haber introducido ningún número.")

    } else if (numbers.length === 1) {

        raiz = Math.sqrt(numbers[0]).toFixed(2);
        console.log("La raiz cuadrada de ", numbers[0], "es ", raiz);
        alert("La raiz cuadrada de " + numbers[0] + " es " + raiz);

    } else {

        for (let i = 0; i < numbers.length; i++) {

            if (i === 0) {

                suma = parseFloat(numbers[i]);
                resta = parseFloat(numbers[i]);
                multiplicacion = parseFloat(numbers[i]);
                division = parseFloat(numbers[i]);

            } else {

                suma = suma + parseFloat(numbers[i]);
                resta = resta - parseFloat(numbers[i]);
                multiplicacion = multiplicacion * parseFloat(numbers[i]);
                division = division / parseFloat(numbers[i]);

            }

        }

        alert("Los números ingresados son: " + numbers + ". \n La suma es: " + suma + ". \n La resta es: " + resta + ". \n La multiplicación es: " + multiplicacion + ". \n La división es: " + division + ".");
        console.log("Los números ingresados son: " + numbers + ". \n La suma es: " + suma + ". \n La resta es: " + resta + ". \n La multiplicación es: " + multiplicacion + ". \n La división es: " + division + ".");

    }

}