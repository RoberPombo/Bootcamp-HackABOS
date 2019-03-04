# Módulo 0

  Adquisición y repaso de conocimientos básicos antes del comienzo del Bootcamp.

## Ejercicios de git y github:

**[X] Crea un repositorio: El actual repositorio donde voy a ir subiendo todo el Bootcamp**

**[X] Utiliza los comandos de git.**
    
## Ejercios web:

**[X] ¿Qué es el DOM?**

  El DOM o Document Object Model es esencialmente una interfaz de plataforma que proporciona un conjunto estándar de objetos para representar documentos HTML, XHTML y XML.

  Es un modelo estándar sobre cómo pueden combinarse dichos objetos, y una interfaz estándar para acceder a ellos y manipularlos.

**[X] ¿Qué es un framework?**

  Un framework es una estructura conceptual y tecnológica de soporte definido, normalmente con artefactos o módulos de software concretos, que puede servir de base para la organización y desarrollo de software.

  En resumen, es una herramienta para facilitar la programación: evitando codigo repetitivo, ayudandonos a usar buenas prácticas de programación, a desarrollar más rápido, ...

**[X] ¿Diferencias entre HTTP y HTTPS?¿Y websockets?**

  HTTP es un protocolo de comunicación entre un cliente y un servidor de una red, tiene un funcionamiento del tipo "petición-respuesta". El cliente hace una petición y el servidor le responde. La diferencia es que la comunicación en el protocolo HTTPS es encriptada y, por lo tanto, más segura.

  Websockets es otro protocolo de comunicación, pero en este caso es una comunicación bidireccional y full-duplex sobre un único socket TCP. Websockets habre un tunel de comunicación entre el servidor y el cliente, y cualquiera de los dos puede hacer peticiones y enviar respuestas. Es una conexión que ahorra llamadas al servidor y requiere del envío de menos información en las peticiones.

**[X] Define el proceso que ocurre desde que entras a una web hasta que ves la página cargada.**

  El motor de renderización del navegador recibe el contenido del documento (HTML, XML, ...) solicitado desde la capa de red. 

  A continuación, empieza a analizar el documento y convierte las etiquetas en nodos DOM, en un árbol denominado "árbol de contenido".

  Analiza los datos de estilo, tanto de archivos CSS como de etiquetas de estilo, esta información la utiliza para crear el "árbol de renderización".

  Ahora se inicia el "diseño", a cada nodo se le asignan las coordenadas exactas del lugar de la pantalla en el que debe aparecer y después comienza el "pintado", en el que se recorre el "árbol de renderización" y se pintan cada uno de los nodos.

  Este es un proceso gradual, se van analizando y mostrando las partes poco a poco, no se espera a analizarlo todo para visualizarlo en el navegador.

  Ej. de flujo principal de WebKit:

  ![Flujo principal WebKit](/Imagenes/webkitflow.png)


## Ejercicios Javascript:

**[X] Ejercicio 0 - Calculadora**

  Haz una calculadora que sea un único programa al que le puedes pasar dos parámetros y el usuario podrá visualizar por consola la suma, resta, división y multiplicación entre ambos números. El resultado debería mostrarse con 2 decimales máximo (En caso de que hubieran).
  Si se introduce cualquier cosa que no sean números el programa debe actuar correctamente, es decir, mostrando una advertencia de que has introducido datos erróneos.

  - Si el usuario introduce un numero sólamente, deberá mostrar SOLO su raíz cuadrada, si introduce los dos, volverá a mostrar las 4 operaciones de siempre.

  - Los resultados deberían almacenarse dentro de una array y mostrarlos de una forma amigable al usuario.

  *AVANZADO.*

  Haz que le calculadora realice operaciones sean cuales sean el numero de argumentos pasados.

**[X] Ejercicio 1 - Taxis**

  (Los datos de los taxis están al final del enunciado, podéis usarlos en vuestro código)
  Programa una inferfaz de usuario para una app de taxis. Esta app dispondrá de 5 trayectos para el dia de hoy, para empezar, estos trayectos estarán declarados de manera global, cuando se llame a la función:

  Se preguntará por el nombre de usuario y dará la bienvenida.
  El usuario visualizará todos los vuelos disponibles de una forma amigable:
  El trayecto con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna parada.
  A continuación, el usuario verá el coste medio de los trayectos.
  También podrá ver cuantos trayectos efectúan paradas.
  Sabiendo que los ultimos 5 trayectos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.

  *PRO!:*

  Después de ver toda la información el programa pedirá al usuario si es ADMIN/USER, dependiendo de la elección, el programa se comportará de la siguiente manera:
  Si eres ADMIN, la función debería permitir:

  Poder crear, más trayectos, pidiendo la información por prompt(), sin poder pasar de 8 trayectos, si se intenta introducir uno más, saltará un alert().
  Poder eliminar trayectos mediante el ID.

  Si eres USER la función debería permitir:

  Buscar por precio (más alto(0), más bajo(1) o igual(2)), el usuario debería mostrar los datos de los vuelos encontrados y, indicando el ID, el programa responderá:
  "Gracias por su compra, vuelva pronto."