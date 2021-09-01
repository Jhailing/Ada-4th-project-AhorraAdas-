const earningsTotal = document.getElementById('earnings');
const expensesTotal = document.getElementById('expenses');
const totalBalance = document.getElementById('total-balance');
const toggleFilters = document.getElementById('toggle-filters');
const filters = document.getElementById('filters');
const categoryFilter = document.getElementById('filter-category');
const typeFilter = document.getElementById('filter-type');
const dateFilter = document.getElementById('filter-date');
const orderFilter = document.getElementById('filter-order');
const storage = getStorage();
const operations = storage.operations;

earningsTotal.innerText = "$ 0";
expensesTotal.innerText = "$ 0";
totalBalance.innerText = "$ 0";

document.addEventListener('DOMContentLoaded', () => {
    balance();
})

let sumOfExpenses = 0;
let sumProfit = 0;
let balanceTotal = 0;

const balance = function () {
    for (let operation of operations) {
        if (operation.type === "expense") {
            sumOfExpenses = sumOfExpenses + parseInt(operation.amount);
            expensesTotal.innerHTML = `$ - ${sumOfExpenses}`;
        } else if (operation.type === "profit") {
            sumProfit = sumProfit + parseInt(operation.amount);
            earningsTotal.innerHTML = `$ + ${sumProfit}`;
        }
        balanceTotal = sumProfit - sumOfExpenses;
        totalBalance.innerHTML = `$ ${balanceTotal}`;
    }
    sumOfExpenses = 0;
    sumProfit = 0;
    balanceTotal = 0;
    setStorage(storage);
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
toggleFilters.addEventListener('click', swapFilters);

const loadCategories = () => {
    const storage = getStorage();
    const categories = storage.categories;
    categoryFilter.innerHTML += `<option value="every">Todas</option>`;
    for (let category of categories) {
        categoryFilter.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    }
}

window.addEventListener('load', () => {
    loadCategories();
    dateFilter.value = today();
    filtersAll();
})

const filterOperationsByType = (type, operations) => {
    return operations.filter(element => element.type === type);
}

const filterOperationsByCategory = (idCategory, operations) => {
    return operations.filter((element) => element.category === idCategory);
};

const filterOperationsByDate = (dateValue, operations) => {
    return operations.filter((element) => {
        var d1 = Date.parse(dateValue);
        var d2 = Date.parse(element.date);
        return d1 <= d2;
    });
};

const sortOperations = (operations) => {
    switch(orderFilter.value){
        case 'more-recent':
            return operations.sort((a,b) => (Date.parse(a.date) < Date.parse(b.date)) ? 1 : ((Date.parse(b.date) < Date.parse(a.date)) ? -1 : 0));
        case 'less-recent':
            return operations.sort((a,b) => (Date.parse(a.date) > Date.parse(b.date)) ? 1 : ((Date.parse(b.date) > Date.parse(a.date)) ? -1 : 0));
        case 'greater-amount':
            return operations.sort((a,b) => {
                const aAmount = a.type === 'expense' ? a.amount * -1 : a.amount; 
                const bAmount = b.type === 'expense' ? b.amount * -1 : b.amount; 
                if(parseFloat(aAmount) < parseFloat(bAmount)){
                    return 1;
                } else if (parseFloat(bAmount) < parseFloat(aAmount)){
                    return -1;
                }else{
                    return 0;
                }
            });
        case 'lower-amount':
            return operations.sort((a,b) => {
                const aAmount = a.type === 'expense' ? a.amount * -1 : a.amount; 
                const bAmount = b.type === 'expense' ? b.amount * -1 : b.amount; 
                if(parseFloat(aAmount) > parseFloat(bAmount)){
                    return 1;
                } else if (parseFloat(bAmount) > parseFloat(aAmount)){
                    return -1;
                }else{
                    return 0;
                }
            });
        case 'A/Z':
            return operations.sort((a,b) => (a.description > b.description) ? 1 : ((b.description > a.description) ? -1 : 0));
        case 'Z/A':
            return operations.sort((a,b) => (a.description < b.description) ? 1 : ((b.description < a.description) ? -1 : 0));
    }
};

const filtersAll = () => {
    const typeValue = typeFilter.value;
    const categoryValue = categoryFilter.value;
    const dateValue = dateFilter.value;
    const storage = getStorage();
    let filterOperations = storage.operations;

    if (typeValue !== 'every') {
        filterOperations = filterOperationsByType(typeValue, filterOperations);
    }
    if (categoryValue !== 'every') {
        filterOperations = filterOperationsByCategory(categoryValue, filterOperations);
    }

    filterOperations = filterOperationsByDate(dateValue, filterOperations);

    filterOperations = sortOperations(filterOperations);

    showOperations(filterOperations);
};

categoryFilter.addEventListener("change", filtersAll);
typeFilter.addEventListener("change", filtersAll);
dateFilter.addEventListener("change", filtersAll);
orderFilter.addEventListener("change", filtersAll);
