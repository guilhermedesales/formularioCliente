const radiosMedicamento = document.querySelectorAll('input[name="alergia-medicamento"]');
const divMedicamentoInfo = document.getElementById("medicamento-info");
const inputMedicamentos = divMedicamentoInfo.querySelector('input');

divMedicamentoInfo.style.display = "none"; // Esconde por padrão

radiosMedicamento.forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.checked && radio.nextSibling.nodeValue.trim() === "Sim") {
            divMedicamentoInfo.style.display = "block";
        } else if (radio.checked && radio.nextSibling.nodeValue.trim() === "Não") {
            divMedicamentoInfo.style.display = "none";
            inputMedicamentos.value = "";
        }
    });
});
