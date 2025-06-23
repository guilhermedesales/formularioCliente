        const checkboxOutra = document.getElementById('autoimune-outra');
        const campoOutra = document.getElementById('campo-outra-autoimune');

        checkboxOutra.addEventListener('change', () => {
            campoOutra.style.display = checkboxOutra.checked ? 'block' : 'none';
        });