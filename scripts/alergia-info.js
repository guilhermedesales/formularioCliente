const radiosMedicamento = document.querySelectorAll('input[name="alergia-medicamento"]');
const divMedicamentoInfo = document.getElementById("medicamento-info");
const inputMedicamentos = divMedicamentoInfo.querySelector('input[name="quais-medicamentos"]');
const radiosLatex = document.querySelectorAll('input[name="alergia-latex"]');

divMedicamentoInfo.style.display = "none"; // Esconde por padrão

radiosMedicamento.forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.checked && radio.value === "Sim") {
            divMedicamentoInfo.style.display = "block";
            inputMedicamentos.value = ""; // limpa campo
            radiosLatex.forEach(r => r.checked = false); // desmarca alergia-latex
        } else if (radio.checked && radio.value === "Não") {
            divMedicamentoInfo.style.display = "none";
            inputMedicamentos.value = ""; // preenche com --
            radiosLatex.forEach(r => {
                if (r.value === "Não") {
                    r.checked = true; // marca Não em alergia-latex
                } else {
                    r.checked = false;
                }
            });
        }
    });
});
