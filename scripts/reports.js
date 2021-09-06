const sectionWithReports = document.getElementById('with-reports');
const sectionNoReports = document.getElementById('no-reports');
const highestProfitCategorySpan = document.getElementById('highest-profit-category');
const highestProfitCategoryAmountSpan = document.getElementById('highest-profit-category-amount');
const highestExpenseCategorySpan = document.getElementById('highest-expense-category');
const highestExpenseCategoryAmountSpan = document.getElementById('highest-expense-category-amount');
const highestBalanceCategorySpan = document.getElementById('highest-balance-category');
const highestBalanceCategoryAmountSpan = document.getElementById('highest-balance-category-amount');
const highestProfitMonthSpan = document.getElementById('highest-profit-month');
const highestProfitMonthAmountSpan = document.getElementById('highest-profit-month-amount');
const highestExpenseMonthSpan = document.getElementById('highest-expense-month');
const highestExpenseMonthAmountSpan = document.getElementById('highest-expense-month-amount');

const totalsByCategoriesDiv = document.getElementById('totals-by-categories');
const totalsByMonthDiv = document.getElementById('totals-by-month');

window.addEventListener('load', () =>{
    loadReport();
    totalsByCategory();
    totalsByMonth();
})

const getProfitCategories = () => {
    const storage = getStorage();
    var profitCategories = {};
    for(let op of storage.operations){
        if(op.type === 'profit'){
            const value = profitCategories[op.category];
            if(value === undefined){
                profitCategories[op.category] = parseFloat(op.amount);
            }else{
                profitCategories[op.category] += parseFloat(op.amount);
            }
        }
    }
    return profitCategories
}

const getExpenseCategories = () => {
    const storage = getStorage();
    var expenseCategories = {};
    for(let op of storage.operations){
        if(op.type === 'expense'){
            const value = expenseCategories[op.category];
            if(value === undefined){
                expenseCategories[op.category] = parseFloat(op.amount);
            }else{
                expenseCategories[op.category] += parseFloat(op.amount);
            }
        }   
    }
    return expenseCategories;
}

const getBalanceCategories = () =>{
    const storage = getStorage();
    var balanceCategories = {};
    for(let op of storage.operations){
        let balanceCategoryValue = balanceCategories[op.category];
        if (balanceCategoryValue == undefined){
            balanceCategoryValue = 0;
        }
        if(op.type === 'profit'){
            balanceCategoryValue += parseFloat(op.amount);            
        }else{
            balanceCategoryValue -= parseFloat(op.amount);
        }
        balanceCategories[op.category] = balanceCategoryValue;
    }
    return balanceCategories;
}

const getProfitMonths = () =>{
    const storage = getStorage();
    var profitMonth = {};
    for(let op of storage.operations){
        if(op.type === 'profit'){
            const month = op.date.substring(0, 7);
            const valueMonth = profitMonth[month];
            if(valueMonth === undefined){
                profitMonth[month] = parseFloat(op.amount);
            }else{
                profitMonth[month] += parseFloat(op.amount);
            }
        }
    }
    return profitMonth;
}

const getExpenseMonths = () =>{
    const storage = getStorage();
    var expenseMonth = {};
    for(let op of storage.operations){
        if(op.type === 'expense'){
            const month = op.date.substring(0, 7);
            const valueMonth = expenseMonth[month];
            if(valueMonth === undefined){
                expenseMonth[month] = parseFloat(op.amount);
            }else{
                expenseMonth[month] += parseFloat(op.amount);
            }
        }
    }
    return expenseMonth;
}

const getOperationMonths = () => {
    const storage = getStorage();
    var months = [];
    for(let op of storage.operations){
        const month = op.date.substring(0, 7);
        if(!months.includes(month)){
            months.push(month);
        }
    }
    return months;
}

