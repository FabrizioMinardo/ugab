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
      '¡Gracias por avisar!. El mozo pronto estará con usted.'
    );
  });

  document.getElementById('request-bill').addEventListener('click', () => {
    sendTelegramMessage(
      `🧾 *Mesa ${tableNumber} solicita la cuenta.*`,
      'El mozo pronto le traerá la cuenta. Gracias por elegirnos.'
    );
  });

  document.getElementById('leave-review').addEventListener('click', function() {
    const mapsUrl = "geo:-34.5919341,-58.4312565?q=UGAB+Restaurant";
    window.location.href = mapsUrl;
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

// WIFI POPUP
const wifiButton = document.getElementById('wifi-info');
const wifiPopup = document.getElementById('wifi-popup');
const closePopup = document.getElementById('close-popup');

wifiButton.addEventListener('click', () => {
  wifiPopup.style.display = 'flex';
});

closePopup.addEventListener('click', () => {
  wifiPopup.style.display = 'none';
});

// INSTAGRAM
document.getElementById('instagram').addEventListener('click', () => {
  const instagramAppUrl = 'instagram://user?username=ugabcenas';
  const instagramWebUrl = 'https://www.instagram.com/ugabcenas/';

  // Intenta abrir la app
  window.location.href = instagramAppUrl;

  // Fallback al sitio web después de un tiempo si no redirige
  setTimeout(() => {
    window.open(instagramWebUrl, '_blank');
  }, 1500);
});
