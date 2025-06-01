document.getElementById("dataNascimento").addEventListener("change", function () {
  const input = this.value;
  const idadeInput = document.getElementById("idade");

  if (input) {
    // Esperado: dd/mm/yyyy
    const partes = input.split('/');
    if (partes.length !== 3) {
      idadeInput.value = "--";
      return;
    }

    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1; // JavaScript usa mês de 0 a 11
    const ano = parseInt(partes[2], 10);

    const nascimento = new Date(ano, mes, dia);
    const hoje = new Date();

    // Validação básica
    if (nascimento > hoje || ano < 1900 || isNaN(nascimento.getTime())) {
      idadeInput.value = "--";
      return;
    }

    let anos = hoje.getFullYear() - nascimento.getFullYear();
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