const loadReport = () => {
    const storage = getStorage();
    var profitCategories = getProfitCategories();
    var expenseCategories = getExpenseCategories();
    var balanceCategories = getBalanceCategories();
    var profitMonth = getProfitMonths();
    var expenseMonth = getExpenseMonths();

    if(Object.keys(profitCategories).length > 0 && Object.keys(expenseCategories).length > 0){
        sectionWithReports.classList.remove('is-hidden');
        sectionNoReports.classList.add('is-hidden');
    }else{
        return;
    }
    
    let highestProfitCategoryId;
    let highestProfitCategoryAmount = 0;
    for(const key in profitCategories){
        const profitCategoryAmount = profitCategories[key];
        if(profitCategoryAmount > highestProfitCategoryAmount){
            highestProfitCategoryId = key;
            highestProfitCategoryAmount = profitCategoryAmount;
        }
    }

    let highestExpenseCategoryId;
    let highestExpenseCategoryAmount = 0;
    for(const key in expenseCategories){
        const expenseCategoryAmount = expenseCategories[key];
        if(expenseCategoryAmount > highestExpenseCategoryAmount){
            highestExpenseCategoryId = key;
            highestExpenseCategoryAmount = expenseCategoryAmount;
        }
    }

    let highestBalanceCategoryId;
    let highestBalanceCategoryAmount;
    for(const key in balanceCategories){
        const balanceCategoryAmount = balanceCategories[key];
        if(balanceCategoryAmount > highestBalanceCategoryAmount || highestBalanceCategoryAmount == undefined){

            highestBalanceCategoryId = key;
            highestBalanceCategoryAmount = balanceCategoryAmount;
        }
    }

    let highestProfitByMonth;
    let highestProfitAmountByMonth = 0;
    for(const key in profitMonth){
        const profitAmountByMonth = profitMonth[key];
        if(profitAmountByMonth > highestProfitAmountByMonth){
            highestProfitByMonth = key;
            highestProfitAmountByMonth = profitAmountByMonth;
        }
    }

    let highestExpenseByMonth;
    let highestExpenseAmountByMonth = 0;
    for(const key in expenseMonth){
        const expenseAmountByMonth = expenseMonth[key];
        if(expenseAmountByMonth > highestExpenseAmountByMonth){
            highestExpenseByMonth = key;
            highestExpenseAmountByMonth = expenseAmountByMonth;
        }
    }

    highestProfitCategorySpan.innerHTML = getCategoryById(highestProfitCategoryId).name;
    highestProfitCategoryAmountSpan.innerHTML = `+$ ${highestProfitCategoryAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    highestExpenseCategorySpan.innerHTML = getCategoryById(highestExpenseCategoryId).name;
    highestExpenseCategoryAmountSpan.innerHTML = `-$ ${highestExpenseCategoryAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    highestBalanceCategorySpan.innerHTML = getCategoryById(highestBalanceCategoryId).name;
    if(highestBalanceCategoryAmount < 0){
        highestBalanceCategoryAmountSpan.innerHTML = `-$ ${(highestBalanceCategoryAmount * -1).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }else{
        highestBalanceCategoryAmountSpan.innerHTML = `+$ ${highestBalanceCategoryAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }
    highestProfitMonthSpan.innerHTML = highestProfitByMonth;
    highestProfitMonthAmountSpan.innerHTML = `+$ ${highestProfitAmountByMonth.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    highestExpenseMonthSpan.innerHTML = highestExpenseByMonth;
    highestExpenseMonthAmountSpan.innerHTML = `-$ ${highestExpenseAmountByMonth.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

const buildTotalRow = (description, profit, expense, balance) =>{
    const row = document.createElement('div');
    row.classList.add('columns', 'is-vcentered', 'is-mobile');
    const cellDescription = document.createElement('div');
    cellDescription.classList.add('column');
    const descriptionH = document.createElement('h3');
    descriptionH.classList.add('has-text-weight-semibold');
    const cellProfit = document.createElement('div');
    cellProfit.classList.add('column', 'has-text-success', 'has-text-right');
    const cellExpense = document.createElement('div');
    cellExpense.classList.add('column', 'has-text-danger', 'has-text-right');
    const cellBalance = document.createElement('div');
    cellBalance.classList.add('column', 'has-text-right');

    row.appendChild(cellDescription);
    cellDescription.appendChild(descriptionH);
    descriptionH.innerHTML = description;
    row.appendChild(cellProfit);
    cellProfit.innerHTML = `+$ ${profit.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    row.appendChild(cellExpense);
    cellExpense.innerHTML = `-$ ${expense.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    row.appendChild(cellBalance);
    if(balance < 0){
        cellBalance.innerHTML = `-$ ${(balance * -1).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    } else{
        cellBalance.innerHTML = `+$ ${balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }
    return row;
}

const totalsByCategory = () =>{
    const storage = getStorage();
    var profitCategories = getProfitCategories();
    var expenseCategories = getExpenseCategories();
    for(let cat of storage.categories){
        if(profitCategories[cat.id] != undefined || expenseCategories[cat.id] != undefined){
            const catName = getCategoryById(cat.id).name;
            const profit = profitCategories[cat.id] == undefined ? 0 : profitCategories[cat.id];
            const expense = expenseCategories[cat.id] == undefined ? 0 : expenseCategories[cat.id];
            const balance = parseFloat(profit) - parseFloat(expense);
            const row = buildTotalRow(catName, profit, expense, balance);

            totalsByCategoriesDiv.appendChild(row);
        }
    }
}

const totalsByMonth = () =>{
    const profitMonth = getProfitMonths();
    const expenseMonth = getExpenseMonths();
    const months = getOperationMonths();
    for(const month of months){
        const profit = profitMonth[month] == undefined ? 0 : profitMonth[month];
        const expense = expenseMonth[month] == undefined ? 0 : expenseMonth[month];
        const balance = parseFloat(profit) - parseFloat(expense);
        const row = buildTotalRow(month, profit, expense, balance);
        
        totalsByMonthDiv.appendChild(row);
    }
}