 const helpBtn = document.getElementById("helpButton");
  const helpBox = document.getElementById("helpBox");
  const sendBtn = document.getElementById("sendBtn");

  helpBtn.addEventListener("click", () => {
    helpBox.style.display = helpBox.style.display === "none" ? "block" : "none";
  });

 sendBtn.addEventListener("click", () => {
  const selectedFields = Array.from(document.querySelectorAll("input[name='field']:checked"))
    .map(cb => cb.value);

  const question = document.getElementById("questionText").value.trim();
  if (!question) {
    alert("Digite sua dúvida antes de enviar.");
    return;
  }

  const message = `Olá! Tenho uma dúvida referente a:\n\n- ${selectedFields.join(';\n- ')};\n\n${question}`;
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = '5521971765131';

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappURL, '_blank');
});
