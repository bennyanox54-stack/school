const checklistItems = document.querySelectorAll('.requirement-checkbox');
const progressValue = document.getElementById('progressValue');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const completionNotice = document.getElementById('completionNotice');
const printButton = document.getElementById('printButton');
const progressRing = document.querySelector('.progress-ring');

function updateProgress() {
    const total = checklistItems.length;
    const checked = [...checklistItems].filter(item => item.checked).length;
    const percent = Math.round((checked / total) * 100);
    const degrees = (percent / 100) * 360;

    progressValue.textContent = `${percent}%`;
    progressBar.style.width = `${percent}%`;
    progressText.textContent = `${checked} of ${total} documents ready`;
    progressRing.style.background = `conic-gradient(#f8d878 0deg ${degrees}deg, rgba(255,255,255,0.18) ${degrees}deg 360deg)`;

    completionNotice.classList.toggle('show', percent === 100);
}

checklistItems.forEach(item => {
    item.addEventListener('change', updateProgress);
});

printButton?.addEventListener('click', () => {
    window.print();
});

updateProgress();
