// ========================================
// PAGINATION SYSTEM
// ========================================

let currentPage = 1;
const totalPages = 6;

// DOM Elements
const formPages = document.querySelectorAll(".form-page");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const reviewBtn = document.getElementById("reviewBtn");
const progressBar = document.querySelector(".progress-bar");
const progressSteps = document.querySelectorAll(".progress-step");

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener("DOMContentLoaded", function () {
  initializePage();
  setupNavigationButtons();
  setupConditionalFields();
  setupCounterButtons();
  setupPregnancyToggle();
  setupHelpButton();
  setupReviewModal();
  updateProgressBar();
});

function initializePage() {
  showPage(currentPage);
  updateButtons();
  updateProgressBar();
}

// ========================================
// PAGE NAVIGATION
// ========================================
function showPage(pageNum) {
  // Hide all pages
  formPages.forEach((page) => {
    page.classList.remove("active", "slide-left", "slide-right");
  });

  // Show current page with animation
  const currentPageElement = document.querySelector(`[data-page="${pageNum}"]`);
  if (currentPageElement) {
    currentPageElement.classList.add("active");

    // Add slide animation based on direction
    if (pageNum > currentPage) {
      currentPageElement.classList.add("slide-left");
    } else if (pageNum < currentPage) {
      currentPageElement.classList.add("slide-right");
    }
  }

  // Update current page
  currentPage = pageNum;

  // Update buttons and progress
  updateButtons();
  updateProgressBar();
  updateProgressSteps();

  // Scroll to top smoothly
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function updateButtons() {
  // Previous button
  prevBtn.disabled = currentPage === 1;

  // Next/Review button visibility
  if (currentPage === totalPages) {
    nextBtn.style.display = "none";
    reviewBtn.style.display = "flex";
  } else {
    nextBtn.style.display = "flex";
    reviewBtn.style.display = "none";
  }
}

function updateProgressBar() {
  const progress = ((currentPage - 1) / (totalPages - 1)) * 100;
  progressBar.style.setProperty("--progress-width", `${progress}%`);

  // Update CSS variable for progress bar
  const styleSheet = document.styleSheets[0];
  const progressBarRule = Array.from(styleSheet.cssRules).find(
    (rule) => rule.selectorText === ".progress-bar::before"
  );

  if (progressBarRule) {
    progressBarRule.style.width = `${progress}%`;
  }
}

function updateProgressSteps() {
  progressSteps.forEach((step, index) => {
    const stepNum = index + 1;

    if (stepNum < currentPage) {
      step.classList.add("completed");
      step.classList.remove("active");
    } else if (stepNum === currentPage) {
      step.classList.add("active");
      step.classList.remove("completed");
    } else {
      step.classList.remove("active", "completed");
    }
  });
}

// ========================================
// BUTTON HANDLERS
// ========================================
function setupNavigationButtons() {
  prevBtn.addEventListener("click", function () {
    if (currentPage > 1) {
      showPage(currentPage - 1);
    }
  });

  nextBtn.addEventListener("click", function () {
    if (validateCurrentPage()) {
      if (currentPage < totalPages) {
        showPage(currentPage + 1);
      }
    }
  });

  // Progress step navigation (optional - click on steps to navigate)
  progressSteps.forEach((step, index) => {
    step.addEventListener("click", function () {
      const targetPage = index + 1;
      if (targetPage <= currentPage || validatePagesUpTo(targetPage - 1)) {
        showPage(targetPage);
      }
    });
  });
}

// ========================================
// VALIDATION
// ========================================
function validateCurrentPage() {
  const currentPageElement = document.querySelector(
    `[data-page="${currentPage}"]`
  );
  const requiredInputs = currentPageElement.querySelectorAll("[required]");

  let isValid = true;
  let firstInvalidField = null;

  requiredInputs.forEach((input) => {
    // Check if field is visible (not hidden by conditional logic)
    const isVisible = input.offsetParent !== null;

    if (isVisible) {
      if (input.type === "radio") {
        const radioGroup = currentPageElement.querySelectorAll(
          `[name="${input.name}"]`
        );
        const isChecked = Array.from(radioGroup).some((radio) => radio.checked);

        if (!isChecked) {
          isValid = false;
          if (!firstInvalidField) firstInvalidField = input;
          highlightInvalidField(input);
        }
      } else if (input.type === "checkbox") {
        // Handle checkbox groups if needed
        if (!input.checked) {
          // Only validate if it's a standalone required checkbox
          const checkboxGroup = currentPageElement.querySelectorAll(
            `[name="${input.name}"]`
          );
          if (checkboxGroup.length === 1) {
            isValid = false;
            if (!firstInvalidField) firstInvalidField = input;
            highlightInvalidField(input);
          }
        }
      } else {
        if (!input.value.trim()) {
          isValid = false;
          if (!firstInvalidField) firstInvalidField = input;
          highlightInvalidField(input);
        } else {
          removeInvalidHighlight(input);
        }
      }
    }
  });

  if (!isValid) {
    showValidationMessage();
    if (firstInvalidField) {
      firstInvalidField.scrollIntoView({ behavior: "smooth", block: "center" });
      firstInvalidField.focus();
    }
  }

  return isValid;
}

function validatePagesUpTo(pageNum) {
  for (let i = 1; i <= pageNum; i++) {
    const tempCurrentPage = currentPage;
    currentPage = i;
    const isValid = validateCurrentPage();
    currentPage = tempCurrentPage;

    if (!isValid) return false;
  }
  return true;
}

function highlightInvalidField(field) {
  field.style.borderColor = "#e63946";
  field.style.animation = "shake 0.5s";

  setTimeout(() => {
    field.style.animation = "";
  }, 500);
}

function removeInvalidHighlight(field) {
  field.style.borderColor = "";
}

function showValidationMessage() {
  // Create temporary validation message
  const existingMessage = document.querySelector(".validation-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  const message = document.createElement("div");
  message.className = "validation-message";
  message.innerHTML = `
        <div class="validation-overlay" onclick="this.closest('.validation-message').remove()"></div>
        <div class="validation-box">
            <div class="validation-icon">⚠️</div>
            <h3>Campos Obrigatórios</h3>
            <p>Por favor, preencha todos os campos obrigatórios antes de continuar.</p>
            <button class="validation-btn" onclick="this.closest('.validation-message').remove()">Entendi</button>
        </div>
    `;

  document.body.appendChild(message);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (message.parentNode) {
      message.remove();
    }
  }, 5000);
}

