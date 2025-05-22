document.addEventListener("DOMContentLoaded", function () {
    function aplicarMascaraTelefone(input) {
        if (input) {
            IMask(input, {
                mask: '(00) 00000-0000'
            });
        }
    }

    const telefonePrincipal = document.querySelector(".telefone");
    if (telefonePrincipal) {
        telefonePrincipal.placeholder = "(99) 99999-9999";
        aplicarMascaraTelefone(telefonePrincipal);
    }

    const btnAddPhone = document.querySelector(".btn-add-phone");
    if (btnAddPhone) {
        btnAddPhone.addEventListener("click", function () {
            const div = document.createElement("div");
            div.className = "extra-phone-group";

            const input = document.createElement("input");
            input.type = "tel";
            input.className = "telefone";
            input.placeholder = "(99) 99999-9999";

            aplicarMascaraTelefone(input);

            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "btn-remove-phone";
            btn.textContent = "−";

            btn.addEventListener("click", function () {
                div.remove();
            });

            div.appendChild(input);
            div.appendChild(btn);

            const extraPhonesDiv = document.getElementById("extraPhones");
            if (extraPhonesDiv) {
                extraPhonesDiv.appendChild(div);
            }
        });
    }
});
