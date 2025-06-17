document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = this;

    const nome = document.getElementById("nome").value;
    const jejum = form.querySelector('input[name="jejum"]:checked')?.value || "Não informado";

    const cirurgias = form.querySelector('textarea[name="cirurgias"]').value;
    const complicacoes = form.querySelector('textarea[name="complicacoes"]').value;

    const pressao = form.querySelector('input[name="pressao"]:checked')?.value || "Não informado";
    const diabetes = form.querySelector('input[name="diabete"]:checked')?.value || "Não informado";

    const problemasCardioResp = form.querySelector('textarea[name="problemasCardioResp"]').value;
    const outrosTratamentos = form.querySelector('textarea[name="outrosTratamentos"]').value;
    const alergias = form.querySelector('textarea[name="alergias"]').value;
    const medicacoes = form.querySelector('textarea[name="medicacoes"]').value;
    const proteseDentaria = form.querySelector('textarea[name="proteseDentaria"]').value;

    const exames = form.querySelector('input[name="exames"]:checked')?.value || "Não informado";
    const infoAdicional = form.querySelector('textarea[name="informacao_adicional"]').value || "Nenhuma.";


    const texto = `📄 *Informações Pré–Anestésicas*\n\n` +
`👤 Nome: ${nome}\n` +
`⏳ Jejum de 8h compreendido? ${jejum}\n` +
`🩺 Cirurgias anteriores: ${cirurgias}\n` +
`⚠️ Complicações em anestesias/cirurgias: ${complicacoes}\n` +
`📉 Pressão Alta: ${pressao}\n` +
`🍬 Diabetes: ${diabetes}\n` +
`❤️ Problemas cardíacos/respiratórios: ${problemasCardioResp}\n` +
`🩻 Tratamentos em andamento: ${outrosTratamentos}\n` +
`🌰 Alergias: ${alergias}\n` +
`💊 Medicamentos em uso: ${medicacoes}\n` +
`📑 Exames e risco cirúrgico feitos: ${exames}\n` +
`🦷 Próteses dentárias móveis: ${proteseDentaria}\n` +
`📝 Informações adicionais: ${infoAdicional}`;

    const numeroWhatsApp = "5521936193944"; //5521936193944
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(texto)}`;
    window.open(urlWhatsApp, '_blank');

    form.reset();
});
