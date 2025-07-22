document.addEventListener("DOMContentLoaded", function () {
    const alturaInput = document.getElementById("altura");
    const pesoInput = document.getElementById("peso");
    const imcInput = document.getElementById("imc");

    // Máscara para altura no formato #.##m
    alturaInput.addEventListener("input", function () {
        let valor = this.value.replace(/[^\d]/g, "");

        if (valor.length >= 3) {
            valor = valor.replace(/^(\d)(\d{2}).*/, "$1.$2m");
        } else if (valor.length === 2) {
            valor = valor.replace(/^(\d)(\d)/, "$1.$2m");
        } else if (valor.length === 1) {
            valor = valor + ".";
        }

        this.value = valor;

        setTimeout(calcularIMC, 0);
    });


    pesoInput.addEventListener("input", function () {
        let valor = this.value.replace(/[^\d]/g, "");
        let valorFormatado = "";
        let valorNumerico = "";

        if (valor.length === 0) {
            this.value = "";
            setTimeout(calcularIMC, 0);
            return;
        }

        const primeiroDigito = valor.charAt(0);

        if (primeiroDigito === "1" && valor.length > 3) {

            valorFormatado = valor.replace(/^(\d{3})(\d).*/, "$1,$2kg");
            valorNumerico = valor.replace(/^(\d{3})(\d).*/, "$1.$2");
        } else if (primeiroDigito === "1" && valor.length === 3) {
            valorFormatado = valor + "kg";
            valorNumerico = valor;
        } else if (primeiroDigito !== "1" && valor.length > 2) {

            valorFormatado = valor.replace(/^(\d{2})(\d).*/, "$1,$2kg");
            valorNumerico = valor.replace(/^(\d{2})(\d).*/, "$1.$2");
        } else {

            valorFormatado = valor + "kg";
            valorNumerico = valor;
        }

        this.value = valorFormatado;
        this.dataset.valorNumerico = valorNumerico;

        setTimeout(calcularIMC, 0); // garante cálculo após máscara
    });

    function calcularIMC() {

        let alturaStr = alturaInput.value.replace(/[^\d.,]/g, '').replace(',', '.');

        const altura = parseFloat(alturaStr);
        const pesoStr = pesoInput.dataset.valorNumerico || "";
        const peso = parseFloat(pesoStr);

        if (!isNaN(altura) && !isNaN(peso) && altura > 0) {
            const imc = peso / (altura * altura);
            imcInput.value = imc.toFixed(2);
        } else {
            imcInput.value = '';
        }
    }
});
