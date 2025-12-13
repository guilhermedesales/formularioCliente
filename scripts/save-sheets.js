 const scriptURL = CONFIG.SHEETS_URL_HISTEROSCOPIA;

        const form = document.forms['contact-form']

        form.addEventListener('submit', e => {

            e.preventDefault()

            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => alert("Formulário Enviado"))
                .then(() => { window.location.reload(); })
                .catch(error => console.error('Error!', error.message))
        })