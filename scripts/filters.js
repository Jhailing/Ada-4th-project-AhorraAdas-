const profitsTotal = document.getElementById('profits');
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
    const currentFilterDate = getFilterDate();
    dateFilter.value = currentFilterDate == undefined ? today() : currentFilterDate;
    filtersAll();
    showBalance();
})

const showBalance = function () {
    const balance = getBalance();
    expensesTotal.innerHTML = `-$ ${balance.expenses.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    profitsTotal.innerHTML = `+$ ${balance.profits.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    if(balance.total < 0){
        totalBalance.innerHTML = `-$ ${(balance.total * - 1).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    } else{
        totalBalance.innerHTML = `+$ ${balance.total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }
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
    categoryFilter.innerHTML += `<option value="all">Todas</option>`;
    for (let category of categories) {
        categoryFilter.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    }
}

const filtersAll = () => {
    const typeValue = typeFilter.value === 'all' ? undefined : typeFilter.value;
    const categoryValue = categoryFilter.value === 'all' ? undefined : categoryFilter.value;
    const dateValue = dateFilter.value;
    const filterOperations = getFilteredOperations(typeValue, categoryValue, dateValue, orderFilter.value);
    showOperations(filterOperations);
};

toggleFilters.addEventListener('click', swapFilters);
categoryFilter.addEventListener("change", filtersAll);
typeFilter.addEventListener("change", filtersAll);
dateFilter.addEventListener("change", () => {
    saveFilterDate(dateFilter.value);
    filtersAll();
});
orderFilter.addEventListener("change", filtersAll);