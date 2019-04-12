# EJERCICIO 2 - MODULO 0:

Mejora en la 3ª semana del Bootcamp del ejercicio 2 del módulo 0 (Táxis).
Mejoras visuales y de programación.


## ENUNCIADO:

(Los datos de los taxis están al final del enunciado, podéis usarlos en vuestro código).
Programa una inferfaz de usuario para una app de taxis. Esta app dispondrá de 5 trayectos para el dia de hoy, para empezar, estos trayectos estarán declarados de manera global, cuando se llame a la función:

Se preguntará por el nombre de usuario y dará la bienvenida.
El usuario visualizará todos los vuelos disponibles de una forma amigable:
El trayecto con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna parada.
A continuación, el usuario verá el coste medio de los trayectos.
También podrá ver cuantos trayectos efectúan paradas.
Sabiendo que los ultimos 5 trayectos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.

**_PRO!:_**

Después de ver toda la información el programa pedirá al usuario si es ADMIN/USER, dependiendo de la elección, el programa se comportará de la siguiente manera:

Si eres **ADMIN**, la función debería permitir: Poder crear, más trayectos, pidiendo la información por prompt(), sin poder pasar de 8 trayectos, si se intenta introducir uno más, saltará un alert().
Poder eliminar trayectos mediante el ID.

Si eres **USER** la función debería permitir: Buscar por precio (más alto(0), más bajo(1) o igual(2)), el usuario debería mostrar los datos de los vuelos encontrados y, indicando el ID, el programa responderá:
"Gracias por su compra, vuelva pronto."
