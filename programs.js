const filterButtons = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        filterButtons.forEach(btn => btn.classList.toggle('active', btn === button));

        courseCards.forEach(card => {
            const matches = filter === 'all' || card.dataset.category === filter;
            card.classList.toggle('hidden', !matches);
        });
    });
});

const learningButtons = document.querySelectorAll('.learn-btn');
learningButtons.forEach(button => {
    button.addEventListener('click', () => {
        const courseName = button.closest('.course-card')?.querySelector('h2')?.textContent || 'this programme';
        alert(`You selected ${courseName}. You will be redirected to the course details page.`);
    });
});
