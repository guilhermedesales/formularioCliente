const checkboxOutra = document.getElementById("autoimune-outra");
const campoOutra = document.getElementById("campo-outra-autoimune");
const inputOutra = campoOutra.querySelector(
  'input[name="autoimune_outra_descricao"]'
);

checkboxOutra.addEventListener("change", () => {
  campoOutra.style.display = checkboxOutra.checked ? "block" : "none";

  // Torna obrigatório quando marcado
  if (checkboxOutra.checked) {
    inputOutra.setAttribute("required", "required");
  } else {
    inputOutra.removeAttribute("required");
    inputOutra.value = ""; // Limpa o campo
  }
});
