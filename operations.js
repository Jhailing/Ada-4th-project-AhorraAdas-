const notAddNewOperationBtn = document.getElementById('cancel-add-new-op-btn');
const addNewOperationBtn = document.getElementById('add-new-op-btn');
const newOperationName = document.getElementById('description-input');
const amountNewOperation = document.getElementById('amount-input');
const selectTypeOperation = document.getElementById('type-operation');
const selectCategory = document.getElementById('categories-select');
const dateNewOperation = document.getElementById('date-input');

const createNewOperation = (e) => {
    const newOperation = {
        id: Date.now(),
        description: newOperationName.value,
        amount: amountNewOperation.value,
        type: selectTypeOperation.value,
        category: selectCategory.value,
        date: dateNewOperation.value,
    };
    const storage = getStorage();
    storage.operations.push(newOperation);
    setStorage(storage);
}

notAddNewOperationBtn.addEventListener('click', () => {
    notAddNewOperationBtn.setAttribute('href', './index.html');
});

addNewOperationBtn.addEventListener('click', function(){
    createNewOperation();
    window.location.assign("index.html");
})