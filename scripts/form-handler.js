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
    const ultimaMenstruacaoISO = document.querySelectorAll("input[type='date']")[1].value;

    const peso = document.getElementById("peso").value;
    const altura = document.getElementById("altura").value;

    const gravidaSim = document.querySelector('input[name="gravida"]:checked')?.nextSibling?.nodeValue?.trim() === "Sim";
    const gravidezes = gravidaSim
        ? `Grávida: Sim (%0A- Número de Gestações: ${qtdGravidez.value}%0A- Partos Normais: ${partoNormal.value}%0A- Cesarianas: ${cesariana.value}%0A- Abortos: ${aborto.value})`
        : "Grávida: Não";

   const cirurgia = document.getElementById("cirurgias").value;
    const medicacao = document.querySelectorAll("textarea")[0].value;
    const infoAdicional = document.querySelectorAll("textarea")[1].value;
    console.log("CIRURGIAS:", cirurgia);

    // alergias
    const temAlergia = document.querySelector('input[name="alergia-medicamento"]:checked')?.value === "sim";
    let textoAlergia = "Alergias: Não";
    if (temAlergia) {
        const quaisMedicamentos = document.querySelector('input[name="quais-medicamentos"]').value || "Não informado";
        const alergiaLatex = document.querySelector('input[name="alergia-latex"]:checked')?.value === "sim" ? "Sim" : "Não";
        textoAlergia = `Alergias: Sim (%0A- Medicamentos: ${quaisMedicamentos}%0A- Látex: ${alergiaLatex})`;
    }

    const dataNasc = formatarDataBrasileira(dataNascISO);
    const ultimaMenstruacao = formatarDataBrasileira(ultimaMenstruacaoISO);

    const texto = `📄 *Informações Pré–Operatórias*%0A
👤 Nome: ${nome}%0A
🎂 Data de Nascimento: ${dataNasc}%0A
📆 Idade: ${idade}%0A
📞 Telefones: ${telefones}%0A
🏥 Convênio: ${convenio}%0A
👨‍⚕️ Médico Solicitante: ${medico}%0A
🩸 Última menstruação: ${ultimaMenstruacao}%0A
⚖️ Peso: ${peso} %0A📏 Altura: ${altura} %0A
🤰 ${gravidezes}%0A
🩺 Cirurgias anteriores: ${cirurgia}%0A
⚠️ ${textoAlergia}%0A
💊 Medicações: ${medicacao}%0A
📝 Informações adicionais: ${infoAdicional}`;

    const numeroWhatsApp = "5521971765131";
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${texto}`;
    window.open(urlWhatsApp, '_blank');

    /* desativado por enquanto
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                alert("Formulário enviado com sucesso!");
                form.reset();
                document.getElementById("idade").value = "";
                document.getElementById("gravidez-info").style.display = "none";
            } else {
                alert("Erro ao enviar dados para o Google Sheets");
            }
        })
        .catch(error => {
            alert("Erro de conexão com o Google Sheets");
        });*/
});
