const editDescriptionInput = document.getElementById('edit-description-input');
const editAmountInput = document.getElementById('edit-amount-input');
const editTypeInput = document.getElementById('edit-type-operation');
const editCategorySelect = document.getElementById('edit-categories-select')
const editDateInput = document.getElementById('edit-date-input');
const editOperationBtn = document.getElementById('edit-op-btn');

let params = new URLSearchParams(window.location.search);
let idOpParams = params.get('opId');
let descriptionOpParams = params.get('opDescription');
let amountOpParams = params.get('opAmount');
let typeOpParams = params.get('opType');
let categoryOpParams = params.get('opCategory');
let dateOpParams = params.get('opDate');
editDescriptionInput.value = descriptionOpParams;
editAmountInput.value = amountOpParams;
editTypeInput.value = typeOpParams;
editCategorySelect.value = categoryOpParams;
editDateInput.value = dateOpParams;

const editOperation = function (e) {
    e.preventDefault();
    let showDescription = editDescriptionInput.value;
    let showAmount = editAmountInput.value;
    let showType = editTypeInput.value;
    let showCategory = editCategorySelect.value;
    let showDate = editDateInput.value;
    if(showDescription != ""){
        const storage = getStorage();
        for (let i = 0; i < storage.operations.length; i++) {
            if (storage.operations[i].id == idOpParams) {
                storage.operations[i].description = showDescription;
                storage.operations[i].amount = showAmount;
                storage.operations[i].type = showType;
                storage.operations[i].category = showCategory;
                storage.operations[i].date = showDate;
                break;
            }
        }
        setStorage(storage);
    }
    window.location.assign("./index.html");
}
editOperationBtn.addEventListener('click', editOperation);

const loadCategories = () => {
    const storage = getStorage();
    const categories = storage.categories;
    
    for(let category of categories){
        editCategorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    }
}

window.addEventListener('load', () =>{
    loadCategories();
})