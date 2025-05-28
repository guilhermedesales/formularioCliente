document.addEventListener("DOMContentLoaded", function () {
    const alturaInput = document.getElementById("altura");
    const pesoInput = document.getElementById("peso");

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
    });

    // Máscara dinâmica para peso com regra especial
    pesoInput.addEventListener("input", function () {
        let valor = this.value.replace(/[^\d]/g, "");

        if (valor.length === 0) {
            this.value = "";
            return;
        }

        const primeiroDigito = valor.charAt(0);

        if (primeiroDigito === "1" && valor.length > 3) {
            // Ex: 1053 → 105,3kg
            valor = valor.replace(/^(\d{3})(\d).*/, "$1,$2kg");
        } else if (primeiroDigito === "1" && valor.length === 3) {
            // Ex: 105 → 105kg
            valor = valor + "kg";
        } else if (primeiroDigito !== "1" && valor.length > 2) {
            // Ex: 854 → 85,4kg
            valor = valor.replace(/^(\d{2})(\d).*/, "$1,$2kg");
        } else {
            // Ex: 85 → 85kg
            valor = valor + "kg";
        }

        this.value = valor;
    });
});
