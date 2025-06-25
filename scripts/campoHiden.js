document.addEventListener("DOMContentLoaded", function () {
    const allInputs = document.querySelectorAll("input[type=radio], input[type=checkbox]");

    allInputs.forEach(input => {
        input.addEventListener("change", function () {
            const targetSelector = this.getAttribute("data-show-target");

            if (this.type === "radio") {
                const radios = document.getElementsByName(this.name);
                radios.forEach(radio => {
                    const radioTarget = radio.getAttribute("data-show-target");
                    if (radioTarget) {
                        const element = document.querySelector(radioTarget);
                        if (element) {
                            element.classList.add("hidden");
                        }
                    }
                });

                // Se o radio clicado tem data-show-target e está selecionado, mostra
                if (this.checked && targetSelector) {
                    const target = document.querySelector(targetSelector);
                    if (target) {
                        target.classList.remove("hidden");
                    }
                }

            } else if (this.type === "checkbox" && targetSelector) {
                const target = document.querySelector(targetSelector);
                if (target) {
                    target.classList.toggle("hidden", !this.checked);
                }
            }
        });
    });
});