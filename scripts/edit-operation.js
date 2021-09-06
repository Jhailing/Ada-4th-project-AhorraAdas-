const formEditOperation = document.getElementById('form-edit-operation');
const editDescriptionInput = document.getElementById('edit-description-input');
const editAmountInput = document.getElementById('edit-amount-input');
const editTypeInput = document.getElementById('edit-type-operation');
const editCategorySelect = document.getElementById('edit-categories-select')
const editDateInput = document.getElementById('edit-date-input');

let operationId;

window.addEventListener('DOMContentLoaded', () =>{
    loadCategories();
    loadOperation();
})

const loadCategories = () => {
    const categories = getAllCateries();
    
    for(let category of categories){
        editCategorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    }
}

const loadOperation = () => {
    const params = new URLSearchParams(window.location.search);
    operationId = params.get('opId');
    const operation = getOperationById(operationId);

    editDescriptionInput.value = operation.description;
    editAmountInput.value = operation.amount;
    editTypeInput.value = operation.type;
    editCategorySelect.value = operation.category;
    editDateInput.value = operation.date;
}

const editOperation = (e) => {
    e.preventDefault();
    updateOperation(operationId, editDescriptionInput.value, editAmountInput.value, editTypeInput.value, editCategorySelect.value, editDateInput.value);
    window.location.assign("./index.html");
}

formEditOperation.addEventListener('submit', editOperation);