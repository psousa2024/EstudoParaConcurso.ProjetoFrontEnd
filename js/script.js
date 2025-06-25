// Validação do formulário de contato e efeitos interativos
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== VALIDAÇÃO DO FORMULÁRIO =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();

            // Validação de campos obrigatórios
            if (name === '' || email === '' || message === '') {
                showAlert('Por favor, preencha todos os campos obrigatórios (Nome, Email e Mensagem).', 'error');
                return;
            }

            // Validação do nome (mínimo 2 caracteres)
            if (name.length < 2) {
                showAlert('O nome deve ter pelo menos 2 caracteres.', 'error');
                return;
            }

            // Validação do email
            if (!validateEmail(email)) {
                showAlert('Por favor, insira um endereço de e-mail válido.', 'error');
                return;
            }

            // Validação do telefone (se preenchido)
            if (phone !== '' && !validatePhone(phone)) {
                showAlert('Por favor, insira um número de telefone válido.', 'error');
                return;
            }

            // Validação da mensagem (mínimo 10 caracteres)
            if (message.length < 10) {
                showAlert('A mensagem deve ter pelo menos 10 caracteres.', 'error');
                return;
            }

            // Se chegou até aqui, o formulário é válido
            showAlert('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            contactForm.reset();
        });
    }

    // Função para validar email
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Função para validar telefone
    function validatePhone(phone) {
        const re = /^[\(\)\s\-\+\d]{10,}$/;
        return re.test(phone);
    }

    // Função para mostrar alertas customizados
    function showAlert(message, type) {
        // Remove alertas existentes
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Cria novo alerta
        const alertDiv = document.createElement('div');
        alertDiv.className = `custom-alert alert-${type}`;
        alertDiv.innerHTML = `
            <span>${message}</span>
            <button class="alert-close">&times;</button>
        `;

        // Adiciona estilos inline para o alerta
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            max-width: 400px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease-out;
            background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
        `;

        document.body.appendChild(alertDiv);

        // Adiciona evento para fechar o alerta
        const closeBtn = alertDiv.querySelector('.alert-close');
        closeBtn.addEventListener('click', function() {
            alertDiv.remove();
        });

        // Remove automaticamente após 5 segundos
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }

    // ===== EFEITO INTERATIVO 1: ANIMAÇÃO DOS LINKS DE MATERIAIS/SIMULADOS =====
    const listItems = document.querySelectorAll('main ul li a');
    listItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Adiciona efeito visual de clique
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Mostra informações sobre o item clicado
            const itemName = this.textContent;
            const materialType = this.getAttribute('data-material') || this.getAttribute('data-simulado');
            
            if (materialType) {
                showAlert(`Você selecionou: "${itemName}". Funcionalidade em desenvolvimento!`, 'success');
            } else {
                showAlert(`Você clicou em: "${itemName}". Funcionalidade em desenvolvimento!`, 'success');
            }
        });

        // Adiciona efeito de hover mais suave
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'translateX(10px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // ===== EFEITO INTERATIVO 2: CONTADOR DE CARACTERES PARA TEXTAREA =====
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        // Cria contador de caracteres
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.style.cssText = `
            text-align: right;
            font-size: 0.9em;
            color: #666;
            margin-top: -10px;
            margin-bottom: 15px;
        `;
        
        messageTextarea.parentNode.insertBefore(charCounter, messageTextarea.nextSibling);
        
        function updateCharCounter() {
            const currentLength = messageTextarea.value.length;
            const maxLength = 500; // Limite sugerido
            charCounter.textContent = `${currentLength}/${maxLength} caracteres`;
            
            if (currentLength > maxLength * 0.9) {
                charCounter.style.color = '#dc3545';
            } else if (currentLength > maxLength * 0.7) {
                charCounter.style.color = '#ffc107';
            } else {
                charCounter.style.color = '#666';
            }
        }
        
        messageTextarea.addEventListener('input', updateCharCounter);
        updateCharCounter(); // Inicializa o contador
    }

    // ===== EFEITO INTERATIVO 3: ANIMAÇÃO DE ENTRADA DAS SEÇÕES =====
    const sections = document.querySelectorAll('main section');
    
    function animateOnScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.8) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }

    // Inicializa as seções como invisíveis
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Anima na primeira carga
    setTimeout(animateOnScroll, 100);
    
    // Anima durante o scroll
    window.addEventListener('scroll', animateOnScroll);

    // ===== EFEITO INTERATIVO 4: INDICADOR DE PÁGINA ATIVA NA NAVEGAÇÃO =====
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ===== EFEITO INTERATIVO 5: SMOOTH SCROLL PARA LINKS INTERNOS =====
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== ADICIONA ESTILOS CSS PARA ANIMAÇÕES VIA JAVASCRIPT =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .custom-alert {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .alert-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            margin-left: 10px;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .alert-close:hover {
            opacity: 0.7;
        }
    `;
    document.head.appendChild(style);

    console.log('JavaScript carregado com sucesso! Todas as funcionalidades interativas estão ativas.');
});


