# Proyecto Tamagochis

Este proyecto es un juego simple basado en navegador donde múltiples jugadores se incorporan a un tablero. Cada jugador se representa mediante un “tanque” (imagen) y se mueve por el tablero. El diseño es modular y escalable, lo que facilita su mantenimiento y futura ampliación.

## Ultimas funcionalidades implementadas

- **Movimiento de jugador:**

  - El botón "Mover" se conecta a la interfaz y llama a la función en `ButtonController.js` para mover el jugador.
  - Se realiza una comprobación de colisiones y límites en el tablero.
  - Inicialmente, el jugador se mueve hacia la derecha según su dirección; se han resuelto problemas para extraer la posición inicial a partir del identificador recibido en `playerIdentification`.

- **Identificación del jugador:**
  - Al conectarse al servidor, cada cliente recibe un identificador único (socket.id) que se guarda en `UIv1.playerId` y se utiliza para asignar la posición inicial del jugador en el tablero.
  - El tablero se crea **únicamente** cuando se han conectado los 4 jugadores.
  - La asignación de posiciones a los jugadores es aleatoria entre las 4 esquinas del tablero, garantizando que cada jugador inicie en una posición única.

## Lo que falta por implementar

- **Funcionalidad del botón "Rotar":**  
  Desarrollar la lógica que permita cambiar la dirección del jugador (por ejemplo, rotando entre "up", "down", "left", "right").
- **Funcionalidad del botón "Disparar":**  
  Implementar la mecánica de disparo (por ejemplo, emitiendo un mensaje al servidor o mostrando una animación en el tablero).

## Arquitectura y estructura

El código ha sido organizado en módulos que separan las diferentes responsabilidades:

### Cliente (carpeta `clienteConTableroFuncionando`)

- **`index.html`**  
  Página principal que carga la interfaz, hoja de estilos y el JavaScript principal.
- **`package.json`**  
  Gestión de dependencias, incluyendo `animejs` y `socket.io-client`.

- **`src/index.js`**  
  Punto de entrada del cliente; se inicializa el `GameController` y se activa la UI.

- **`src/Ui.js`**  
  Define el objeto base para la construcción de la interfaz; se utiliza para generar el objeto `UI_BUILDER`.

- **`src/UIv1.js`**  
  Implementa la UI del juego, inicializa el tablero, crea los botones dinámicamente y redibuja el estado del tablero. Guarda información importante (p. ej., `playerId` y `boardState`).

- **`src/entities/Board.js`**  
  Define la clase `Board` y la constante `ELEMENTS` para identificar los elementos (jugador, arbusto) en el tablero.

- **`src/entities/Player.js`**  
  Define el objeto `Player` con propiedades como `x`, `y`, `status`, `direction` y `visibility`. Se recomienda actualizar `direction` a un valor string (por ejemplo, `"right"`) para una lógica coherente de movimiento.

- **`src/ButtonController.js`**  
  Encargado de gestionar los eventos de los botones (mover, disparar, rotar). Actualmente, la funcionalidad del botón "Mover" está implementada, aunque por el momento se mueve solo hacia la derecha; se han añadido mensajes en consola para depuración.

- **`src/Queue.js`**  
  Implementa una cola para gestionar mensajes o acciones que se procesan en secuencia, evitando sobrecargar el procesamiento de eventos.

- **`src/services/ConnectionHandler.js`**  
  Se conecta al servidor vía Socket.IO, gestiona eventos de conexión, mensajes y la identificación del jugador, guardando el socket.id en `UIv1.playerId`.

- **`src/services/GameService.js`**  
  Procesa el estado del juego en el cliente. Recibe el payload del servidor para construir el tablero y extraer la posición asignada al jugador mediante el identificador.

### Servidor (carpeta `server`)

- **`src/index.ts`**  
  Configura Express y arranca el servidor HTTP.
- **`src/server/ServerService.ts`**  
  Gestiona las conexiones de Socket.IO, emisión de mensajes y la comunicación global entre cliente y servidor.
- **`src/game/BoardBuilder.ts`**  
  Construye el tablero según un payload recibido (con tamaño, número de arbustos y posiciones de jugadores).
  - **Nota:** El tablero se crea solo cuando se han conectado los 4 jugadores.
  - Los jugadores son asignados a las cuatro esquinas del tablero de forma aleatoria.
- **`src/game/GameService.ts`**  
  Gestiona la lógica del juego en el servidor. Asigna jugadores a salas, construye el tablero y emite el estado del juego a los clientes.
- **`src/player/entities/Player.ts`**  
  Define la interfaz del jugador y sus propiedades, como `direction` (por ejemplo, usando enums para "up", "down", "left", "right") y el estado del jugador.
- **`src/room/RoomService.ts`**  
  Administra las salas (rooms) de juego, asigna jugadores y controla el inicio del juego cuando la sala se llena.

## Resumen

El proyecto busca crear una arquitectura modular para un juego en tiempo real en el navegador. La comunicación entre cliente y servidor se realiza mediante Socket.IO, y la UI se construye dinámicamente a partir de los datos del servidor. Gracias a su diseño modular, es fácil de mantener, ampliar y escalar. Los siguientes pasos incluyen completar la lógica para rotar y disparar, lo que dará lugar a una experiencia de juego completa y dinámica.
