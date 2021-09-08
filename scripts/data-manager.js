// Storage
const getStorage = () =>{
    let storage = JSON.parse(localStorage.getItem('ahorradas'));
    if(!storage){
        storage = {
            operations: [],
            categories: [
              {id:generatorId(), name: 'Comida'}, 
              {id:generatorId(), name: 'Educación'}, 
              {id:generatorId(), name: 'Salidas'}, 
              {id:generatorId(), name: 'Servicios'}, 
              {id:generatorId(), name: 'Trabajo'}, 
              {id:generatorId(), name: 'Transporte'}
            ]
        }
        setStorage(storage);
    }
    return storage;
}
  
const setStorage = (value) =>{
    localStorage.setItem('ahorradas', JSON.stringify(value));
}
  

// Utils
function generatorId() {
    var u = '', i = 0;
    while(i ++ < 36) {
        var c = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i-1], r = Math.random() * 16 | 0, v = c == 'x' ? r:(r&0x3|0x8);
        u += (c == '-' || c == '4') ? c:v.toString(16);
    }
    return u;
}

const today = () => {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
}


const saveFilterDate = (value) =>{
    localStorage.setItem('filterDate', value);
}

const getFilterDate = () =>{
    return localStorage.getItem('filterDate');
}
  
// Categories
const getCategoryById = (id) => {
    const storage = getStorage();
    const category = storage.categories.find(category => category.id === id);
    return category;
}

const getCategoryByName = (name) => {
    const storage = getStorage();
    const category = storage.categories.find(category => category.name === name);
    return category;
}

const getAllCateries = () => {
    const storage = getStorage();
    return storage.categories;
}

const newCategory = (name) => {
    const category  = {
        id: generatorId(), 
        name: categoryInput.value, 
    }
    const storage = getStorage();
    storage.categories.push(category);
    setStorage(storage);
}

const updateCategoy = (id, name) => {
    const storage = getStorage();
    const category = storage.categories.find(category => category.id === id);
    category.name = name;
    setStorage(storage);
}

const deleteCategory = (id) => {
    const storage = getStorage();
    const categories = storage.categories.filter(category => category.id !== id);
    const operationsToDelete = getOperationByCategoryId(id);
    let operations = getAllOperations();
    for(operation of operationsToDelete){
        operations = operations.filter(op => op.id !== operation.id);
    }
    storage.operations = operations;
    storage.categories= categories;
    setStorage(storage);
}

// Operations
const getOperationById = (id) => {
    const storage = getStorage();
    const operation = storage.operations.find(operation => operation.id === id);
    return operation;
}

const getAllOperations = () => {
    const storage = getStorage();
    return storage.operations;
}

const getOperationByCategoryId = (categoryId) => {
    const storage = getStorage();
    const operations = storage.operations.filter(operation => operation.category === categoryId);
    return operations;
}

const getFilteredOperations = (type, categoryId, fromDate, sortBy) => {
    let filteredOperations = getAllOperations();
    
    if(type != undefined){        
        filteredOperations = filteredOperations.filter(element => element.type === type);
    }

    if(categoryId != undefined){
        filteredOperations = filteredOperations.filter((element) => element.category === categoryId);
    }

    if(fromDate != undefined){
        filteredOperations = filteredOperations.filter((element) => {
            var d1 = Date.parse(fromDate);
            var d2 = Date.parse(element.date);
            return d1 <= d2;
        });
    }

    return sortOperations(filteredOperations, sortBy);
}

