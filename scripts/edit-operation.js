const editDescriptionInput = document.getElementById('edit-description-input');
const editAmountInput = document.getElementById('edit-amount-input');
const editTypeInput = document.getElementById('edit-type-operation');
const editCategorySelect = document.getElementById('edit-categories-select')
const editDateInput = document.getElementById('edit-date-input');
const editOperationBtn = document.getElementById('edit-op-btn');

window.addEventListener('load', () =>{
    loadCategories();
    loadOperation();
})

const loadCategories = () => {
    const storage = getStorage();
    const categories = storage.categories;
    
    for(let category of categories){
        editCategorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    }
}

const loadOperation = () => {
    const params = new URLSearchParams(window.location.search);
    const idOpParams = params.get('opId');
    const descriptionOpParams = params.get('opDescription');
    const amountOpParams = params.get('opAmount');
    const typeOpParams = params.get('opType');
    const categoryOpParams = params.get('opCategory');
    const dateOpParams = params.get('opDate');
    editDescriptionInput.value = descriptionOpParams;
    editAmountInput.value = amountOpParams;
    editTypeInput.value = typeOpParams;
    editCategorySelect.value = categoryOpParams;
    editDateInput.value = dateOpParams;
}

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