// FILTER BALANCE
const earningsTotal = document.getElementById('earnings');
const expensesTotal = document.getElementById('expenses');
const totalBalance = document.getElementById('total-balance');
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
    let storage = getStorage();
    const operations = storage.operations;

    for (let operation of operations) {
        if (operation.type === "GASTO") {
            sumOfExpenses = sumOfExpenses + parseInt(operation.amount);
            expensesTotal.innerHTML = `$ - ${sumOfExpenses}`;
        } else if (operation.type === "GANANCIA") {
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

const toggleFilters = document.getElementById('toggle-filters');
const filters = document.getElementById('filters');

const swapFilters = ()=>{
    if (toggleFilters.innerHTML === 'Ocultar filtros'){
        toggleFilters.innerHTML = 'Mostrar filtros'
        filters.classList.add('is-hidden')
    } else {
        toggleFilters.innerHTML = 'Ocultar filtros'
        filters.classList.remove('is-hidden')
    }
}
toggleFilters.addEventListener('click', swapFilters);
