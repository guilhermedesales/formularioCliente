document.addEventListener('DOMContentLoaded', function () {
  // elementos
  const gravidaRadios = document.querySelectorAll('input[name="gravida"]');
  const gravidezInfo = document.getElementById('gravidez-info'); // bloco já presente no HTML
  const ligaduraInput = document.querySelector('input[name="ligadura tubaria"]');
  const ligaduraGroup = ligaduraInput ? ligaduraInput.closest('.form-group') : null;
  const complicacoes = document.getElementById('complicacoes');
  const complicacoesGroup = complicacoes ? complicacoes.closest('.form-group') : null;

  // helper: habilita/desabilita todos os inputs dentro de um container
  function setContainerEnabled(container, enabled) {
    if (!container) return;
    const controls = container.querySelectorAll('input, select, textarea, button');
    controls.forEach(control => {
      control.disabled = !enabled;
      // controla required apenas para inputs que originalmente tinham required
      if (!enabled) {
        control._savedRequired = control.required; // salva estado
        control.required = false;
      } else {
        // restaura required salvo (se existir) ou deixa como estava
        control.required = control._savedRequired === true;
      }
    });
  }

  // mostra/oculta e ajusta validação
  function togglePregnancyFields(show) {
    // bloco de gravidez (quantas vezes, tipos de parto) já engloba seus inputs
    gravidezInfo.style.display = show ? '' : 'none';
    setContainerEnabled(gravidezInfo, show);

    // grupo ligadura tubária
    if (ligaduraGroup) {
      ligaduraGroup.style.display = show ? '' : 'none';
      // habilita/desabilita radios e controla required
      const radios = ligaduraGroup.querySelectorAll('input[type="radio"]');
      radios.forEach(r => {
        r.disabled = !show;
        if (!show) {
          r._savedRequired = r.required;
          r.required = false;
          r.checked = false; // opcional: limpa seleção quando escondido
        } else {
          r.required = r._savedRequired === true;
        }
      });
    }

    // campo complicações
    if (complicacoesGroup) {
      complicacoesGroup.style.display = show ? '' : 'none';
      setContainerEnabled(complicacoesGroup, show);
      if (!show && complicacoes) {
        complicacoes.value = ''; // opcional: limpar texto ao esconder
      }
    }
  }

  // inicializa estado conforme opção já marcada (ou esconde por padrão)
  const checked = document.querySelector('input[name="gravida"]:checked');
  togglePregnancyFields(checked && checked.value.toLowerCase() === 'sim');

  // adiciona listeners para mudanças
  gravidaRadios.forEach(radio => {
    radio.addEventListener('change', function () {
      const isSim = this.value.toLowerCase() === 'sim';
      togglePregnancyFields(isSim);
    });
  });
});

