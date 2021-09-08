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
    if(amountNewOperation.value == 0 || amountNewOperation.value == ''){
        amountNewOperation.focus();
        Swal.fire('Ups! La operación no tiene monto');
    }else{
        newOperation(newOperationName.value, amountNewOperation.value, selectTypeOperation.value, selectCategory.value, dateNewOperation.value);
        window.location.assign("index.html");
    }
})

amountNewOperation.addEventListener('focusin', (e) => {
    if(amountNewOperation.value == 0){
        amountNewOperation.value = '';
    }
})

amountNewOperation.addEventListener('focusout', (e) => {
    if(amountNewOperation.value == ''){
        amountNewOperation.value = 0;
    }
})

document.addEventListener('keydown', (e) => {
    if(amountNewOperation.value == '' && e.code == 'Digit0'){
        e.preventDefault();
    }
})