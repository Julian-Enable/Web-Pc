document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('remember-me');

    // Función para mostrar mensajes de error
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const existingError = formGroup.querySelector('.error-message');
        
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = 'color: #dc3545; font-size: 0.85rem; margin-top: 0.5rem; font-weight: 600;';
        errorDiv.textContent = message;
        
        formGroup.appendChild(errorDiv);
        input.style.borderColor = '#dc3545';
    }

    // Función para remover mensajes de error
    function removeError(input) {
        const formGroup = input.closest('.form-group');
        const existingError = formGroup.querySelector('.error-message');
        
        if (existingError) {
            existingError.remove();
        }
        
        input.style.borderColor = '';
    }

    // Función para mostrar mensaje de éxito
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = 'background: linear-gradient(135deg, #28a745, #20c997); color: white; padding: 1rem; border-radius: 10px; text-align: center; margin-bottom: 1rem; font-weight: 600;';
        successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        
        loginForm.insertBefore(successDiv, loginForm.firstChild);
    }

    // Función para mostrar mensaje de error general
    function showErrorGeneral(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message-general';
        errorDiv.style.cssText = 'background: linear-gradient(135deg, #dc3545, #c82333); color: white; padding: 1rem; border-radius: 10px; text-align: center; margin-bottom: 1rem; font-weight: 600;';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        loginForm.insertBefore(errorDiv, loginForm.firstChild);
    }

    // Validación de email en tiempo real
    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        removeError(this);
        
        if (email && !emailRegex.test(email)) {
            showError(this, 'Ingresa un email válido');
        }
    });

    // Validación de contraseña en tiempo real
    passwordInput.addEventListener('blur', function() {
        const password = this.value;
        
        removeError(this);
        
        if (password && password.length < 6) {
            showError(this, 'La contraseña debe tener al menos 6 caracteres');
        }
    });

    // Manejo del formulario de login
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            
            // Limpiar mensajes previos
            const existingMessages = loginForm.querySelectorAll('.error-message, .success-message, .error-message-general');
            existingMessages.forEach(msg => msg.remove());
            
            // Limpiar errores de campos
            [emailInput, passwordInput].forEach(input => removeError(input));
            
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const rememberMe = rememberMeCheckbox ? rememberMeCheckbox.checked : false;
            
            let isValid = true;
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError(emailInput, 'Ingresa un email válido');
                isValid = false;
            }
            
            // Validar contraseña
            if (password.length < 6) {
                showError(passwordInput, 'La contraseña debe tener al menos 6 caracteres');
                isValid = false;
            }
            
            if (isValid) {
                // Mostrar indicador de carga
                const submitBtn = loginForm.querySelector('.btn-login');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando sesión...';
                submitBtn.disabled = true;
                
                // Simular proceso de login
                setTimeout(() => {
                    // Obtener datos del registro
                    const user = JSON.parse(localStorage.getItem('user'));
                    
                    if (user && user.email === email && user.password === password) {
                        // Guardar estado de "recordarme" si está marcado
                        if (rememberMe) {
                            localStorage.setItem('rememberMe', 'true');
                            localStorage.setItem('rememberedEmail', email);
                        } else {
                            localStorage.removeItem('rememberMe');
                            localStorage.removeItem('rememberedEmail');
                        }
                        
                        // Guardar sesión del usuario
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('currentUser', JSON.stringify({
                            username: user.username,
                            email: user.email,
                            loginTime: new Date().toISOString()
                        }));
                        
                        showSuccess('¡Inicio de sesión exitoso! Redirigiendo...');
                        
                        // Redirigir después de 1.5 segundos
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 1500);
                    } else {
                        // Restaurar botón
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        
                        showErrorGeneral('Correo electrónico o contraseña incorrectos');
                        
                        // Agitar el formulario para indicar error
                        loginForm.style.animation = 'shake 0.5s ease-in-out';
                        setTimeout(() => {
                            loginForm.style.animation = '';
                        }, 500);
                    }
                }, 1500);
            }
        });
    }

    // Cargar email recordado si existe
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberMe = localStorage.getItem('rememberMe');
    
    if (rememberedEmail && rememberMe === 'true' && rememberMeCheckbox) {
        emailInput.value = rememberedEmail;
        rememberMeCheckbox.checked = true;
    }

    // Verificar si ya está logueado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            showSuccess(`¡Bienvenido de vuelta, ${currentUser.username}!`);
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    }

    // Agregar animación de shake para errores
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);

    // Efectos de hover en los botones sociales
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Efecto de click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Mostrar mensaje de funcionalidad no implementada
            const message = document.createElement('div');
            message.style.cssText = 'background: linear-gradient(135deg, #ffc107, #fd7e14); color: white; padding: 0.5rem; border-radius: 8px; text-align: center; margin-top: 1rem; font-size: 0.9rem; font-weight: 600;';
            message.innerHTML = '<i class="fas fa-info-circle"></i> Funcionalidad en desarrollo';
            
            const existingMessage = loginForm.querySelector('.info-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            loginForm.appendChild(message);
            
            setTimeout(() => {
                message.remove();
            }, 3000);
        });
    });
});