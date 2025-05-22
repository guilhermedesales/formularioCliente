document.getElementById("dataNascimento").addEventListener("change", function () {
    const input = this.value;
    const idadeInput = document.getElementById("idade");

    if (input) {
        const nascimento = new Date(input);
        const hoje = new Date();
        const anoNascimento = nascimento.getFullYear();
        const anoAtual = hoje.getFullYear();

        if (anoNascimento < 1900 || nascimento > hoje) {
            idadeInput.value = "--";
            return;
        }

        let anos = anoAtual - anoNascimento;
        let meses = hoje.getMonth() - nascimento.getMonth();
        let dias = hoje.getDate() - nascimento.getDate();

        if (dias < 0) {
            meses--;
            const mesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0);
            dias += mesAnterior.getDate();
        }

        if (meses < 0) {
            anos--;
            meses += 12;
        }

        if (anos < 0) {
            idadeInput.value = "--";
            return;
        }

        idadeInput.value = `${anos} ano${anos !== 1 ? 's' : ''}, ` +
            `${meses} mês${meses !== 1 ? 'es' : ''} e ` +
            `${dias} dia${dias !== 1 ? 's' : ''}`;
    } else {
        idadeInput.value = "--";
    }
});
