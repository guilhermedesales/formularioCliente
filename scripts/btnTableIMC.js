  const btnInfoImc = document.getElementById('btnInfoImc');
  const tabelaImc = document.getElementById('tabelaImc');

  btnInfoImc.addEventListener('click', () => {
    tabelaImc.style.display = tabelaImc.style.display === 'none' ? 'block' : 'none';
  });

