// Script para gerenciar header com progresso e contadores estilo Stitch

(function() {
    'use strict';

    // Aguarda o DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        initProgressHeader();
        initCounters();
        updateGestacoesLogic();
    }

    // ===================================================
    // HEADER COM PROGRESSO
    // ===================================================
    
    function initProgressHeader() {
        const header = document.querySelector('.header-progress');
        const progressFill = document.querySelector('.progress-fill');
        const form = document.getElementById('contact-form');
        
        if (!header || !progressFill || !form) return;

        // Atualiza progresso baseado no scroll
        function updateProgress() {
            const formHeight = form.offsetHeight;
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Calcula porcentagem do progresso
            const progress = (scrollPosition / (documentHeight - windowHeight)) * 100;
            progressFill.style.width = Math.min(progress, 100) + '%';
            
            // Mostra/esconde header baseado no scroll
            if (scrollPosition > 100) {
                header.classList.remove('hidden');
            } else {
                header.classList.add('hidden');
            }
        }

        // Atualiza progresso ao rolar
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateProgress();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Progresso inicial
        updateProgress();

        // Botão de voltar
        const backBtn = header.querySelector('.header-back');
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                if (window.history.length > 1) {
                    window.history.back();
                } else {
                    window.location.href = '/';
                }
            });
        }
    }

    // ===================================================
    // CONTADORES (+/-)
    // ===================================================
    
    function initCounters() {
        // Encontra todos os contadores
        const counters = document.querySelectorAll('[data-counter]');
        
        counters.forEach(counterGroup => {
            const input = counterGroup.querySelector('[data-counter-input]');
            const decrementBtn = counterGroup.querySelector('[data-counter-decrement]');
            const incrementBtn = counterGroup.querySelector('[data-counter-increment]');
            const valueDisplay = counterGroup.querySelector('[data-counter-value]');
            
            if (!input || !decrementBtn || !incrementBtn) return;

            // Valor mínimo (padrão 0)
            const min = parseInt(input.getAttribute('min') || 0);
            const max = parseInt(input.getAttribute('max') || 99);

            // Função para atualizar display
            function updateDisplay() {
                const value = parseInt(input.value) || 0;
                if (valueDisplay) {
                    valueDisplay.textContent = value;
                }
                
                // Desabilita botão - se no mínimo
                decrementBtn.disabled = value <= min;
                
                // Desabilita botão + se no máximo
                incrementBtn.disabled = value >= max;
                
                // Dispara evento de mudança
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }

            // Decremento
            decrementBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const currentValue = parseInt(input.value) || 0;
                if (currentValue > min) {
                    input.value = currentValue - 1;
                    updateDisplay();
                }
            });

            // Incremento
            incrementBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const currentValue = parseInt(input.value) || 0;
                if (currentValue < max) {
                    input.value = currentValue + 1;
                    updateDisplay();
                }
            });

            // Atualiza display inicial
            updateDisplay();

            // Atualiza quando valor do input mudar
            input.addEventListener('input', updateDisplay);
        });
    }

    // ===================================================
    // LÓGICA DE GESTAÇÕES
    // ===================================================
    
    function updateGestacoesLogic() {
        const gravidaRadios = document.querySelectorAll('input[name="gravida"]');
        const gestacoesSection = document.getElementById('gestacoes-section');
        
        if (!gravidaRadios.length || !gestacoesSection) return;

        gravidaRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'Sim') {
                    gestacoesSection.style.display = 'block';
                    // Animação suave
                    gestacoesSection.style.animation = 'slideInUp 0.3s ease-out';
                } else {
                    gestacoesSection.style.display = 'none';
                    // Reseta valores
                    const inputs = gestacoesSection.querySelectorAll('input[type="number"]');
                    inputs.forEach(input => {
                        input.value = '0';
                        input.dispatchEvent(new Event('change', { bubbles: true }));
                    });
                }
            });
        });

        // Estado inicial
        const selectedRadio = document.querySelector('input[name="gravida"]:checked');
        if (selectedRadio && selectedRadio.value === 'Sim') {
            gestacoesSection.style.display = 'block';
        } else {
            gestacoesSection.style.display = 'none';
        }

        // Lógica de validação: Gestações >= Partos + Abortos
        const qtdGestacoes = document.getElementById('qtd-gravidez');
        const partoNormal = document.getElementById('parto-normal');
        const cesariana = document.getElementById('cesariana');
        const aborto = document.getElementById('aborto');

        if (qtdGestacoes && partoNormal && cesariana && aborto) {
            function validateGestacoes() {
                const gestacoes = parseInt(qtdGestacoes.value) || 0;
                const pn = parseInt(partoNormal.value) || 0;
                const cs = parseInt(cesariana.value) || 0;
                const ab = parseInt(aborto.value) || 0;
                const total = pn + cs + ab;

                // Se o total de partos/abortos é maior que gestações, ajusta
                if (total > gestacoes) {
                    qtdGestacoes.value = total;
                    const valueDisplay = qtdGestacoes.parentElement.querySelector('[data-counter-value]');
                    if (valueDisplay) {
                        valueDisplay.textContent = total;
                    }
                }

                // Feedback visual
                const gestacoesItem = qtdGestacoes.closest('.counter-item');
                if (gestacoesItem) {
                    if (total > gestacoes) {
                        gestacoesItem.style.borderLeft = '3px solid var(--warning)';
                    } else {
                        gestacoesItem.style.borderLeft = 'none';
                    }
                }
            }

            [partoNormal, cesariana, aborto].forEach(input => {
                input.addEventListener('change', validateGestacoes);
            });
        }
    }

    // ===================================================
    // UTILITÁRIOS
    // ===================================================
    
    // Smooth scroll para seções
    function smoothScrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.querySelector('.header-progress')?.offsetHeight || 0;
            const targetPosition = section.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Expor função global se necessário
    window.smoothScrollToSection = smoothScrollToSection;

})();
