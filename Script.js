document.addEventListener('DOMContentLoaded', () => {
  const TELEGRAM_TOKEN = '7800730518:AAG2x11gxrhZQvDCjI6ITY4YTT7-uMLQP8Y';
  const TELEGRAM_CHAT_IDS = ['7814346062']; 

  const urlParams = new URLSearchParams(window.location.search);
  const tableNumber = urlParams.get('table') || 'Desconocida';

  let widgetLoaded = false;
  const buttons = document.querySelectorAll('.button');

  const sendTelegramMessage = async (message, statusMessage) => {
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    try {
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

        // Mostrar mensaje sobre los botones
        const statusElement = document.querySelector('.status-message');
        statusElement.textContent = statusMessage;
        statusElement.classList.add('show');

        // Deshabilitar solo los botones de "Llamar al mozo" y "Pedir la cuenta"
        document.getElementById('call-waiter').disabled = true;
        document.getElementById('call-waiter').classList.add('disabled-button');

        document.getElementById('request-bill').disabled = true;
        document.getElementById('request-bill').classList.add('disabled-button');

    } catch (error) {
        alert('Hubo un problema al conectar con el servidor.');
        console.error(error);
    }
};

  document.getElementById('call-waiter').addEventListener('click', () => {
    sendTelegramMessage(
      `🛎️ *Mesa ${tableNumber} necesita un mozo.*`,
      '¡Listo! El mozo ya lo atenderá.'
    );
  });

  document.getElementById('request-bill').addEventListener('click', () => {
    sendTelegramMessage(
      `🧾 *Mesa ${tableNumber} solicita la cuenta.*`,
      'El mozo pronto le traerá la cuenta. Gracias por elegirnos.'
    );
  });

  document.getElementById('leave-review').addEventListener('click', () => {
    window.open(
      'https://www.google.com/maps/place/SERGRAF/@-34.4721345,-58.5131909,20z/data=!4m6!3m5!1s0x95bcb034405182dd:0xc91b4fc80e01a0dc!8m2!3d-34.4720855!4d-58.5125814!16s%2Fg%2F1td0hpn3?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D',
      '_blank'
    );
  });

  const loadReviewWidget = () => {
    if (!widgetLoaded) {
      const widgetContainer = document.getElementById('widget-container');
      widgetContainer.classList.add('widget-visible');
      const script = document.createElement('script');
      script.src = 'https://widget.trustmary.com/1Gxx6dyMO';
      script.async = true;
      widgetContainer.appendChild(script);
      widgetLoaded = true;
    }
  };

  // Cargar el widget automáticamente
  loadReviewWidget();
});
