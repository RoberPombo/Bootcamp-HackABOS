## Semana 0

    Adquisición y repaso de conocimientos básicos antes del comienzo del Bootcamp.

# Ejercicios de git y github:

[X] Crea un repositorio: El actual repositorio donde voy a ir subiendo todo el Bootcamp

[X] Utiliza los comandos de git.
    
# Ejercios web:

[X] ¿Qué es el DOM?

  El DOM o Document Object Model es esencialmente una interfaz de plataforma que proporciona un conjunto estándar de objetos para representar documentos HTML, XHTML y XML.

  Es un modelo estándar sobre cómo pueden combinarse dichos objetos, y una interfaz estándar para acceder a ellos y manipularlos.

[X] ¿Qué es un framework?

  Un framework es una estructura conceptual y tecnológica de soporte definido, normalmente con artefactos o módulos de software concretos, que puede servir de base para la organización y desarrollo de software.

  En resumen, es una herramienta para facilitar la programación: evitando codigo repetitivo, ayudandonos a usar buenas prácticas de programación, a desarrollar más rápido, ...

[X] ¿Diferencias entre HTTP y HTTPS?¿Y websockets?

  HTTP es un protocolo de comunicación entre un cliente y un servidor de una red, tiene un funcionamiento del tipo "petición-respuesta". El cliente hace una petición y el servidor le responde. La diferencia es que la comunicación en el protocolo HTTPS es encriptada y, por lo tanto, más segura.

  Websockets es otro protocolo de comunicación, pero en este caso es una comunicación bidireccional y full-duplex sobre un único socket TCP. Websockets habre un tunel de comunicación entre el servidor y el cliente, y cualquiera de los dos puede hacer peticiones y enviar respuestas. Es una conexión que ahorra llamadas al servidor y requiere del envío de menos información en las peticiones.

[X] Define el proceso que ocurre desde que entras a una web hasta que ves la página cargada.

  El motor de renderización del navegador recibe el contenido del documento (HTML, XML, ...) solicitado desde la capa de red. 

  A continuación, empieza a analizar el documento y convierte las etiquetas en nodos DOM, en un árbol denominado "árbol de contenido".

  Analiza los datos de estilo, tanto de archivos CSS como de etiquetas de estilo, esta información la utiliza para crear el "árbol de renderización".

  Ahora se inicia el "diseño", a cada nodo se le asignan las coordenadas exactas del lugar de la pantalla en el que debe aparecer y después comienza el "pintado", en el que se recorre el "árbol de renderización" y se pintan cada uno de los nodos.

  Este es un proceso gradual, se van analizando y mostrando las partes poco a poco, no se espera a analizarlo todo para visualizarlo en el navegador.

  Ej. de flujo principal de WebKit:

  ![Flujo principal WebKit](/Imagenes/webkitflow.png)


# Ejercicios Javascript:

[X] Ejercicio 0 - Calculadora

[X] Ejercicio 1 - Taxis