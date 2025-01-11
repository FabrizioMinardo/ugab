document.addEventListener('DOMContentLoaded', () => {
  const TELEGRAM_TOKEN = '7800730518:AAG2x11gxrhZQvDCjI6ITY4YTT7-uMLQP8Y';
  const TELEGRAM_CHAT_ID = '6126902636';

  // Extraer el número de mesa desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const tableNumber = urlParams.get('table') || 'Desconocida';
  document.getElementById('table-number').textContent = tableNumber;

  const sendTelegramMessage = async (message) => {
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje.');
      }

      document.getElementById('status-message').style.display = 'block';
    } catch (error) {
      alert('Hubo un problema al conectar con el servidor.');
      console.error(error);
    }
  };

  document.getElementById('call-waiter').addEventListener('click', () => {
    const message = `🛎️ Mesa ${tableNumber} necesita un mozo.`;
    sendTelegramMessage(message);
  });

  document.getElementById('request-bill').addEventListener('click', () => {
    const message = `💰 Mesa ${tableNumber} solicita la cuenta.`;
    sendTelegramMessage(message);
  });

  // Evento para abrir el widget de Trustmary al hacer click en "Dejar una opinión"
  document.getElementById('leave-review').addEventListener('click', () => {
    // Mostrar el widget de Trustmary cuando se presiona el botón
    TrustmaryWidget.show(); // Este es el método para mostrar el widget
  });
});