const sortOperations = (operations, sortBy) => {
    switch(sortBy){
        case 'more-recent':
            return operations.sort((a, b) => (Date.parse(a.date) < Date.parse(b.date)) ? 1 : ((Date.parse(b.date) < Date.parse(a.date)) ? -1 : 0));
        case 'less-recent':
            return operations.sort((a,b) => (Date.parse(a.date) > Date.parse(b.date)) ? 1 : ((Date.parse(b.date) > Date.parse(a.date)) ? -1 : 0));
        case 'greater-amount':
            return operations.sort((a, b) => {
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
            return operations.sort((a, b) => {
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
            return operations.sort((a, b) => (a.description > b.description) ? 1 : ((b.description > a.description) ? -1 : 0));
        case 'Z/A':
            return operations.sort((a, b) => (a.description < b.description) ? 1 : ((b.description < a.description) ? -1 : 0));
    }
};

const newOperation = (description, amount, type, categoryId, date) => {
    const operation = {
        id: generatorId(),
        description: description,
        amount: amount,
        type: type,
        category: categoryId,
        date: date
    };
    const storage = getStorage();
    storage.operations.push(operation);
    setStorage(storage);
}

const updateOperation = (id, description, amount, type, categoryId, date) => {
    const storage = getStorage();
    const operation = storage.operations.find(operation => operation.id === id);
    operation.description = description;
    operation.amount = amount;
    operation.type = type;
    operation.category = categoryId;
    operation.date = date;
    
    setStorage(storage);
}

const deleteOperation = (id) => {
    const storage = getStorage();
    const operations = storage.operations.filter(op => op.id !== id);
    storage.operations = operations;
    setStorage(storage);
}

// Reports
const getBalance = () => {
    const operations = getAllOperations();
    let sumOfExpenses = 0;
    let sumProfits = 0;
    let balanceTotal = 0;

    for (let operation of operations) {
        if (operation.type === "expense") {
            sumOfExpenses += parseInt(operation.amount);
        } else if (operation.type === "profit") {
            sumProfits += parseInt(operation.amount);
        }
    }
    balanceTotal = sumProfits - sumOfExpenses;
    return {expenses: sumOfExpenses, profits: sumProfits, total: balanceTotal};
}

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

const totalsByCategory = () =>{
    const storage = getStorage();
    let profitCategories = getProfitCategories();
    let expenseCategories = getExpenseCategories();
    let totalCategories = [];
    for(let cat of storage.categories){
        if(profitCategories[cat.id] != undefined || expenseCategories[cat.id] != undefined){
            const catName = getCategoryById(cat.id).name;
            const profit = profitCategories[cat.id] == undefined ? 0 : profitCategories[cat.id];
            const expense = expenseCategories[cat.id] == undefined ? 0 : expenseCategories[cat.id];
            const balance = parseFloat(profit) - parseFloat(expense);
            totalCategories.push(
                {
                    name:catName, profit:profit, expense:expense, balance:balance
                }
            );
        }
    }
    return totalCategories;
}

const totalsByMonth = () =>{
    const profitMonth = getProfitMonths();
    const expenseMonth = getExpenseMonths();
    const months = getOperationMonths();
    let totalMonths = [];
    for(const month of months){
        const profit = profitMonth[month] == undefined ? 0 : profitMonth[month];
        const expense = expenseMonth[month] == undefined ? 0 : expenseMonth[month];
        const balance = parseFloat(profit) - parseFloat(expense);
        totalMonths.push(
            {
                month:month, profit:profit, expense:expense, balance:balance
            }
        );
    }
    return totalMonths;
}

const getReport = () => {
    var profitCategories = getProfitCategories();
    var expenseCategories = getExpenseCategories();
    var balanceCategories = getBalanceCategories();
    var profitMonth = getProfitMonths();
    var expenseMonth = getExpenseMonths();
    
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

    const report = {
        highestProfitCategoryId : highestProfitCategoryId,
        highestProfitCategoryName : highestProfitCategoryId != undefined ? getCategoryById(highestProfitCategoryId).name : undefined,
        highestProfitCategoryAmount: highestProfitCategoryAmount,
        highestExpenseCategoryId : highestExpenseCategoryId,
        highestExpenseCategoryName : highestExpenseCategoryId != undefined ? getCategoryById(highestExpenseCategoryId).name : undefined,
        highestExpenseCategoryAmount: highestExpenseCategoryAmount,
        highestBalanceCategoryId: highestBalanceCategoryId,
        highestBalanceCategoryName:highestBalanceCategoryId != undefined ?  getCategoryById(highestBalanceCategoryId).name : undefined,
        highestBalanceCategoryAmount: highestBalanceCategoryAmount,
        highestProfitByMonth: highestProfitByMonth,
        highestProfitAmountByMonth: highestProfitAmountByMonth,
        highestExpenseByMonth: highestExpenseByMonth,
        highestExpenseAmountByMonth : highestExpenseAmountByMonth,
        totalCategories: totalsByCategory(),
        totalMonths: totalsByMonth()
    };
    return report;
}