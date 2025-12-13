// Script para configurar o action do formulário dinamicamente
// Deve ser carregado após config.js

(function() {
    // Aguarda o DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setFormAction);
    } else {
        setFormAction();
    }

    function setFormAction() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        // Detecta qual formulário é baseado na URL ou título da página
        const path = window.location.pathname;
        let actionUrl = '';

        if (path.includes('endometriose')) {
            actionUrl = CONFIG.SHEETS_URL_ENDOMETRIOSE;
        } else if (path.includes('anestesia')) {
            actionUrl = CONFIG.SHEETS_URL_ANESTESIA;
        } else if (path.includes('index')) {
            actionUrl = CONFIG.SHEETS_URL_HISTEROSCOPIA;
        }

        if (actionUrl) {
            form.setAttribute('action', actionUrl);
        }
    }
})();
