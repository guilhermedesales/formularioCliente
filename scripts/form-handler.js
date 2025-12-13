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
    
    // Calcula IMC
    let imc = "";
    if (peso && altura) {
        const pesoNum = parseFloat(peso.replace(',', '.'));
        const alturaNum = parseFloat(altura.replace(',', '.'));
        if (pesoNum > 0 && alturaNum > 0) {
            const imcCalc = (pesoNum / (alturaNum * alturaNum)).toFixed(2);
            imc = ` / IMC: ${imcCalc}`;
        }
    }

    const gravidaSim = document.querySelector('input[name="gravida"]:checked')?.value === "Sim";
    
    let gravidezes = "Gesta 0";
    
    if (gravidaSim) {
        const qtdGravidez = parseInt(document.getElementById('qtd-gravidez')?.value) || 0;
        const partoNormal = parseInt(document.getElementById('parto-normal')?.value) || 0;
        const cesariana = parseInt(document.getElementById('cesariana')?.value) || 0;
        const aborto = parseInt(document.getElementById('aborto')?.value) || 0;
        
        // Calcula Para (partos totais = PN + Cesária)
        const para = partoNormal + cesariana;
        
        // Monta o texto de gestações
        let gestaText = `Gesta ${qtdGravidez} / Para ${para}`;
        
        // Adiciona tipos de parto apenas se houver
        const tipos = [];
        if (partoNormal > 0) tipos.push(`PN ${partoNormal}`);
        if (cesariana > 0) tipos.push(`Cesaria ${cesariana}`);
        if (aborto > 0) tipos.push(`Aborto ${aborto}`);
        
        if (tipos.length > 0) {
            gestaText += ` / ${tipos.join(' / ')}`;
        }
        
        gravidezes = gestaText;
    }

    const cirurgia = document.getElementById("cirurgias").value;
    const medicacao = document.getElementById("medicacao").value;
    const infoAdicional = document.querySelector('textarea[name="informacao_adicional"]')?.value.trim() || "";
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
- DUM: ${ultimaMenstruacao}%0A
- Peso: ${peso} / Altura: ${altura}${imc} %0A
- ${gravidezes}%0A
- Cirurgias anteriores: ${cirurgia}%0A
- ${textoAlergia}%0A
- HPP: ${doenca}%0A
- HF: ${doencafamilia}%0A
- Medicações: ${medicacao}${infoAdicional ? `%0A%0A*Informações Adicionais*%0A%0A ${infoAdicional}` : ''}`;

    const numeroWhatsApp = CONFIG.WHATSAPP_NUMBER;
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${texto}`;
    window.open(urlWhatsApp, '_blank');

});
