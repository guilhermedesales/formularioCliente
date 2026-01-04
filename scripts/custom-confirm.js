// ========================================
// CUSTOM CONFIRM POPUP
// ========================================

/**
 * Exibe um popup de confirmação personalizado
 * @param {string} message - Mensagem a ser exibida
 * @param {string} confirmText - Texto do botão de confirmação (padrão: "Sim")
 * @param {string} cancelText - Texto do botão de cancelamento (padrão: "Não")
 * @returns {Promise<boolean>} - Retorna uma Promise que resolve com true se confirmado, false se cancelado
 */
function customConfirm(
  message,
  confirmText = "Sim, continuar",
  cancelText = "Não, começar novo"
) {
  return new Promise((resolve) => {
    // Remove popup existente se houver
    const existingPopup = document.getElementById("custom-confirm-popup");
    if (existingPopup) {
      existingPopup.remove();
    }

    // Cria overlay
    const overlay = document.createElement("div");
    overlay.id = "custom-confirm-popup";
    overlay.className = "custom-confirm-overlay";

    // Cria container do popup
    const popup = document.createElement("div");
    popup.className = "custom-confirm-popup";

    // Animação de entrada
    setTimeout(() => {
      overlay.classList.add("active");
      popup.classList.add("active");
    }, 10);

    // Ícone
    const icon = document.createElement("div");
    icon.className = "custom-confirm-icon";
    icon.innerHTML = "💾";

    // Mensagem
    const messageDiv = document.createElement("div");
    messageDiv.className = "custom-confirm-message";
    messageDiv.textContent = message;

    // Container de botões
    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "custom-confirm-buttons";

    // Botão Confirmar
    const confirmBtn = document.createElement("button");
    confirmBtn.className = "custom-confirm-btn confirm";
    confirmBtn.innerHTML = `<span>✓</span> ${confirmText}`;
    confirmBtn.onclick = () => {
      closePopup(true);
    };

    // Botão Cancelar
    const cancelBtn = document.createElement("button");
    cancelBtn.className = "custom-confirm-btn cancel";
    cancelBtn.innerHTML = `<span>✕</span> ${cancelText}`;
    cancelBtn.onclick = () => {
      closePopup(false);
    };

    // Função para fechar o popup
    function closePopup(result) {
      overlay.classList.remove("active");
      popup.classList.remove("active");

      setTimeout(() => {
        overlay.remove();
        resolve(result);
      }, 300);
    }

    // Monta o popup
    buttonsDiv.appendChild(confirmBtn);
    buttonsDiv.appendChild(cancelBtn);

    popup.appendChild(icon);
    popup.appendChild(messageDiv);
    popup.appendChild(buttonsDiv);

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Fecha ao clicar no overlay (fora do popup)
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closePopup(false);
      }
    });

    // Foca no botão de confirmar
    setTimeout(() => confirmBtn.focus(), 100);

    // Suporte a teclado
    document.addEventListener("keydown", function handleKeyPress(e) {
      if (e.key === "Escape") {
        closePopup(false);
        document.removeEventListener("keydown", handleKeyPress);
      } else if (e.key === "Enter") {
        closePopup(true);
        document.removeEventListener("keydown", handleKeyPress);
      }
    });
  });
}

// Adiciona estilos CSS dinamicamente
(function addCustomConfirmStyles() {
  if (document.getElementById("custom-confirm-styles")) return;

  const styles = document.createElement("style");
  styles.id = "custom-confirm-styles";
  styles.textContent = `
        .custom-confirm-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            padding: 20px;
            transition: background 0.3s ease;
        }
        
        .custom-confirm-overlay.active {
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(5px);
        }
        
        .custom-confirm-popup {
            background: linear-gradient(145deg, #ffffff, #f8f9fa);
            border-radius: 20px;
            padding: 35px;
            max-width: 480px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            transform: scale(0.7) translateY(-30px);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            text-align: center;
        }
        
        .custom-confirm-popup.active {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
        
        .custom-confirm-icon {
            font-size: 64px;
            margin-bottom: 20px;
            animation: bounce 0.6s ease;
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .custom-confirm-message {
            font-size: 18px;
            color: #2c3e50;
            margin-bottom: 30px;
            line-height: 1.6;
            font-weight: 500;
        }
        
        .custom-confirm-buttons {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }
        
        .custom-confirm-btn {
            flex: 1;
            min-width: 140px;
            padding: 14px 24px;
            border: none;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .custom-confirm-btn span {
            font-size: 18px;
        }
        
        .custom-confirm-btn.confirm {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .custom-confirm-btn.confirm:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
        
        .custom-confirm-btn.confirm:active {
            transform: translateY(0);
        }
        
        .custom-confirm-btn.cancel {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            color: #5a6c7d;
        }
        
        .custom-confirm-btn.cancel:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
        
        .custom-confirm-btn.cancel:active {
            transform: translateY(0);
        }
        
        /* Mobile responsivo */
        @media (max-width: 480px) {
            .custom-confirm-popup {
                padding: 25px;
            }
            
            .custom-confirm-icon {
                font-size: 48px;
            }
            
            .custom-confirm-message {
                font-size: 16px;
            }
            
            .custom-confirm-buttons {
                flex-direction: column;
            }
            
            .custom-confirm-btn {
                width: 100%;
            }
        }
    `;

  document.head.appendChild(styles);
})();

console.log("✅ Custom Confirm Component Loaded");
