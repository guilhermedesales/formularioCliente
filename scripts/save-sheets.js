 const scriptURL = 'https://script.google.com/macros/s/AKfycbw2oyYoCSXhOIE1__tes9I5vdFu4ti_nVj05Y7z0gRiWFwFfBFjinm-avv4sHrq6jk/exec'

        const form = document.forms['contact-form']

        form.addEventListener('submit', e => {

            e.preventDefault()

            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => alert("Formulário Enviado"))
                .then(() => { window.location.reload(); })
                .catch(error => console.error('Error!', error.message))
        })