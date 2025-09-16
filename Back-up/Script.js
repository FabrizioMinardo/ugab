/*
  © 2025 Fabrizio Gabriel Bustos Minardo
  Registrado ante la DNDA - Argentina
  Expediente: EX-2025-81431364- -APN-DNDA#MJ
  Queda prohibida su reproducción o modificación sin autorización expresa.
*/

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tableNumber = urlParams.get('table') || 'Desconocida';

  let widgetLoaded = false;

// Google Form prellenado
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdy4f4bKH9KD4SrQi_g-GaquOkRKZ_AEOVRRRGa6oBtnPI1zw/viewform?usp=pp_url";
const ENTRY_TABLE = "entry.574053251";  // Campo Mesa
const ENTRY_REQUEST = "entry.1893378574"; // Campo Solicitud (mozo/cuenta)

const openPrefilledForm = (requestType) => {
  const urlParams = new URLSearchParams(window.location.search);
  const tableNumber = urlParams.get('table') || 'Desconocida';

  // Construir URL prellenada
  const prefillUrl = `${FORM_URL}&${ENTRY_TABLE}=${encodeURIComponent(tableNumber)}&${ENTRY_REQUEST}=${encodeURIComponent(requestType)}`;

  // Abrir el formulario en nueva pestaña (Make detecta el envío)
  window.open(prefillUrl, '_blank');

  // Mostrar mensaje de estado
  const statusElement = document.querySelector('.status-message');
  statusElement.textContent = requestType === '🛎️ Necesita un mozo' ? 
    '¡Gracias por avisar!. El mozo pronto estará con usted.' : 
    'El mozo pronto le traerá la cuenta. Gracias por elegirnos.';
  statusElement.classList.add('show');

  // Deshabilitar botones después de usarlos
  document.getElementById('call-waiter').disabled = true;
  document.getElementById('call-waiter').classList.add('disabled-button');

  document.getElementById('request-bill').disabled = true;
  document.getElementById('request-bill').classList.add('disabled-button');
};

// Asignar eventos a los botones
document.getElementById('call-waiter').addEventListener('click', () => {
  openPrefilledForm('🛎️ Necesita un mozo');
});

document.getElementById('request-bill').addEventListener('click', () => {
  openPrefilledForm('🧾 Solicita la cuenta');
});

  document.getElementById('leave-review').addEventListener('click', () => {
    window.open('https://maps.app.goo.gl/oUeDFMRrGFH6rA7J6', '_blank');
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

  loadReviewWidget();
});

// ===== WIFI POPUP =====
const wifiButton = document.getElementById('wifi-info');
const wifiPopup = document.getElementById('wifi-popup');
const closePopup = document.getElementById('close-popup');

wifiButton.addEventListener('click', () => {
  wifiPopup.style.display = 'flex';
});

closePopup.addEventListener('click', () => {
  wifiPopup.style.display = 'none';
});

// ===== INSTAGRAM =====
document.getElementById('instagram').addEventListener('click', () => {
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isAndroid) {
    const intentUrl = 'intent://instagram.com/_u/ugabcenas/#Intent;package=com.instagram.android;scheme=https;end';
    window.location.href = intentUrl;
    setTimeout(() => {
      window.location.href = 'https://www.instagram.com/ugabcenas/';
    }, 1500);
  } else if (isIOS) {
    const appUrl = 'instagram://user?username=ugabcenas';
    window.location.href = appUrl;
    setTimeout(() => {
      window.location.href = 'https://www.instagram.com/ugabcenas/';
    }, 1500);
  } else {
    window.open('https://www.instagram.com/ugabcenas/', '_blank');
  }
});

// ===== MENÚ PDF =====
document.getElementById('menu').addEventListener('click', () => {
  window.open('https://drive.google.com/file/d/1bCie0M_srH--t5OWWGSF0gGhSO-7SjT2/view?usp=sharing', '_blank');
});

// ===== AUSPICIANTES PDF =====
document.getElementById('sponsors').addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = 'Documentos/Revista2025.pdf';
  link.download = 'Revista2025.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
