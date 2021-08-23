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
    const storage = getStorage();
    for (let i = 0; i < storage.operations.length; i++) {
        if (storage.operations[i].id.toString() == idOpParams) {
            storage.operations[i].description = editDescriptionInput;
            storage.operations[i].amount = editAmountInput;
            storage.operations[i].type = editTypeInput;
            storage.operations[i].category = editCategorySelect;
            storage.operations[i].date = editDateInput;
            break;
        }
    }
    storage.operations.forEach(function (element) {
        if (element.id == params.get("id")) {
            editDescriptionInput = element.description;
            console.log(editDescriptionInput);
        }
    })
    setStorage(storage);

    window.location.assign("./index.html");
}
editOperationBtn.addEventListener('click', editOperation);