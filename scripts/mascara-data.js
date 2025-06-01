function aplicarMascaraData(input) {
  input.addEventListener('input', function (e) {
    let valor = e.target.value;

    valor = valor.replace(/\D/g, '');

    if (valor.length > 2 && valor.length <= 4) {
      valor = valor.slice(0, 2) + '/' + valor.slice(2);
    } else if (valor.length > 4) {
      valor = valor.slice(0, 2) + '/' + valor.slice(2, 4) + '/' + valor.slice(4, 8);
    }

    e.target.value = valor;
  });
}

const camposData = ['dataNascimento', 'dataMenstruacao'];
camposData.forEach(id => {
  const input = document.getElementById(id);
  if (input) {
    aplicarMascaraData(input);
  }
});
