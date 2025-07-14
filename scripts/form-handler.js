document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = this;
    const formData = new FormData(form);

    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const dataNascISO = document.getElementById("dataNascimento").value;

    const telefones = Array.from(document.querySelectorAll(".telefone"))
        .map((input, index) => `(${index + 1}) ${input.value}`)
        .join(" / ");

    const convenio = document.getElementById("convenio").value;
    const medico = document.getElementById("medico").value;
    const ultimaMenstruacaoISO = document.getElementById("dataMenstruacao").value;

    const peso = document.getElementById("peso").value;
    const altura = document.getElementById("altura").value;

    const gravidaSim = document.querySelector('input[name="gravida"]:checked')?.nextSibling?.nodeValue?.trim() === "Sim";
    const gravidezes = gravidaSim
        ? `Grávida: Sim / Nº de Gestações: ${qtdGravidez.value} / Partos Normais: ${partoNormal.value} / Cesarianas: ${cesariana.value} / Abortos: ${aborto.value}`
        : "Grávida: Não";

    const cirurgia = document.getElementById("cirurgias").value;
    const medicacao = document.getElementById("medicacao").value;
    const infoAdicional = document.querySelector('textarea[name="informacao_adicional"]')?.value.trim() || "Nenhuma informação adicional.";
    console.log("CIRURGIAS:", cirurgia);

    const doenca = document.getElementById("doenca").value;
    const doencafamilia = document.getElementById("doencafamilia").value;

    // alergias
    const temAlergiaMedicamento = document.querySelector('input[name="alergia-medicamento"]:checked')?.value === "sim";
    const alergiaLatex = document.querySelector('input[name="alergia-latex"]:checked')?.value === "sim";

    const quaisMedicamentos = temAlergiaMedicamento
        ? (document.querySelector('input[name="quais-medicamentos"]')?.value.trim() || "")
        : "";

    let textoAlergia = "Alergias: Nenhuma";

    if (temAlergiaMedicamento && quaisMedicamentos && alergiaLatex) {
        textoAlergia = `Alergias: ${quaisMedicamentos} e látex`;
    } else if (temAlergiaMedicamento && quaisMedicamentos) {
        textoAlergia = `Alergias: ${quaisMedicamentos}`;
    } else if (alergiaLatex) {
        textoAlergia = "Alergias: látex";
    }


    const dataNasc = dataNascISO;
    const ultimaMenstruacao = ultimaMenstruacaoISO;

    const texto = `*Informações Pré–Operatórias*%0A%0A
- Nome: ${nome}%0A
- Data de Nascimento: ${dataNasc}%0A
- Idade: ${idade}%0A
- Telefones: ${telefones}%0A
- Convênio: ${convenio}%0A%0A

- Ginecologista: ${medico}%0A
- Última menstruação: ${ultimaMenstruacao}%0A
- Peso: ${peso} / Altura: ${altura} %0A
- ${gravidezes}%0A
- Cirurgias anteriores: ${cirurgia}%0A
- ${textoAlergia}%0A
- HPP: ${doenca}%0A
- HF: ${doencafamilia}%0A
- Medicações: ${medicacao}

%0A%0A*Informações Adicionais*%0A%0A ${infoAdicional}`;

    const numeroWhatsApp = "5521936193944";
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${texto}`;
    window.open(urlWhatsApp, '_blank');

});
