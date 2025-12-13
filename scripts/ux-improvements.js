// Melhorias de UX e Validações
// Este script adiciona feedback visual e validações aos formulários

(function() {
    'use strict';

    // Aguarda o DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        addLoadingState();
        addFormValidation();
        addAccessibilityFeatures();
        addSmoothScroll();
    }

    // Adiciona loading state ao botão de submit
    function addLoadingState() {
        const form = document.getElementById('contact-form');
        const submitBtn = document.getElementById('submit');
        
        if (!form || !submitBtn) return;

        form.addEventListener('submit', function(e) {
            // Verifica se o formulário é válido antes de mostrar loading
            if (!form.checkValidity()) {
                return;
            }

            // Adiciona classe loading e desabilita o botão
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            // Se houver erro, remove o loading após 10 segundos
            setTimeout(() => {
                if (submitBtn.classList.contains('loading')) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar';
                }
            }, 10000);
        });
    }

    // Adiciona validações customizadas
    function addFormValidation() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        // Validação de CPF (se existir)
        const cpfInput = document.getElementById('cpf');
        if (cpfInput) {
            cpfInput.addEventListener('blur', function() {
                if (this.value && !validarCPF(this.value)) {
                    this.setCustomValidity('CPF inválido');
                    this.reportValidity();
                } else {
                    this.setCustomValidity('');
                }
            });
        }

        // Validação de email
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.setCustomValidity('Email inválido');
                    this.reportValidity();
                } else {
                    this.setCustomValidity('');
                }
            });
        }

        // Validação de data de nascimento (não pode ser futura)
        const dataNascInput = document.getElementById('dataNascimento');
        if (dataNascInput) {
            dataNascInput.addEventListener('blur', function() {
                const data = parseDate(this.value);
                const hoje = new Date();
                
                if (data && data > hoje) {
                    this.setCustomValidity('Data de nascimento não pode ser futura');
                    this.reportValidity();
                } else if (data && (hoje.getFullYear() - data.getFullYear()) > 120) {
                    this.setCustomValidity('Data de nascimento inválida');
                    this.reportValidity();
                } else {
                    this.setCustomValidity('');
                }
            });
        }

        // Feedback visual em tempo real
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.validity.valid) {
                    this.style.borderColor = '';
                }
            });

            input.addEventListener('invalid', function() {
                this.style.borderColor = '#e74c3c';
            });
        });
    }

    // Adiciona recursos de acessibilidade
    function addAccessibilityFeatures() {
        // Adiciona labels visuais para campos obrigatórios
        const requiredInputs = document.querySelectorAll('input[required], textarea[required], select[required]');
        requiredInputs.forEach(input => {
            const label = document.querySelector(`label[for="${input.id}"]`) || 
                         input.closest('label');
            
            if (label && !label.querySelector('.required-indicator')) {
                const indicator = document.createElement('span');
                indicator.className = 'required-indicator';
                indicator.textContent = ' *';
                indicator.style.color = '#e74c3c';
                indicator.setAttribute('aria-label', 'campo obrigatório');
                label.appendChild(indicator);
            }
        });

        // Melhora a navegação por teclado
        const radioGroups = document.querySelectorAll('.radio-group');
        radioGroups.forEach(group => {
            const radios = group.querySelectorAll('input[type="radio"]');
            radios.forEach((radio, index) => {
                radio.addEventListener('keydown', function(e) {
                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                        e.preventDefault();
                        const next = radios[(index + 1) % radios.length];
                        next.focus();
                        next.checked = true;
                    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prev = radios[(index - 1 + radios.length) % radios.length];
                        prev.focus();
                        prev.checked = true;
                    }
                });
            });
        });
    }

    // Adiciona smooth scroll para erros de validação
    function addSmoothScroll() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('invalid', function(e) {
            e.preventDefault();
            
            // Encontra o primeiro campo inválido
            const firstInvalid = form.querySelector(':invalid');
            if (firstInvalid) {
                // Scroll suave até o campo
                firstInvalid.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Foca no campo após o scroll
                setTimeout(() => {
                    firstInvalid.focus();
                }, 500);
            }
        }, true);
    }

    // Funções auxiliares
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, '');
        
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            return false;
        }

        let soma = 0;
        let resto;

        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }

        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }

        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    function parseDate(dateString) {
        if (!dateString) return null;
        
        // Formato dd/mm/yyyy
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);
            return new Date(year, month, day);
        }
        
        return null;
    }

    // Adiciona feedback visual ao salvar nos sheets
    window.addEventListener('load', function() {
        const saveSheetsForms = document.querySelectorAll('form[action*="script.google.com"]');
        saveSheetsForms.forEach(form => {
            const originalSubmit = form.onsubmit;
            form.onsubmit = function(e) {
                const submitBtn = form.querySelector('input[type="submit"], button[type="submit"]');
                if (submitBtn) {
                    submitBtn.classList.add('loading');
                    submitBtn.disabled = true;
                }
                
                if (originalSubmit) {
                    return originalSubmit.call(form, e);
                }
            };
        });
    });

})();
