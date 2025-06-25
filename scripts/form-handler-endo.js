document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const nomeSocial = document.getElementById("nomeSocial").value.trim();
    const nomeSocialFinal = nomeSocial === "" ? "Não informado" : nomeSocial;

    const dataNascimento = document.getElementById("dataNascimento").value;
    const idade = document.getElementById("idade").value;
    const cor = document.getElementById("cor").value;
    const estadoCivil = document.getElementById("estadoCivil").value;
    const profissao = document.getElementById("profissao").value;

    const cep = document.getElementById("cep").value;
    const rua = document.getElementById("rua").value;
    const numero = document.getElementById("numero").value;
    const bairro = document.getElementById("bairro").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const endereco = `${rua} - ${numero}, ${bairro}, ${cidade} - ${estado}`;

    const email = document.getElementById("email").value;

    const telefones = Array.from(document.querySelectorAll(".telefone"))
        .map((input, index) => `(${index + 1}) ${input.value}`)
        .join(" / ");

    const altura = document.getElementById("altura").value;
    const peso = document.getElementById("peso").value;
    const imc = document.getElementById("imc").value;

    const primeiraMenstruacao = document.getElementById("primeiraMenstruacao").value;
    const primeiraRelacao = document.getElementById("primeiraRelacao").value;

    const gravida = document.querySelector('input[name="gravida"]:checked')?.value === "Sim";
    let gravidezes = "Já esteve grávida: Não";
    if (gravida) {
        const qtdGravidez = document.getElementById("qtd-gravidez").value;
        const partoNormal = document.getElementById("parto-normal").value;
        const cesariana = document.getElementById("cesariana").value;
        const aborto = document.getElementById("aborto").value;

        gravidezes = `Já esteve grávida: Sim%0A- Nº de Gestações: ${qtdGravidez}%0A- Partos Normais: ${partoNormal}%0A- Cesarianas: ${cesariana}%0A- Abortos: ${aborto}`;
    }

    const ligadura = document.querySelector('input[name="ligadura tubaria"]:checked')?.value || "Não informado";

    const complicacoesGestacao = document.getElementById("complicacoes")?.value || "Não informado";
    const cirurgiasGerais = document.getElementById("cirurgias")?.value || "Não informado";

    function getValorRadio(name) {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        return selected ? selected.value : "Não informado";
    }

    function getValorCampoExtra(checkedName, inputName) {
        const value = getValorRadio(checkedName);
        if (value === "Sim") {
            const extraInput = document.querySelector(`input[name="${inputName}"]`);
            return extraInput?.value ? `Sim (${extraInput.value})` : "Sim (não especificado)";
        }
        return value;
    }

    // Doenças simples
    const pressaoAlta = getValorRadio("pressao_alta");
    const diabetes = getValorRadio("diabetes");
    const tireoidismo = getValorRadio("tireoidismo");
    const colesterol = getValorRadio("colesterol");

    // Doenças com descrição extra se "Sim"
    const ist = getValorCampoExtra("ist", "ist_qual");
    const respiratoria = getValorCampoExtra("respiratoria", "respiratoria_qual");
    const cardiaca = getValorCampoExtra("cardiaca", "cardiaca_qual");
    const psiquiatrica = getValorCampoExtra("psiquiatrica", "psiquiatrica_qual");
    const cancer = getValorCampoExtra("cancer", "cancer_qual");

    // Autoimunes
    const autoimunesMarcadas = Array.from(document.querySelectorAll('input[name="autoimune[]"]:checked'))
        .map(cb => cb.value);

    // Verifica se "Outra" foi marcada
    let outraAutoimune = "";
    if (autoimunesMarcadas.includes("Outra")) {
        const descricao = document.querySelector('input[name="autoimune_outra_descricao"]')?.value;
        outraAutoimune = descricao ? ` (Descreve: ${descricao})` : " (não especificada)";
    }

    // Monta texto das autoimunes
    let autoimuneTexto = "Nenhuma";
    if (autoimunesMarcadas.length > 0) {
        autoimuneTexto = autoimunesMarcadas.join(", ");
        if (outraAutoimune) autoimuneTexto += outraAutoimune;
    }

    function getValorRadio(name) {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        return selected ? selected.value : "Não informado";
    }

    function getValorComCampoExtra(radioName, extraInputName) {
        const val = getValorRadio(radioName);
        if (val === "sim" || val === "Sim") {
            const extraInput = document.querySelector(`input[name="${extraInputName}"]`);
            return extraInput && extraInput.value.trim() !== "" ? `${val} (${extraInput.value.trim()})` : val;
        }
        return val;
    }

    // Alergias medicamentosas e látex
    const alergiaMedicamento = getValorRadio("alergia-medicamento");
    const quaisMedicamentos = alergiaMedicamento.toLowerCase() === "sim" ? (document.querySelector('input[name="quais-medicamentos"]')?.value.trim() || "Não especificado") : "Não aplicável";
    const alergiaLatex = getValorRadio("alergia-latex");

    // Fuma ou já fumou
    const fuma = getValorRadio("fuma");
    const parouFumar = (fuma.toLowerCase() === "nao" || fuma.toLowerCase() === "sim") ? (document.querySelector('input[name="parouFumar"]')?.value.trim() || "Não informado") : "Ainda fuma";

    // Intolerância alimentar
    const intolerancia = getValorRadio("intolerancia");
    const descIntolerancia = intolerancia.toLowerCase() === "sim" ? (document.querySelector('input[name="descIntolerancia"]')?.value.trim() || "Não especificado") : "Não aplicável";

    // Hábito de tomar café
    const cafe = getValorRadio("cafe");
    const qtdCafe = cafe.toLowerCase() === "sim" ? (document.querySelector('input[name="qtdCafe"]')?.value.trim() || "Não especificado") : "Não";

    // Uso de medicação
    const medicacao = document.querySelector('textarea[name="Medicação"]')?.value.trim() || "Nenhuma";
    const medicacaoAntes = document.querySelector('textarea[name="MedicaçãoAntes"]')?.value.trim() || "Nenhuma";

    function getCheckboxValue(name) {
        const checkbox = document.querySelector(`input[name="${name}"]`);
        return checkbox && checkbox.checked ? checkbox.value : "Não";
    }

    function getCheckboxWithDetail(checkboxName, detailFieldName) {
        const checked = document.querySelector(`input[name="${checkboxName}"]`)?.checked;
        if (checked) {
            const detail = document.querySelector(`input[name="${detailFieldName}"]`)?.value.trim();
            return detail ? `Sim (${detail})` : "Sim (sem especificação)";
        }
        return "Não";
    }

    function getCheckboxWithTextareaDetail(checkboxName, textareaName) {
        const checked = document.querySelector(`input[name="${checkboxName}"]`)?.checked;
        if (checked) {
            const text = document.querySelector(`textarea[name="${textareaName}"]`)?.value.trim();
            return text ? `Sim (${text})` : "Sim (sem especificação)";
        }
        return "Não";
    }

    // Pegando os valores do histórico familiar
    const hf_pressao_alta = getCheckboxValue("hf_pressao_alta");
    const hf_diabetes = getCheckboxValue("hf_diabetes");
    const hf_endometriose = getCheckboxValue("hf_endometriose");
    const hf_cardiologica = getCheckboxWithDetail("hf_cardiologica", "hf_cardiologica_qual");
    const hf_cancer = getCheckboxWithDetail("hf_cancer_checkbox", "hf_cancer_info");
    const hf_outra = getCheckboxWithTextareaDetail("hf_outra", "hf_outra_descricao");

    // Informação adicional
    const info_adicional = document.querySelector('textarea[name="informacao_adicional"]')?.value.trim() || "Nenhuma informação adicional.";

    const texto = `*Dados Pessoais*%0A%0A
- Nome: ${nome}%0A
- Nome Social: ${nomeSocialFinal}%0A
- Data de Nascimento: ${dataNascimento} (Idade: ${idade})%0A
- Cor: ${cor}%0A
- Estado Civil: ${estadoCivil}%0A
- Profissão: ${profissao}%0A
- CEP: ${cep}%0A
- Endereço: ${endereco}%0A
- E-mail: ${email}%0A
- Telefones: ${telefones}

%0A%0A*Informações Clínicas*%0A%0A
- Altura: ${altura}%0A
- Peso: ${peso}%0A
- IMC: ${imc}%0A
- Primeira Menstruação: ${primeiraMenstruacao} anos%0A
- Primeira Relação Sexual: ${primeiraRelacao} anos%0A
- ${gravidezes}%0A
- Ligadura Tubária: ${ligadura}%0A
- Complicações na gestação/parto/cesariana: ${complicacoesGestacao}%0A
- Cirurgias prévias: ${cirurgiasGerais}

%0A%0A*Doenças Pré-Existentes*%0A%0A
- Pressão Alta: ${pressaoAlta}%0A
- Diabetes: ${diabetes}%0A
- IST: ${ist}%0A
- Doença Respiratória: ${respiratoria}%0A
- Tireoidismo: ${tireoidismo}%0A
- Doença Cardíaca: ${cardiaca}%0A
- Doença Psiquiátrica: ${psiquiatrica}%0A
- Câncer: ${cancer}%0A
- Colesterol Alto: ${colesterol}%0A
- Doença Autoimune: ${autoimuneTexto}

%0A%0A*Outras Informações de Saúde*%0A%0A
- Alergia a medicamentos: ${alergiaMedicamento}${alergiaMedicamento.toLowerCase() === "sim" ? ` (Quais: ${quaisMedicamentos})` : ""}%0A
- Alergia a látex: ${alergiaLatex}%0A
- Fuma ou já fumou: ${fuma}${(fuma.toLowerCase() === "sim" || fuma.toLowerCase() === "nao") && parouFumar ? ` (Parou há: ${parouFumar})` : ""}%0A
- Intolerância alimentar: ${intolerancia}${intolerancia.toLowerCase() === "sim" ? ` (Descrição: ${descIntolerancia})` : ""}%0A
- Hábito de café: ${cafe}${cafe.toLowerCase() === "sim" ? ` (Qtd: ${qtdCafe})` : ""}%0A
- Uso de medicação: ${medicacao}%0A
- Medicamentos utilizados anteriormente: ${medicacaoAntes}

%0A%0A*Histórico Familiar*%0A%0A
- Pressão Alta: ${hf_pressao_alta}%0A
- Diabetes: ${hf_diabetes}%0A
- Endometriose: ${hf_endometriose}%0A
- Doença Cardiológica: ${hf_cardiologica}%0A
- Câncer: ${hf_cancer}%0A
- Outra doença familiar: ${hf_outra}%0A

%0A*Informações Adicionais*%0A%0A${info_adicional}`;


    const numeroWhatsApp = "5521936193944";
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${texto}`;
    window.open(urlWhatsApp, '_blank');
});
