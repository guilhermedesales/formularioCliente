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

        gravidezes = `Já esteve grávida: Sim / Nº de Gestações: ${qtdGravidez} / Partos Normais: ${partoNormal} / Cesarianas: ${cesariana} / Abortos: ${aborto}`;
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
        outraAutoimune = descricao ? ` (${descricao})` : " (Marcou outra mas não especificou)";
    }

    // Monta texto das autoimunes
    let autoimuneTexto = "Nenhuma";
    if (autoimunesMarcadas.length > 0) {
        const listaFiltrada = autoimunesMarcadas.filter(v => v !== "Outra");
        if (autoimunesMarcadas.includes("Outra")) {
            const descricao = document.querySelector('input[name="autoimune_outra_descricao"]')?.value.trim();
            if (descricao) listaFiltrada.push(descricao);
        }
        if (listaFiltrada.length > 0) {
            autoimuneTexto = listaFiltrada.join(", ");
        }
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
    const alergiaMedicamento = getValorRadio("alergia-medicamento").toLowerCase() === "sim";
    const quaisMedicamentos = alergiaMedicamento
        ? (document.querySelector('input[name="quais-medicamentos"]')?.value.trim() || "")
        : "";

    const alergiaLatex = getValorRadio("alergia-latex").toLowerCase() === "sim";

    let alergiasTexto = "Nenhuma";

    if (alergiaMedicamento && quaisMedicamentos && alergiaLatex) {
        alergiasTexto = `${quaisMedicamentos} e látex`;
    } else if (alergiaMedicamento && quaisMedicamentos) {
        alergiasTexto = quaisMedicamentos;
    } else if (alergiaLatex) {
        alergiasTexto = "látex";
    }


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
- Altura: ${altura} / Peso: ${peso} / IMC: ${imc}%0A
- Primeira Menstruação: ${primeiraMenstruacao} anos%0A
- Primeira Relação Sexual: ${primeiraRelacao} anos%0A
- ${gravidezes}%0A
- Ligadura Tubária: ${ligadura}%0A
- Complicações na gestação/parto/cesariana: ${complicacoesGestacao}%0A
- Cirurgias prévias: ${cirurgiasGerais}

%0A- HPP: ${[
            pressaoAlta.toLowerCase() === "sim" ? "Pressão Alta" : "",
            diabetes.toLowerCase() === "sim" ? "Diabetes" : "",
            ist.toLowerCase().startsWith("sim") ? `IST (${ist.split("(")[1]?.replace(")", "") || "não especificada"})` : "",
            respiratoria.toLowerCase().startsWith("sim") ? `Doença Respiratória (${respiratoria.split("(")[1]?.replace(")", "") || "não especificada"})` : "",
            tireoidismo.toLowerCase() === "hiper" ? "Hipertireoidismo" :
                tireoidismo.toLowerCase() === "hipo" ? "Hipotireoidismo" : "",
            cardiaca.toLowerCase().startsWith("sim") ? `Doença Cardíaca (${cardiaca.split("(")[1]?.replace(")", "") || "não especificada"})` : "",
            psiquiatrica.toLowerCase().startsWith("sim") ? `Doença Psiquiátrica (${psiquiatrica.split("(")[1]?.replace(")", "") || "não especificada"})` : "",
            cancer.toLowerCase().startsWith("sim") ? `Câncer (${cancer.split("(")[1]?.replace(")", "") || "não especificado"})` : "",
            colesterol.toLowerCase() === "sim" ? "Colesterol Alto" : ""
        ].filter(Boolean).join(", ") || "Nenhuma"
        }

%0A- Autoimune: ${autoimuneTexto}

%0A
- Alergias: ${alergiasTexto}%0A
- Fuma ou já fumou: ${fuma}${fuma.toLowerCase() === "sim" && parouFumar ? ` (Parou há: ${parouFumar})` : ""}%0A
- Intolerância alimentar: ${intolerancia}${intolerancia.toLowerCase() === "sim" ? ` (Descrição: ${descIntolerancia})` : ""}%0A
- Hábito de café: ${cafe}${cafe.toLowerCase() === "sim" ? ` (${qtdCafe} vezes ao dia)` : ""}%0A
- Uso de medicação: ${medicacao}%0A
- Medicamentos utilizados anteriormente: ${medicacaoAntes}

%0A- HF: ${[
            hf_pressao_alta.toLowerCase() === "sim" ? "Pressão Alta" : "",
            hf_diabetes.toLowerCase() === "sim" ? "Diabetes" : "",
            hf_endometriose.toLowerCase() === "sim" ? "Endometriose" : "",
            hf_cardiologica.toLowerCase().startsWith("sim") ? `Doença Cardiológica (${hf_cardiologica.split("(")[1]?.replace(")", "") || "não especificada"})` : "",
            hf_cancer.toLowerCase().startsWith("sim") ? `Câncer (${hf_cancer.split("(")[1]?.replace(")", "") || "não especificado"})` : "",
            hf_outra.toLowerCase().startsWith("sim") ? `${hf_outra.split("(")[1]?.replace(")", "") || "não especificada"}` : ""
        ].filter(Boolean).join(", ") || "Nenhuma condição relatada"
        }


%0A%0A*Informações Adicionais*%0A%0A${info_adicional}`;


    const numeroWhatsApp = "5521936193944";
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${texto}`;
    window.open(urlWhatsApp, '_blank');
});
