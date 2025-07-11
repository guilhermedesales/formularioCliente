 const scriptURL = 'https://script.google.com/macros/s/AKfycbwg_CF7feqxcD1WhzivJfuvvSRihjiIESVy6ahr5avFhBdwXdrXGmhEP6Hh-1NMeQre/exec'

        const form = document.forms['contact-form']

        form.addEventListener('submit', e => {

            e.preventDefault()

            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => alert("Thank you! Form is submitted"))
                .then(() => { window.location.reload(); })
                .catch(error => console.error('Error!', error.message))
        })