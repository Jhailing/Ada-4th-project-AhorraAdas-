const formAddNewOperation = document.getElementById('form-add-new-operation');
const newOperationName = document.getElementById('description-input');
const amountNewOperation = document.getElementById('amount-input');
const selectTypeOperation = document.getElementById('type-operation');
const selectCategory = document.getElementById('categories-select');
const dateNewOperation = document.getElementById('date-input');

window.addEventListener('DOMContentLoaded', () =>{
    loadCategories();
    restartViewOperation();
})

const restartViewOperation = () => {
    selectTypeOperation.value = 'expense';
    dateNewOperation.value = today();
}

const loadCategories = () => {
    const categories = getAllCateries();
    for(let category of categories){
        selectCategory.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    }
}

formAddNewOperation.addEventListener('submit', (e) => {
    e.preventDefault();
    newOperation(newOperationName.value, amountNewOperation.value, selectTypeOperation.value, selectCategory.value, dateNewOperation.value);
    window.location.assign("index.html");
})