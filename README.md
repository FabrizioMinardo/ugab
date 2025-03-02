# UGAB - Restaurante Armenio 🍽️

## 📌 Descripción

Este es un sistema web diseñado para el Restaurante Armenio UGAB que permite a los clientes solicitar atención de un mozo, pedir la cuenta y dejar una opinión fácilmente desde su mesa a través de un botón interactivo.

### 🚀 Funcionalidades

- 🛎️ Llamar al mozo: Envía una notificación al personal indicando qué mesa requiere atención.

- 💰 Pedir la cuenta: Notifica al mozo que la mesa desea pagar.

- ✍️ Dejar una opinión: Abre un widget para que el cliente pueda dejar su comentario sobre la experiencia en el restaurante.

### 🛠️ Tecnologías Utilizadas

- HTML5, CSS3 y JavaScript para la estructura, diseño e interactividad.

- Google Fonts para mejorar la tipografía.

- Fetch API para enviar notificaciones al bot de Telegram.

- Bot de Telegram para recibir y gestionar las solicitudes.

### 📜 Instalación y Configuración

- Clona este repositorio:

```git
git clone https://github.com/tuusuario/ugab-restaurante.git
```
- Abre el proyecto en tu navegador ejecutando el archivo index.html.

- Configura tu bot de Telegram (si deseas usar otro token o chat ID):

- Modifica las constantes TELEGRAM_TOKEN y TELEGRAM_CHAT_ID en Script.js con tu información.


### 🎯 Cómo Funciona

- Carga la página en un navegador.

- Selecciona una acción (llamar al mozo, pedir la cuenta o dejar una opinión).

- Se enviará un mensaje al bot de Telegram con la solicitud y el número de mesa.

- El personal recibirá la notificación y atenderá la solicitud.

### 📌 Personalización

Si deseas cambiar los mensajes de estado, edita Script.js en las siguientes líneas:

```javascript
const messages = {
    callWaiter: "🛎️ Mesa {table} necesita un mozo.",
    requestBill: "💰 Mesa {table} solicita la cuenta."
};
```
Puedes modificar el texto según lo que necesites.

### 📄 Licencia

Este proyecto está bajo la Licencia MIT, lo que significa que puedes usarlo, modificarlo y distribuirlo libremente.
-------------------------------------------------------------------------------------------------------------------

Desarrollado por Fabrizio Minardo para UGAB - Restaurante Armenio.

