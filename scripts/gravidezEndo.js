document.addEventListener('DOMContentLoaded', function () {
  // elementos
  const gravidaRadios = document.querySelectorAll('input[name="gravida"]');
  const gravidezInfo = document.getElementById('gravidez-info');
  const ligaduraInput = document.querySelector('input[name="ligadura tubaria"]');
  const ligaduraGroup = ligaduraInput ? ligaduraInput.closest('.form-group') : null;
  const complicacoes = document.getElementById('complicacoes');
  const complicacoesGroup = complicacoes ? complicacoes.closest('.form-group') : null;

  // helper: habilita/desabilita inputs de um container
  function setContainerEnabled(container, enabled) {
    if (!container) return;
    const controls = container.querySelectorAll('input, select, textarea, button');
    controls.forEach(control => {
      control.disabled = !enabled;

      if (!enabled) {
        control._savedRequired = control.required;
        control.required = false;
      } else {
        control.required = control._savedRequired === true;
      }
    });
  }

  // mostra/oculta campos relacionados à gravidez
  function togglePregnancyFields(show) {
    // bloco principal
    gravidezInfo.style.display = show ? '' : 'none';
    setContainerEnabled(gravidezInfo, show);

    // ligadura tubária
    if (ligaduraGroup) {
      ligaduraGroup.style.display = show ? '' : 'none';
      const radios = ligaduraGroup.querySelectorAll('input[type="radio"]');
      radios.forEach(r => {
        r.disabled = !show;
        if (!show) {
          r._savedRequired = r.required;
          r.required = false;
          r.checked = false;
        } else {
          r.required = r._savedRequired === true;
        }
      });
    }

    // complicações
    if (complicacoesGroup) {
      complicacoesGroup.style.display = show ? '' : 'none';
      setContainerEnabled(complicacoesGroup, show);
      if (!show && complicacoes) {
        complicacoes.value = '';
      }
    }
  }

  // ==========================
  // ESTADO INICIAL (FORÇADO)
  // ==========================
  gravidaRadios.forEach(r => {
    r.checked = false; // nada selecionado
  });

  togglePregnancyFields(false); // começa tudo fechado

  // listeners
  gravidaRadios.forEach(radio => {
    radio.addEventListener('change', function () {
      togglePregnancyFields(this.value.toLowerCase() === 'sim');
    });
  });
});
