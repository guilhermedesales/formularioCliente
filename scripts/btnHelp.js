 const helpBtn = document.getElementById("helpButton");
  const helpBox = document.getElementById("helpBox");
  const sendBtn = document.getElementById("sendBtn");

  helpBtn.addEventListener("click", () => {
    helpBox.style.display = helpBox.style.display === "none" ? "block" : "none";
  });

  sendBtn.addEventListener("click", () => {
    const selectedFields = Array.from(document.querySelectorAll("input[name='field']:checked"))
      .map(cb => cb.value)
      .join(", ");

    const question = document.getElementById("questionText").value.trim();
    if (!question) {
      alert("Digite sua dúvida antes de enviar.");
      return;
    }

    const msg = `Tenho uma dúvida referente a: ${selectedFields || 'Outro'}.\n\n${question}`;
    const url = `https://wa.me/5521971765131?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  });