// Add shake animation
const style = document.createElement("style");
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -45%); }
        to { opacity: 1; transform: translate(-50%, -50%); }
    }
`;
document.head.appendChild(style);

// ========================================
// CONDITIONAL FIELDS
// ========================================
function setupConditionalFields() {
  // Handle all radio/checkbox inputs that show/hide fields
  const conditionalTriggers = document.querySelectorAll("[data-show-target]");

  conditionalTriggers.forEach((trigger) => {
    trigger.addEventListener("change", function () {
      const targetSelector = this.getAttribute("data-show-target");
      const targetElement = document.querySelector(targetSelector);

      if (targetElement) {
        if (this.checked) {
          targetElement.style.display = "block";
          targetElement.classList.remove("hidden");

          // Make fields inside required if needed
          const innerInputs = targetElement.querySelectorAll(
            "input, textarea, select"
          );
          innerInputs.forEach((input) => {
            input.setAttribute("data-conditionally-required", "true");
          });
        } else {
          targetElement.style.display = "none";
          targetElement.classList.add("hidden");

          // Clear values and remove required status
          const innerInputs = targetElement.querySelectorAll(
            "input, textarea, select"
          );
          innerInputs.forEach((input) => {
            if (input.type === "checkbox" || input.type === "radio") {
              input.checked = false;
            } else {
              input.value = "";
            }
            input.removeAttribute("data-conditionally-required");
          });
        }
      }
    });
  });

  // Handle radio button groups that should hide fields when other options are selected
  const radioGroups = {};
  conditionalTriggers.forEach((trigger) => {
    if (trigger.type === "radio") {
      const groupName = trigger.name;
      if (!radioGroups[groupName]) {
        radioGroups[groupName] = [];
      }
      radioGroups[groupName].push(trigger);
    }
  });

  // Add change listeners to hide fields when other radios in group are selected
  Object.values(radioGroups).forEach((group) => {
    group.forEach((radio) => {
      const allRadiosInGroup = document.querySelectorAll(
        `input[type="radio"][name="${radio.name}"]`
      );
      allRadiosInGroup.forEach((otherRadio) => {
        otherRadio.addEventListener("change", function () {
          group.forEach((conditionalRadio) => {
            if (conditionalRadio.hasAttribute("data-show-target")) {
              const target = document.querySelector(
                conditionalRadio.getAttribute("data-show-target")
              );
              if (target && !conditionalRadio.checked) {
                target.style.display = "none";
                target.classList.add("hidden");

                // Clear fields
                const innerInputs = target.querySelectorAll(
                  "input, textarea, select"
                );
                innerInputs.forEach((input) => {
                  if (input.type === "checkbox" || input.type === "radio") {
                    input.checked = false;
                  } else {
                    input.value = "";
                  }
                });
              }
            }
          });
        });
      });
    });
  });

  // Special handling for "Outra" checkbox in autoimune section
  const outraCheckbox = document.getElementById("autoimune-outra");
  if (outraCheckbox) {
    outraCheckbox.addEventListener("change", function () {
      const campoOutra = document.getElementById("campo-outra-autoimune");
      if (campoOutra) {
        if (this.checked) {
          campoOutra.style.display = "block";
        } else {
          campoOutra.style.display = "none";
          const input = campoOutra.querySelector("input");
          if (input) input.value = "";
        }
      }
    });
  }

  // Handle alergia medicamento visibility
  const alergiaRadios = document.querySelectorAll(
    'input[name="alergia-medicamento"]'
  );
  alergiaRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      const medicamentoInfo = document.getElementById("medicamento-info");
      if (medicamentoInfo) {
        if (this.value === "sim") {
          medicamentoInfo.style.display = "block";
        } else {
          medicamentoInfo.style.display = "none";
        }
      }
    });
  });
}

// ========================================
// COUNTER BUTTONS
// ========================================
function setupCounterButtons() {
  const counterButtons = document.querySelectorAll(".counter-btn");

  counterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const action = this.getAttribute("data-action");
      const targetId = this.getAttribute("data-target");
      const input = document.getElementById(targetId);

      if (input) {
        let currentValue = parseInt(input.value) || 0;
        const min = parseInt(input.getAttribute("min")) || 0;
        const max = parseInt(input.getAttribute("max")) || Infinity;

        // Check if this counter is limited by gestações
        const isLimited = input.hasAttribute("data-limited");
        const gestacoesInput = document.getElementById("qtd-gravidez");
        const maxGestacoes = gestacoesInput
          ? parseInt(gestacoesInput.value)
          : Infinity;

        if (action === "increase") {
          // If limited, check against gestações total
          if (isLimited) {
            const partoNormal =
              parseInt(document.getElementById("parto-normal").value) || 0;
            const cesariana =
              parseInt(document.getElementById("cesariana").value) || 0;
            const aborto =
              parseInt(document.getElementById("aborto").value) || 0;

            const total = partoNormal + cesariana + aborto;

            // Bloqueia incremento se já atingiu o limite (sem popup)
            if (total >= maxGestacoes) {
              this.style.opacity = "0.5";
              this.style.cursor = "not-allowed";
              return;
            }
          }

          if (currentValue < max) {
            input.value = currentValue + 1;
            animateValue(input);
            updateCounterButtonStates();
          }
        } else if (action === "decrease" && currentValue > min) {
          input.value = currentValue - 1;
          animateValue(input);
          updateCounterButtonStates();
        }
      }
    });
  });

  // Atualizar estados iniciais
  updateCounterButtonStates();
}

function updateCounterButtonStates() {
  const gestacoesInput = document.getElementById("qtd-gravidez");
  const maxGestacoes = gestacoesInput ? parseInt(gestacoesInput.value) : 0;

  const partoNormal =
    parseInt(document.getElementById("parto-normal").value) || 0;
  const cesariana = parseInt(document.getElementById("cesariana").value) || 0;
  const aborto = parseInt(document.getElementById("aborto").value) || 0;
  const total = partoNormal + cesariana + aborto;

  // Atualiza todos os botões de incremento dos contadores limitados
  const limitedButtons = document.querySelectorAll(
    '.counter-btn[data-action="increase"]'
  );
  limitedButtons.forEach((button) => {
    const targetId = button.getAttribute("data-target");
    const input = document.getElementById(targetId);

    if (input && input.hasAttribute("data-limited")) {
      if (total >= maxGestacoes) {
        button.style.opacity = "0.5";
        button.style.cursor = "not-allowed";
      } else {
        button.style.opacity = "1";
        button.style.cursor = "pointer";
      }
    }
  });
}

function animateValue(element) {
  element.style.transform = "scale(1.2)";
  element.style.color = "var(--primary-color)";

  setTimeout(() => {
    element.style.transform = "scale(1)";
  }, 200);
}

// ========================================
// PREGNANCY TOGGLE
// ========================================
function setupPregnancyToggle() {
  const gravidaRadios = document.querySelectorAll('input[name="gravida"]');
  const gravidezInfo = document.getElementById("gravidez-info");

  gravidaRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.value === "Sim") {
        gravidezInfo.style.display = "block";
        // Set initial value to 1 for gestations when opening
        const qtdGravidez = document.getElementById("qtd-gravidez");
        if (qtdGravidez && qtdGravidez.value === "0") {
          qtdGravidez.value = "1";
        }
      } else {
        gravidezInfo.style.display = "none";
        // Reset all counters
        document.getElementById("qtd-gravidez").value = "0";
        document.getElementById("parto-normal").value = "0";
        document.getElementById("aborto").value = "0";
        const complicacoes = document.getElementById("complicacoes");
        if (complicacoes) complicacoes.value = "";
      }
    });
  });
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================
document.addEventListener("keydown", function (e) {
  // Alt + Left Arrow = Previous page
  if (e.altKey && e.key === "ArrowLeft") {
    e.preventDefault();
    if (currentPage > 1) {
      showPage(currentPage - 1);
    }
  }

  // Alt + Right Arrow = Next page
  if (e.altKey && e.key === "ArrowRight") {
    e.preventDefault();
    if (currentPage < totalPages && validateCurrentPage()) {
      showPage(currentPage + 1);
    }
  }
});

// ========================================
// FORM SUBMISSION
// ========================================
// Submit handler removed - handled by form-handler-endo.js

// ========================================
// HELP BUTTON
// ========================================
function setupHelpButton() {
  const helpBtn = document.getElementById("helpButton");
  const helpBox = document.getElementById("helpBox");
  const helpClose = document.getElementById("helpClose");
  const sendHelpBtn = document.getElementById("sendHelpBtn");

  if (helpBtn && helpBox) {
    helpBtn.addEventListener("click", function () {
      const isOpen = helpBox.style.display === "block";
      helpBox.style.display = isOpen ? "none" : "block";
    });

    if (helpClose) {
      helpClose.addEventListener("click", function () {
        helpBox.style.display = "none";
      });
    }

    if (sendHelpBtn) {
      sendHelpBtn.addEventListener("click", function () {
        const selectedFields = Array.from(
          document.querySelectorAll('input[name="field"]:checked')
        ).map((cb) => cb.value);

        const question = document.getElementById("questionText").value.trim();

        if (!question) {
          alert("Por favor, digite sua dúvida antes de enviar.");
          return;
        }

        const message = `Olá! Tenho uma dúvida sobre o formulário de Endometriose:%0A%0ACampos: ${
          selectedFields.join(", ") || "Geral"
        }%0A%0A${question}`;

        // Get phone number from CONFIG if available
        const phoneNumber =
          typeof CONFIG !== "undefined"
            ? CONFIG.WHATSAPP_NUMBER
            : "5511999999999";
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

        window.open(whatsappURL, "_blank");

        // Clear and close
        document.getElementById("questionText").value = "";
        document
          .querySelectorAll('input[name="field"]')
          .forEach((cb) => (cb.checked = false));
        helpBox.style.display = "none";
      });
    }
  }
}

// ========================================
// REVIEW MODAL
// ========================================
function setupReviewModal() {
  const reviewBtn = document.getElementById("reviewBtn");
  const modal = document.getElementById("reviewModal");
  const closeReview = document.getElementById("closeReview");
  const backToEdit = document.getElementById("backToEdit");
  const confirmSubmit = document.getElementById("confirmSubmit");

  if (reviewBtn) {
    reviewBtn.addEventListener("click", function () {
      if (validateCurrentPage()) {
        showReviewModal();
      }
    });
  }

  if (closeReview) {
    closeReview.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }

  if (backToEdit) {
    backToEdit.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }

  if (confirmSubmit) {
    confirmSubmit.addEventListener("click", function (e) {
      // Show loading
      confirmSubmit.disabled = true;
      confirmSubmit.innerHTML =
        '<span style="animation: spin 1s linear infinite;">⏳</span> Enviando...';

      // Close modal
      modal.style.display = "none";

      // Trigger form submission - the form-handler-endo.js will handle it
      setTimeout(() => {
        const form = document.getElementById("contact-form");
        const submitEvent = new Event("submit", {
          bubbles: true,
          cancelable: true,
        });
        form.dispatchEvent(submitEvent);

        // Reset button after a delay
        setTimeout(() => {
          confirmSubmit.disabled = false;
          confirmSubmit.innerHTML = "✓ Confirmar e Enviar";
        }, 3000);
      }, 100);
    });
  }

  // Close modal when clicking outside
  modal?.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

function showReviewModal() {
  const modal = document.getElementById("reviewModal");
  const reviewContent = document.getElementById("reviewContent");

  // Build review content
  const formData = new FormData(document.getElementById("contact-form"));
  let html = "";

  // Section 1: Dados Pessoais
  html += '<div class="review-section">';
  html += "<h3>👤 Dados Pessoais</h3>";
  html += buildReviewItem("Nome", formData.get("Nome"));
  html += buildReviewItem(
    "Nome Social",
    formData.get("Nome Social") || "Não informado"
  );
  html += buildReviewItem(
    "Data de Nascimento",
    formData.get("Data nascimento")
  );
  html += buildReviewItem("Idade", formData.get("Idade"));
  html += buildReviewItem("Cor/Raça", formData.get("Cor"));
  html += buildReviewItem("Estado Civil", formData.get("Estado Civil"));
  html += buildReviewItem("Profissão", formData.get("Profissão"));
  html += "</div>";

  // Section 2: Endereço
  html += '<div class="review-section">';
  html += "<h3>📍 Endereço</h3>";
  html += buildReviewItem("CEP", formData.get("CEP"));
  html += buildReviewItem("Rua", formData.get("Rua"));
  html += buildReviewItem("Número", formData.get("Numero"));
  html += buildReviewItem("Bairro", formData.get("Bairro"));
  html += buildReviewItem("Cidade", formData.get("Cidade"));
  html += buildReviewItem("Estado", formData.get("estado"));
  html += "</div>";

  // Section 3: Contato
  html += '<div class="review-section">';
  html += "<h3>📞 Contato</h3>";
  html += buildReviewItem("E-mail", formData.get("Email"));
  html += buildReviewItem("Telefone Principal", formData.get("Telefone"));
  html += buildReviewItem(
    "Telefone Secundário",
    formData.get("Telefone2") || "Não informado"
  );
  html += buildReviewItem("Como nos conheceu", formData.get("indicação"));
  html += "</div>";

  // Section 4: Informações Médicas
  html += '<div class="review-section">';
  html += "<h3>💙 Informações Médicas</h3>";
  html += buildReviewItem("Altura", formData.get("altura"));
  html += buildReviewItem("Peso", formData.get("peso"));
  html += buildReviewItem("IMC", formData.get("imc"));
  html += buildReviewItem(
    "Primeira Menstruação",
    formData.get("Primeira Menstruação") + " anos"
  );
  html += buildReviewItem(
    "Primeira Relação Sexual",
    formData.get("Primeira Relação") + " anos"
  );

  const gravida = formData.get("gravida");
  if (gravida === "Sim") {
    html += buildReviewItem("Gestações", formData.get("N° Gestações"));
    html += buildReviewItem("Partos Normais", formData.get("Parto Normal"));
    html += buildReviewItem("Cesarianas", formData.get("Cesárea"));
    html += buildReviewItem("Abortos", formData.get("Aborto"));
    const complicacoes = formData.get("Complicações");
    if (complicacoes) {
      html += buildReviewItem("Complicações", complicacoes);
    }
  } else {
    html += buildReviewItem("Já esteve grávida", "Não");
  }

  html += buildReviewItem("Ligadura Tubária", formData.get("ligadura tubaria"));
  html += buildReviewItem("Cirurgias Anteriores", formData.get("Cirurgias"));
  html += "</div>";

  // Section 5: Histórico de Saúde
  html += '<div class="review-section">';
  html += "<h3>🏥 Condições de Saúde</h3>";
  html += buildReviewItem("Pressão Alta", formData.get("pressao_alta"));
  html += buildReviewItem("Diabetes", formData.get("diabetes"));
  html += buildReviewItem("Colesterol Alto", formData.get("colesterol"));
  html += buildReviewItem("Tireoidismo", formData.get("tireoidismo"));

  // IST
  const ist = formData.get("ist");
  if (ist === "Sim") {
    html += buildReviewItem("IST", formData.get("ist_qual") || "Sim");
  } else {
    html += buildReviewItem("IST", "Não");
  }

  // Doença Respiratória
  const respiratoria = formData.get("respiratoria");
  if (respiratoria === "Sim") {
    html += buildReviewItem(
      "Doença Respiratória",
      formData.get("respiratoria_qual") || "Sim"
    );
  } else {
    html += buildReviewItem("Doença Respiratória", "Não");
  }

  // Doença Cardíaca
  const cardiaca = formData.get("cardiaca");
  if (cardiaca === "Sim") {
    html += buildReviewItem(
      "Doença Cardíaca",
      formData.get("cardiaca_qual") || "Sim"
    );
  } else {
    html += buildReviewItem("Doença Cardíaca", "Não");
  }

  // Doença Psiquiátrica
  const psiquiatrica = formData.get("psiquiatrica");
  if (psiquiatrica === "Sim") {
    html += buildReviewItem(
      "Doença Psiquiátrica",
      formData.get("psiquiatrica_qual") || "Sim"
    );
  } else {
    html += buildReviewItem("Doença Psiquiátrica", "Não");
  }

  // Câncer
  const cancer = formData.get("cancer");
  if (cancer === "Sim") {
    html += buildReviewItem("Câncer", formData.get("cancer_qual") || "Sim");
  } else {
    html += buildReviewItem("Câncer", "Não");
  }
  html += "</div>";

  // Section 6: Doenças Autoimunes
  html += '<div class="review-section">';
  html += "<h3>🔬 Doenças Autoimunes</h3>";
  const autoimunes = formData.getAll("autoimune[]");
  if (autoimunes.length > 0) {
    html += buildReviewItem("Doenças Autoimunes", autoimunes.join(", "));
    if (autoimunes.includes("Outra")) {
      const outra = formData.get("autoimune_outra_descricao");
      if (outra) {
        html += buildReviewItem("Especificação", outra);
      }
    }
  } else {
    html += buildReviewItem("Doenças Autoimunes", "Nenhuma");
  }
  html += "</div>";

  // Section 7: Alergias
  html += '<div class="review-section">';
  html += "<h3>💊 Alergias</h3>";
  const alergiaMed = formData.get("alergia-medicamento");
  if (alergiaMed === "sim") {
    const medicamentos = formData.get("quais-medicamentos");
    html += buildReviewItem("Medicamentos", medicamentos || "Não especificado");
    html += buildReviewItem(
      "Látex",
      formData.get("alergia-latex") === "sim" ? "Sim" : "Não"
    );
  } else {
    html += buildReviewItem("Alergias", "Não possui");
  }
  html += "</div>";

  // Section 8: Histórico Familiar
  html += '<div class="review-section">';
  html += "<h3>👨‍👩‍👧‍👦 Histórico Familiar</h3>";
  const hfList = [];
  if (formData.get("hf_pressao_alta")) hfList.push("Pressão Alta");
  if (formData.get("hf_diabetes")) hfList.push("Diabetes");
  if (formData.get("hf_endometriose")) hfList.push("Endometriose");
  if (formData.get("hf_cardiologica")) {
    const qual = formData.get("hf_cardiologica_qual");
    hfList.push("Doença Cardiológica" + (qual ? " (" + qual + ")" : ""));
  }
  if (formData.get("hf_cancer_checkbox")) {
    const info = formData.get("hf_cancer_info");
    hfList.push("Câncer" + (info ? " - " + info : ""));
  }
  if (formData.get("hf_outra")) {
    const desc = formData.get("hf_outra_descricao");
    if (desc) hfList.push(desc);
  }
  html += buildReviewItem(
    "Condições Familiares",
    hfList.length > 0 ? hfList.join("; ") : "Nenhuma"
  );
  html += "</div>";

  // Section 9: Hábitos
  html += '<div class="review-section">';
  html += "<h3>🚬 Hábitos e Medicamentos</h3>";
  const fuma = formData.get("fuma");
  if (fuma === "sim") {
    const parou = formData.get("parouFumar");
    html += buildReviewItem(
      "Tabagismo",
      "Já fumou" + (parou ? " - parou há " + parou : "")
    );
  } else if (fuma === "ainda fuma") {
    html += buildReviewItem("Tabagismo", "Fuma atualmente");
  } else {
    html += buildReviewItem("Tabagismo", "Nunca fumou");
  }

  const intolerancia = formData.get("intolerancia");
  if (intolerancia === "sim") {
    html += buildReviewItem(
      "Intolerância Alimentar",
      formData.get("descIntolerancia") || "Sim"
    );
  } else {
    html += buildReviewItem("Intolerância Alimentar", "Não");
  }

  const cafe = formData.get("cafe");
  if (cafe === "sim") {
    html += buildReviewItem("Café", formData.get("qtdCafe") || "Sim");
  } else {
    html += buildReviewItem("Café", "Não");
  }

  html += buildReviewItem(
    "Medicações Atuais",
    formData.get("Medicação") || "Nenhuma"
  );
  html += buildReviewItem(
    "Medicações Anteriores",
    formData.get("MedicaçãoAntes") || "Nenhuma"
  );
  html += "</div>";

  // Section 10: Informações Adicionais
  const infoAdicional = formData.get("informacao_adicional");
  if (infoAdicional) {
    html += '<div class="review-section">';
    html += "<h3>ℹ️ Informações Adicionais</h3>";
    html += buildReviewItem("Observações", infoAdicional);
    html += "</div>";
  }

  reviewContent.innerHTML = html;
  modal.style.display = "flex";
}

function buildReviewItem(label, value) {
  if (!value || value === "undefined") return "";
  return `
        <div class="review-item">
            <div class="review-label">${label}:</div>
            <div class="review-value">${value}</div>
        </div>
    `;
}

// Reset form after successful submission
function resetFormToStart() {
  // Clear all form fields
  document.getElementById("contact-form").reset();

  // Reset counters
  document.getElementById("qtd-gravidez").value = "0";
  document.getElementById("parto-normal").value = "0";
  document.getElementById("cesariana").value = "0";
  document.getElementById("aborto").value = "0";

  // Hide conditional sections
  document.querySelectorAll(".hidden").forEach((el) => {
    el.style.display = "none";
    el.classList.add("hidden");
  });

  const gravidezInfo = document.getElementById("gravidez-info");
  if (gravidezInfo) gravidezInfo.style.display = "none";

  // Go back to page 1
  showPage(1);

  // Show success message
  showSuccessMessage();
}

function showSuccessMessage() {
  const message = document.createElement("div");
  message.className = "success-message-overlay";
  message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 10001;
            text-align: center;
            max-width: 500px;
            animation: bounceIn 0.5s;
        ">
            <div style="font-size: 80px; margin-bottom: 20px; animation: bounce 1s ease infinite;">🎉</div>
            <h2 style="color: #06d6a0; margin-bottom: 15px; font-size: 28px;">Formulário Enviado!</h2>
            <p style="color: #6c757d; font-size: 16px; margin-bottom: 25px;">
                Suas informações foram enviadas com sucesso. Em breve entraremos em contato!
            </p>
            <button onclick="this.closest('.success-message-overlay').remove()" style="
                background: linear-gradient(135deg, #06d6a0, #05b587);
                color: white;
                border: none;
                padding: 15px 40px;
                border-radius: 10px;
                cursor: pointer;
                font-weight: 600;
                font-size: 16px;
                box-shadow: 0 5px 15px rgba(6, 214, 160, 0.3);
            ">Fechar</button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 10000;
        " onclick="this.closest('.success-message-overlay').remove()"></div>
    `;

  document.body.appendChild(message);

  setTimeout(() => {
    if (message.parentNode) {
      message.remove();
    }
  }, 5000);
}

