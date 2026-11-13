const loginForm = document.querySelector('#staffLoginForm');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const passwordToggle = document.querySelector('#passwordToggle');
const rememberEmail = document.querySelector('[name="remember"]');
const formMessage = document.querySelector('#formMessage');
const savedEmailKey = 'wamut-staff-email';

try {
    const savedEmail = localStorage.getItem(savedEmailKey);
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberEmail.checked = true;
    }
} catch {
    // The form remains usable when browser storage is unavailable.
}

passwordToggle.addEventListener('click', () => {
    const showingPassword = passwordInput.type === 'password';
    passwordInput.type = showingPassword ? 'text' : 'password';
    passwordToggle.textContent = showingPassword ? 'Hide' : 'Show';
    passwordToggle.setAttribute('aria-pressed', String(showingPassword));
});

loginForm.addEventListener('submit', event => {
    event.preventDefault();
    formMessage.classList.remove('show');

    if (!loginForm.reportValidity()) {
        return;
    }

    try {
        if (rememberEmail.checked) {
            localStorage.setItem(savedEmailKey, emailInput.value.trim());
        } else {
            localStorage.removeItem(savedEmailKey);
        }
    } catch {
        // Authentication is not available in this static demo.
    }

    formMessage.textContent = 'This staff portal is not connected to an authentication service yet. Your password was not sent.';
    formMessage.classList.add('show');
});

loginForm.addEventListener('input', () => {
    formMessage.classList.remove('show');
});
