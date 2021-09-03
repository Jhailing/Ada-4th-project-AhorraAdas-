//Categoria por ganancia
const categoryNameByEarning = document.getElementById('highest-earning-category');
const amountCategoryByProfit = document.getElementById('category-amount-highest-profit');
//Categoria por gasto
const categoryNameBySpending = document.getElementById('highest-spending-category');
const amountCategoryBySpending = document.getElementById('amount-highest-spending-category');
//Categoria por balance
const categoryNameByBalance = document.getElementById('category-higher-balance');
const amountCategoryByBalance = document.getElementById('amount-category-higher-balance');
//Categoria por mes
const monthByProfit = document.getElementById('month-highest-profit');
const amountMonthByProfit = document.getElementById('amount-month-highest-profit');


  //Totals per category function
const totalsByCategories = (name) => {
  const storage = getStorage();
  let operations = storage.operations;
  const groupCategory = operations.filter((element) => {
    return (element.category === name);
  })
  let expenseTotalByCategory = 0;
  let profitTotalByCategory = 0;
  let balanceTotalByCategory = 0;
  for (const op of groupCategory) {
    if(op.type === 'expense'){
      expenseTotalByCategory += Number(op.amount);
    } else if (op.type === 'profit'){
      profitTotalByCategory += Number(op.amount);
    }
  }
  balanceTotalByCategory = profitTotalByCategory - expenseTotalByCategory
  return [profitTotalByCategory, expenseTotalByCategory, balanceTotalByCategory];
}
const containerTotalCategory = document.getElementById('report-categories');
const createGridReport = () => {
  const storage = getStorage();
  const categories = storage.categories;
  containerTotalCategory.style.backgroundColor = 'blue';

  for (const category of categories) {
    const columnsPpal = document.createElement('div');
    columnsPpal.classList.add('columns is-vcentered is-mobile');
    
    const columnTitle = document.createElement('div');
    columnTitle.classList.add('column');

    const titleColumn = document.createElement('h3');
    titleColumn.classList.add('has-text-weight-semibold');
    titleColumn.innerHTML = `${category.name}`;

    const dataProfit = document.createElement('div');
    dataProfit.classList.add('column has-text-success has-text-right');
    dataProfit.innerHTML = `${monto-mayor-ganancia}`

    const dataExpense = document.createElement('div');
    dataExpense.classList.add('column has-text-danger has-text-right');
    dataExpense.innerHTML = `${monto-mayor-gasto}`;

    const dataBalance = document.createElement('div');
    dataBalance.classList.add('column has-text-right');
    dataBalance.innerHTML = `${monto-total-balance}`;

    containerTotalCategory.appendChild('columnsPpal');
    columnsPpal.appendChild('columnTitle');
    columnTitle.appendChild('titleColumn');
    titleColumn.appendChild('dataProfit');
    dataProfit.appendChild('dataExpense');
    dataExpense.appendChild('dataBalance');
  } 
}