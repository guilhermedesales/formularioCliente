// Configurações do aplicativo
// Este arquivo centraliza as constantes que podem ser definidas no .env

const CONFIG = {
    // Número do WhatsApp
    WHATSAPP_NUMBER: '5521936193944',
    
    // URLs do Google Sheets
    SHEETS_URL_HISTEROSCOPIA: 'https://script.google.com/macros/s/AKfycbw2oyYoCSXhOIE1__tes9I5vdFu4ti_nVj05Y7z0gRiWFwFfBFjinm-avv4sHrq6jk/exec',
    SHEETS_URL_ENDOMETRIOSE: 'https://script.google.com/macros/s/AKfycbwkjxSjxJXuaxwzgpbyGSeYp3pYCxxgIbYvcNLLpfva203sN0Q2ADew-Ay_CnnSdhAe/exec',
    SHEETS_URL_ANESTESIA: 'https://script.google.com/macros/s/AKfycbwg_CF7feqxcD1WhzivJfuvvSRihjiIESVy6ahr5avFhBdwXdrXGmhEP6Hh-1NMeQre/exec',
    
    // Labels personalizados
    LABEL_DUM: 'DUM',
    LABEL_MENARCA: 'Menarca',
    LABEL_COITARCA: 'Coitarca'
};

// Exporta para uso em outros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
