// //Categoria por ganancia
// const categoryNameByEarning = document.getElementById('highest-earning-category');
// const amountCategoryByProfit = document.getElementById('category-amount-highest-profit');
// //Categoria por gasto
// const categoryNameBySpending = document.getElementById('highest-spending-category');
// const amountCategoryBySpending = document.getElementById('amount-highest-spending-category');
// //Categoria por balance
// const categoryNameByBalance = document.getElementById('category-higher-balance');
// const amountCategoryByBalance = document.getElementById('amount-category-higher-balance');
// //Categoria por mes
// const monthByProfit = document.getElementById('month-highest-profit');
// const amountMonthByProfit = document.getElementById('amount-month-highest-profit');

// const storage = getStorage();
// let objCategory = []
// const reportCategory = () => {
//     storage.operations.forEach((operation) => {
//       if (!objCategory[operation.category]){
//         objCategory[operation.category] = {};
//       }
//       if(!objCategory[operation.category][operation.type]){
//         objCategory[operation.category][operation.type] = 0;
//       } 
//       objCategory[operation.category][operation.type] += Number(operation.amount);
//       return objCategory;
//     })
//   createGridReport(objCategory);
//  }
// const containerCategoryProfit = document.getElementById('profit-category');
// 	createGridReport = (objCategory) => {
//     for (let category in objCategory){

//     }
//   }