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

window.addEventListener('DOMContentLoaded', () =>{
    loadReport();
    totalsByCategory();
    totalsByMonth();
})

const loadReport = () => {
    const report = getReport();
    if(report.highestProfitCategoryId != undefined && report.highestExpenseCategoryId != undefined){
        sectionWithReports.classList.remove('is-hidden');
        sectionNoReports.classList.add('is-hidden');
    }else{
        return;
    }
    
    highestProfitCategorySpan.innerHTML = report.highestProfitCategoryName;
    highestProfitCategoryAmountSpan.innerHTML = `+$ ${report.highestProfitCategoryAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    highestExpenseCategorySpan.innerHTML = report.highestExpenseCategoryName;
    highestExpenseCategoryAmountSpan.innerHTML = `-$ ${report.highestExpenseCategoryAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    highestBalanceCategorySpan.innerHTML = report.highestBalanceCategoryName;
    if(report.highestBalanceCategoryAmount < 0){
        highestBalanceCategoryAmountSpan.innerHTML = `-$ ${(report.highestBalanceCategoryAmount * -1).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }else{
        highestBalanceCategoryAmountSpan.innerHTML = `+$ ${report.highestBalanceCategoryAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }
    highestProfitMonthSpan.innerHTML = report.highestProfitByMonth;
    highestProfitMonthAmountSpan.innerHTML = `+$ ${report.highestProfitAmountByMonth.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    highestExpenseMonthSpan.innerHTML = report.highestExpenseByMonth;
    highestExpenseMonthAmountSpan.innerHTML = `-$ ${report.highestExpenseAmountByMonth.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

    for(const totalCategory of report.totalCategories){
        const row = buildTotalRow(totalCategory.name, totalCategory.profit, totalCategory.expense, totalCategory.balance);
        totalsByCategoriesDiv.appendChild(row);
    }

    for(const totalMonth of report.totalMonths){
        const row = buildTotalRow(totalMonth.month, totalMonth.profit, totalMonth.expense, totalMonth.balance);
        totalsByMonthDiv.appendChild(row);
    }
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