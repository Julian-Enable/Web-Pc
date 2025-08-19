document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const termsCheckbox = document.getElementById('terms');

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

    // Validación de contraseña
    function validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        const errors = [];
        
        if (password.length < minLength) {
            errors.push(`Mínimo ${minLength} caracteres`);
        }
        if (!hasUpperCase) {
            errors.push('Al menos una mayúscula');
        }
        if (!hasLowerCase) {
            errors.push('Al menos una minúscula');
        }
        if (!hasNumbers) {
            errors.push('Al menos un número');
        }
        if (!hasSpecialChar) {
            errors.push('Al menos un carácter especial');
        }
        
        return errors;
    }

    // Validación en tiempo real de contraseña
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const errors = validatePassword(password);
        
        removeError(this);
        
        if (password.length > 0 && errors.length > 0) {
            showError(this, `Requisitos: ${errors.join(', ')}`);
        }
        
        // Validar confirmación de contraseña
        if (confirmPasswordInput.value && password !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'Las contraseñas no coinciden');
        } else if (confirmPasswordInput.value) {
            removeError(confirmPasswordInput);
        }
    });

    // Validación de confirmación de contraseña
    confirmPasswordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const confirmPassword = this.value;
        
        removeError(this);
        
        if (confirmPassword && password !== confirmPassword) {
            showError(this, 'Las contraseñas no coinciden');
        }
    });

    // Validación del formulario
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const terms = termsCheckbox.checked;
        
        // Limpiar errores previos
        [document.getElementById('username'), document.getElementById('email'), passwordInput, confirmPasswordInput].forEach(input => {
            removeError(input);
        });
        
        let isValid = true;
        
        // Validar nombre de usuario
        if (username.length < 3) {
            showError(document.getElementById('username'), 'El nombre de usuario debe tener al menos 3 caracteres');
            isValid = false;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError(document.getElementById('email'), 'Ingresa un email válido');
            isValid = false;
        }
        
        // Validar contraseña
        const passwordErrors = validatePassword(password);
        if (passwordErrors.length > 0) {
            showError(passwordInput, `Requisitos: ${passwordErrors.join(', ')}`);
            isValid = false;
        }
        
        // Validar confirmación de contraseña
        if (password !== confirmPassword) {
            showError(confirmPasswordInput, 'Las contraseñas no coinciden');
            isValid = false;
        }
        
        // Validar términos y condiciones
        if (!terms) {
            showError(termsCheckbox, 'Debes aceptar los términos y condiciones');
            isValid = false;
        }
        
        if (isValid) {
            // Mostrar indicador de carga
            const submitBtn = registerForm.querySelector('.btn-register');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creando cuenta...';
            submitBtn.disabled = true;
            
            // Simular proceso de registro
            setTimeout(() => {
                // Almacenar datos del usuario
                const userData = {
                    username: username,
                    email: email,
                    password: password,
                    createdAt: new Date().toISOString()
                };
                
                localStorage.setItem('user', JSON.stringify(userData));
                
                // Mostrar mensaje de éxito
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.style.cssText = 'background: linear-gradient(135deg, #28a745, #20c997); color: white; padding: 1rem; border-radius: 10px; text-align: center; margin-bottom: 1rem; font-weight: 600;';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> ¡Cuenta creada exitosamente!';
                
                registerForm.insertBefore(successMessage, registerForm.firstChild);
                
                // Redirigir después de 2 segundos
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }, 1500);
        }
    });

    // Validación de email en tiempo real
    document.getElementById('email').addEventListener('blur', function() {
        const email = this.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        removeError(this);
        
        if (email && !emailRegex.test(email)) {
            showError(this, 'Ingresa un email válido');
        }
    });

    // Validación de nombre de usuario en tiempo real
    document.getElementById('username').addEventListener('blur', function() {
        const username = this.value.trim();
        
        removeError(this);
        
        if (username && username.length < 3) {
            showError(this, 'El nombre de usuario debe tener al menos 3 caracteres');
        }
    });
});