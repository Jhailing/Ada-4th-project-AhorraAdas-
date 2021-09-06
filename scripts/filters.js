const earningsTotal = document.getElementById('earnings');
const expensesTotal = document.getElementById('expenses');
const totalBalance = document.getElementById('total-balance');
const toggleFilters = document.getElementById('toggle-filters');
const filters = document.getElementById('filters');
const categoryFilter = document.getElementById('filter-category');
const typeFilter = document.getElementById('filter-type');
const dateFilter = document.getElementById('filter-date');
const orderFilter = document.getElementById('filter-order');

window.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    dateFilter.value = today();
    filtersAll();
    showBalance();
})

const showBalance = function () {
    const balance = getBalance();
    expensesTotal.innerHTML = `- $ ${balance.expenses}`;
    earningsTotal.innerHTML = `+ $ ${balance.profits}`;
    totalBalance.innerHTML = `$ ${balance.total}`;
}

const swapFilters = () => {
    if (toggleFilters.innerHTML === 'Ocultar filtros') {
        toggleFilters.innerHTML = 'Mostrar filtros'
        filters.classList.add('is-hidden')
    } else {
        toggleFilters.innerHTML = 'Ocultar filtros'
        filters.classList.remove('is-hidden')
    }
}

const loadCategories = () => {
    const categories = getAllCateries();
    categoryFilter.innerHTML += `<option value="every">Todas</option>`;
    for (let category of categories) {
        categoryFilter.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    }
}

const filtersAll = () => {
    const typeValue = typeFilter.value === 'every' ? undefined : typeFilter.value;
    const categoryValue = categoryFilter.value === 'every' ? undefined : categoryFilter.value;
    const dateValue = dateFilter.value;
    const filterOperations = getFilteredOperations(typeValue, categoryValue, dateValue, orderFilter.value);
    showOperations(filterOperations);
};

toggleFilters.addEventListener('click', swapFilters);
categoryFilter.addEventListener("change", filtersAll);
typeFilter.addEventListener("change", filtersAll);
dateFilter.addEventListener("change", filtersAll);
orderFilter.addEventListener("change", filtersAll);