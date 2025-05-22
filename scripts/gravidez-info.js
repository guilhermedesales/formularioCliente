const radiosGravidez = document.querySelectorAll('input[name="gravida"]');
const divGravidezInfo = document.getElementById("gravidez-info");

const qtdGravidez = document.getElementById("qtd-gravidez");
const partoNormal = document.getElementById("parto-normal");
const cesariana = document.getElementById("cesariana");
const aborto = document.getElementById("aborto");

radiosGravidez.forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.checked && radio.nextSibling.nodeValue.trim() === "Sim") {
            divGravidezInfo.style.display = "block";
        } else if (radio.checked && radio.nextSibling.nodeValue.trim() === "Não") {
            divGravidezInfo.style.display = "none";
            qtdGravidez.value = "";
            partoNormal.value = "";
            cesariana.value = "";
            aborto.value = "";
        }
    });
});
