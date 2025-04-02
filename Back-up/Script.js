document.addEventListener('DOMContentLoaded', () => {
  const TELEGRAM_TOKEN = '7800730518:AAG2x11gxrhZQvDCjI6ITY4YTT7-uMLQP8Y';
  const TELEGRAM_CHAT_IDS = ['6126902636', '5810456705', '7797691585']; 

  // Extraer el número de mesa desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const tableNumber = urlParams.get('table') || 'Desconocida';

  let widgetLoaded = false;

  const sendTelegramMessage = async (message, statusMessage) => {
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    try {
      // Enviar el mensaje a cada chat ID
      for (const chatId of TELEGRAM_CHAT_IDS) {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: message }),
        });

        if (!response.ok) {
          throw new Error(`Error al enviar el mensaje a ${chatId}.`);
        }
      }

      // Mostrar mensaje de estado
      const statusElement = document.getElementById('status-message');
      statusElement.textContent = statusMessage;
      statusElement.style.display = 'block';
    } catch (error) {
      alert('Hubo un problema al conectar con el servidor.');
      console.error(error);
    }
  };

  document.getElementById('call-waiter').addEventListener('click', () => {
    const message = `🛎️ *Mesa ${tableNumber} necesita un mozo.*`; 
    const statusMessage = '¡Listo! El mozo ya lo atenderá.';
    sendTelegramMessage(message, statusMessage);
  });
  
  document.getElementById('request-bill').addEventListener('click', () => {
    const message = `🧾 *Mesa ${tableNumber} solicita la cuenta.*`;
    const statusMessage = 'El mozo pronto le traerá la cuenta. Gracias por elegirnos.';
    sendTelegramMessage(message, statusMessage);
  });
  

  document.getElementById('leave-review').addEventListener('click', () => {
    if (!widgetLoaded) {
      loadReviewWidget();
      widgetLoaded = true;
    }
  });

  const loadReviewWidget = () => {
    const widgetContainer = document.getElementById('widget-container');
    widgetContainer.classList.add('widget-visible');
    const script = document.createElement('script');
    script.src = 'https://widget.trustmary.com/1Gxx6dyMO';
    script.async = true;
    widgetContainer.appendChild(script);
  };
});