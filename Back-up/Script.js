/*
  © 2025 Fabrizio Gabriel Bustos Minardo
  Registrado ante la DNDA - Argentina
  Expediente: EX-2025-81431364- -APN-DNDA#MJ
  Queda prohibida su reproducción o modificación sin autorización expresa.
*/

const tableNumber = new URLSearchParams(window.location.search).get('table') || 'Desconocida';
const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/t4mdd8uqeex6vteeoblzw89crahic66e";
let widgetLoaded = false;

// Función global para enviar solicitud a Make (Telegram)
async function sendRequest(requestType) {
  try {
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        table: tableNumber,
        request: requestType
      })
    });
    console.log("Make response:", await response.text());
  } catch (error) {
    console.error("Error enviando solicitud:", error);
  }

  // Mostrar mensaje en pantalla
  const statusElement = document.querySelector('.status-message');
  statusElement.textContent = requestType === "mozo"
    ? "¡Gracias por avisar! El mozo pronto estará con usted."
    : "El mozo pronto le traerá la cuenta. Gracias por elegirnos.";
  statusElement.classList.add("show");

  // Desactivar botones
  document.getElementById('call-waiter').disabled = true;
  document.getElementById('call-waiter').classList.add('disabled-button');
  document.getElementById('request-bill').disabled = true;
  document.getElementById('request-bill').classList.add('disabled-button');
}

// Cargar widget de reseñas
function loadReviewWidget() {
  if (!widgetLoaded) {
    const widgetContainer = document.getElementById('widget-container');
    if (widgetContainer) {
      widgetContainer.classList.add('widget-visible');
      const script = document.createElement('script');
      script.src = 'https://widget.trustmary.com/1Gxx6dyMO';
      script.async = true;
      widgetContainer.appendChild(script);
      widgetLoaded = true;
    }
  }
}

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {

  loadReviewWidget();

  // Popup Wifi
  const wifiButton = document.getElementById('wifi-info');
  const wifiPopup = document.getElementById('wifi-popup');
  const closePopup = document.getElementById('close-popup');
  wifiButton?.addEventListener('click', () => { wifiPopup.style.display = 'flex'; });
  closePopup?.addEventListener('click', () => { wifiPopup.style.display = 'none'; });

  // Instagram
  document.getElementById('instagram')?.addEventListener('click', () => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isAndroid) {
      window.location.href = 'intent://instagram.com/_u/ugabcenas/#Intent;package=com.instagram.android;scheme=https;end';
      setTimeout(() => { window.location.href = 'https://www.instagram.com/ugabcenas/'; }, 1500);
    } else if (isIOS) {
      window.location.href = 'instagram://user?username=ugabcenas';
      setTimeout(() => { window.location.href = 'https://www.instagram.com/ugabcenas/'; }, 1500);
    } else {
      window.open('https://www.instagram.com/ugabcenas/', '_blank');
    }
  });

  // Menú PDF
  document.getElementById('menu')?.addEventListener('click', () => {
    window.open('https://selquet.com/Carta_Selquet.pdf', '_blank');
  });

  // Descargar revista
  document.getElementById('sponsors')?.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'Documentos/Revista2025.pdf';
    link.download = 'Revista2025.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Dejar reseña (Google Maps)
  document.getElementById('leave-review')?.addEventListener('click', () => {
    window.open('https://maps.app.goo.gl/oUeDFMRrGFH6rA7J6', '_blank');
  });

});
