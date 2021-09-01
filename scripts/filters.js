const earningsTotal = document.getElementById('earnings');
const expensesTotal = document.getElementById('expenses');
const totalBalance = document.getElementById('total-balance');
const toggleFilters = document.getElementById('toggle-filters');
const filters = document.getElementById('filters');
const categoryFilters = document.getElementById('filter-category');
const typeFilters = document.getElementById('filter-type');
const filtersByDate = document.getElementById('filter-date');
const storage = getStorage();
const operations = storage.operations;

// FILTER BALANCE
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


//Toggle Filters
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


//Category Filters
const loadCategories = () => {
    const storage = getStorage();
    const categories = storage.categories;
    categoryFilters.innerHTML += `<option value="every">Todas</option>`;
    for (let category of categories) {
        categoryFilters.innerHTML += `<option value="${category.name}">${category.name}</option>`;
    }
}
const loadCategoryFilters = (idCategory, operations) => {
    return operations.filter((element) => element.category === idCategory);
};

window.addEventListener('load', () => {
    loadCategories();
    filtersByDate.value = today();
})


//Filters by Type
const loadFiltersByType = (type, operations) => {
    return operations.filter(element => element.type === type);
}

// Date Filters
const dateFilters = (operations, dateValue) => {
    return operations.filter((element) => {
        return dateValue <= new Date(element.dateValue);
    });
};

// Filters
const filtersAll = () => {
    const typeValue = typeFilters.value;
    const categoryValue = categoryFilters.value;
    // const dateFilter = new Date(filtersByDate).value.replace(/-/g, '/');
    const storage = getStorage();
    let filterOperations = storage.operations;

    if (typeValue !== 'every') {
        filterOperations = loadFiltersByType(typeValue, filterOperations);
    }
    if (categoryValue !== 'every') {
        filterOperations = loadCategoryFilters(categoryValue, filterOperations);
    }

    // if (dateFilter !== "") {
    //     const dateValue = new Date(dateFilter);
    //     operations = dateFilters(operations, dateValue);
    //     console.log(operations);
    // }
    showOperations(filterOperations);
};

categoryFilters.addEventListener("change", filtersAll)
typeFilters.addEventListener("change", filtersAll)
