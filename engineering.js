const searchInput = document.querySelector('#programSearch');
const disciplineFilter = document.querySelector('#disciplineFilter');
const clearFiltersButton = document.querySelector('#clearFilters');
const programCards = [...document.querySelectorAll('[data-program]')];
const resultCount = document.querySelector('#resultCount');
const emptyState = document.querySelector('#emptyState');

function filterPrograms() {
    const searchTerm = searchInput.value.trim().toLocaleLowerCase();
    const selectedDiscipline = disciplineFilter.value;
    let visiblePrograms = 0;

    programCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLocaleLowerCase();
        const matchesSearch = title.includes(searchTerm);
        const matchesDiscipline = selectedDiscipline === 'all' || card.dataset.discipline === selectedDiscipline;
        const isVisible = matchesSearch && matchesDiscipline;

        card.hidden = !isVisible;
        visiblePrograms += Number(isVisible);
    });

    resultCount.textContent = `Showing ${visiblePrograms} programme${visiblePrograms === 1 ? '' : 's'}`;
    emptyState.hidden = visiblePrograms > 0;
}

searchInput.addEventListener('input', filterPrograms);
disciplineFilter.addEventListener('change', filterPrograms);

clearFiltersButton.addEventListener('click', () => {
    searchInput.value = '';
    disciplineFilter.value = 'all';
    filterPrograms();
    searchInput.focus();
});

document.querySelectorAll('.details-button').forEach(button => {
    button.addEventListener('click', () => {
        const details = document.getElementById(button.getAttribute('aria-controls'));
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        button.setAttribute('aria-expanded', String(!isExpanded));
        details.hidden = isExpanded;
        button.lastElementChild.textContent = isExpanded ? '+' : '\u2212';
    });
});
