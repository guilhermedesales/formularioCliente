const radiosGravidez = document.querySelectorAll('input[name="gravida"]');
const divGravidezInfo = document.getElementById("gravidez-info");

const qtdGravidez = document.getElementById("qtd-gravidez");
const partoNormal = document.getElementById("parto-normal");
const cesariana = document.getElementById("cesariana");
const aborto = document.getElementById("aborto");

radiosGravidez.forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.checked && radio.value === "Sim") {
            divGravidezInfo.style.display = "block";
            // Preenche com valores padrão se estava com "--"
            qtdGravidez.value = qtdGravidez.value === "--" ? "1" : qtdGravidez.value;
            partoNormal.value = partoNormal.value === "--" ? "0" : partoNormal.value;
            cesariana.value = cesariana.value === "--" ? "0" : cesariana.value;
            aborto.value = aborto.value === "--" ? "0" : aborto.value;
        } else if (radio.checked && radio.value === "Não") {
            divGravidezInfo.style.display = "none";
            // Preenche com "--" para evitar campos vazios
            qtdGravidez.value = "--";
            partoNormal.value = "--";
            cesariana.value = "--";
            aborto.value = "--";
        }
    });
});