// Export function for form-handler to call after successful submission
window.resetFormAfterSubmit = resetFormToStart;

// ========================================
// AUTO-SAVE (Optional - saves to localStorage)
// ========================================
function autoSaveForm() {
  const formData = new FormData(document.getElementById("contact-form"));
  const data = {};

  for (let [key, value] of formData.entries()) {
    if (data[key]) {
      if (Array.isArray(data[key])) {
        data[key].push(value);
      } else {
        data[key] = [data[key], value];
      }
    } else {
      data[key] = value;
    }
  }

  localStorage.setItem("endoFormDraft", JSON.stringify(data));
  localStorage.setItem("endoFormPage", currentPage);
}

async function loadSavedForm() {
  const savedData = localStorage.getItem("endoFormDraft");
  const savedPage = localStorage.getItem("endoFormPage");

  if (savedData) {
    const data = JSON.parse(savedData);

    // Ask user if they want to restore
    const shouldRestore = await customConfirm(
      "Encontramos um rascunho salvo. Deseja continuar de onde parou?"
    );
    if (shouldRestore) {
      Object.keys(data).forEach((key) => {
        const elements = document.querySelectorAll(`[name="${key}"]`);
        elements.forEach((element) => {
          if (element.type === "checkbox" || element.type === "radio") {
            if (Array.isArray(data[key])) {
              element.checked = data[key].includes(element.value);
            } else {
              element.checked = element.value === data[key];
            }
          } else {
            element.value = data[key];
          }
        });
      });

      if (savedPage) {
        showPage(parseInt(savedPage));
      }
    } else {
      localStorage.removeItem("endoFormDraft");
      localStorage.removeItem("endoFormPage");
    }
  }
}

// Auto-save every 30 seconds
setInterval(autoSaveForm, 30000);

// Save on page unload
window.addEventListener("beforeunload", autoSaveForm);

// Load saved data on page load
window.addEventListener("load", function () {
  setTimeout(loadSavedForm, 500);
});

// Clear saved data on successful submission
document.getElementById("contact-form").addEventListener("submit", function () {
  localStorage.removeItem("endoFormDraft");
  localStorage.removeItem("endoFormPage");
});

console.log("✅ Endometriose Form Pagination System Loaded");
