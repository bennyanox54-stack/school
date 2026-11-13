const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('open'));
    });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealItems.length) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach(item => revealObserver.observe(item));
} else {
    revealItems.forEach(item => item.classList.add('visible'));
}

const counters = document.querySelectorAll('[data-target]');
counters.forEach(counter => {
    const target = Number(counter.getAttribute('data-target'));
    let count = 0;
    const increment = target / 65;

    const updateCounter = () => {
        count += increment;
        if (count < target) {
            counter.textContent = `${Math.ceil(count)}`;
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };

    updateCounter();
});

const yearNode = document.getElementById('year');
if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Message Sent';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            this.reset();
        }, 2000);
    });
}

const applicationForm = document.getElementById('studentApplicationForm');
const messageBox = document.getElementById('formMessage');

if (applicationForm) {
    applicationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!this.checkValidity()) {
            this.reportValidity();
            return;
        }

        if (messageBox) {
            messageBox.textContent = 'Application submitted successfully! Our admissions team will review it shortly.';
            messageBox.classList.add('visible');
        }

        this.reset();
        document.querySelectorAll('.file-name').forEach(label => {
            label.textContent = 'No file selected';
        });
    });
}

document.querySelectorAll('.file-input').forEach(input => {
    input.addEventListener('change', () => {
        const label = input.parentElement.querySelector('.file-name');
        if (label) {
            label.textContent = input.files && input.files.length ? input.files[0].name : 'No file selected';
        }
    });
});

const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const showPasswordToggle = document.getElementById('showPassword');

if (passwordInput) {
    const passwordChecks = {
        length: document.getElementById('lengthCheck'),
        case: document.getElementById('caseCheck'),
        number: document.getElementById('numberCheck')
    };

    const passwordStrength = document.getElementById('passwordStrength');

    function updatePasswordChecklist() {
        const value = passwordInput.value;
        const hasLength = value.length >= 8;
        const hasUpperLower = /[a-z]/.test(value) && /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);

        const updateItem = (element, condition) => {
            if (!element) return;
            element.classList.toggle('valid', condition);
        };

        updateItem(passwordChecks.length, hasLength);
        updateItem(passwordChecks.case, hasUpperLower);
        updateItem(passwordChecks.number, hasNumber);

        if (!value) {
            passwordStrength.textContent = 'Password must be at least 8 characters.';
            return;
        }

        if (hasLength && hasUpperLower && hasNumber) {
            passwordStrength.textContent = 'Strong password';
        } else if (hasLength || hasUpperLower || hasNumber) {
            passwordStrength.textContent = 'Fair password';
        } else {
            passwordStrength.textContent = 'Weak password';
        }
    }

    passwordInput.addEventListener('input', updatePasswordChecklist);

    if (showPasswordToggle) {
        showPasswordToggle.addEventListener('change', () => {
            const hiddenType = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = hiddenType;
            confirmPasswordInput.type = hiddenType;
        });
    }
}

const registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
    registrationForm.addEventListener('submit', function (event) {
        const formMessage = document.getElementById('formMessage');
        const fullName = this.querySelector('input[name="fullName"]');
        const email = this.querySelector('input[name="email"]');
        const password = this.querySelector('#password');
        const confirmPassword = this.querySelector('#confirmPassword');

        if (!this.checkValidity()) {
            event.preventDefault();
            this.reportValidity();
            return;
        }

        if (!password || !confirmPassword) {
            return;
        }

        const passwordValue = password.value;
        const confirmValue = confirmPassword.value;
        const hasValidLength = passwordValue.length >= 8;
        const hasUpperLower = /[a-z]/.test(passwordValue) && /[A-Z]/.test(passwordValue);
        const hasNumber = /\d/.test(passwordValue);

        if (!hasValidLength || !hasUpperLower || !hasNumber) {
            event.preventDefault();
            if (formMessage) {
                formMessage.textContent = 'Choose a stronger password with 8+ characters, upper/lowercase letters, and a number.';
                formMessage.classList.add('visible');
            }
            return;
        }

        if (passwordValue !== confirmValue) {
            event.preventDefault();
            if (formMessage) {
                formMessage.textContent = 'Passwords do not match. Please re-enter them.';
                formMessage.classList.add('visible');
            }
            return;
        }

        if (this.dataset.serverSubmit === 'true') {
            if (window.location.hostname.endsWith('.github.io')) {
                event.preventDefault();
                if (formMessage) {
                    formMessage.textContent = 'Account creation needs the PHP/MySQL service, which is not available on GitHub Pages.';
                    formMessage.classList.add('visible');
                }
            }
            return;
        }

        if (formMessage) {
            formMessage.textContent = 'Account created successfully! Welcome to WaMUT.';
            formMessage.classList.add('visible');
        }

        this.reset();
        if (showPasswordToggle) {
            showPasswordToggle.checked = false;
            passwordInput.type = 'password';
            confirmPasswordInput.type = 'password';
        }

        if (passwordInput) {
            updatePasswordChecklist();
        }
    });
}

const studentLoginForm = document.getElementById('studentLoginForm');
if (studentLoginForm && window.location.hostname.endsWith('.github.io')) {
    studentLoginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formMessage = document.getElementById('formMessage');
        if (formMessage) {
            formMessage.textContent = 'Student sign-in needs the PHP/MySQL service, which is not available on GitHub Pages.';
            formMessage.classList.add('visible');
        }
    });
}
