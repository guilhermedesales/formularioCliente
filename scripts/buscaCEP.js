<script src="https://unpkg.com/imask"></script>

        const cepInput = document.getElementById('cep');
        let lastCep = ''; // controle para não repetir chamadas

        // Aplica a máscara
        const cepMask = IMask(cepInput, {
            mask: '00000-000'
        });

        cepInput.addEventListener('input', () => {
            const cep = cepInput.value.replace(/\D/g, '');

            // Só busca se mudou e tem 8 dígitos
            if (cep.length === 8 && cep !== lastCep) {
                lastCep = cep; // registra último CEP válido

                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(res => res.json())
                    .then(data => {
                        if (!data.erro) {
                            document.getElementById('bairro').value = data.bairro || '';
                            document.getElementById('cidade').value = data.localidade || '';
                            document.getElementById('estado').value = data.uf || '';
                        } else {
                            alert('CEP não encontrado.');
                            cepInput.value = '';
                            lastCep = ''; // limpa o controle para tentar de novo se corrigir
                        }
                    })
                    .catch(() => {
                        alert('Erro ao buscar o CEP.');
                        lastCep = ''; // libera para tentar novamente
                    });
            }
        });