const alturaInput = document.getElementById('altura');
  const pesoInput = document.getElementById('peso');
  const imcInput = document.getElementById('imc');

  function calcularIMC() {
    const altura = parseFloat(alturaInput.value.replace(',', '.'));
    const peso = parseFloat(pesoInput.value.replace(',', '.'));

    if (!isNaN(altura) && !isNaN(peso) && altura > 0) {
      const imc = peso / (altura * altura);
      imcInput.value = imc.toFixed(2); // 2 casas decimais
    } else {
      imcInput.value = '';
    }
  }

  alturaInput.addEventListener('input', calcularIMC);
  pesoInput.addEventListener('input', calcularIMC);