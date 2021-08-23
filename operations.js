const notAddNewOperationBtn = document.getElementById('cancel-add-new-op-btn');
const addNewOperationBtn = document.getElementById('add-new-op-btn');
const newOperationName = document.getElementById('description-input');
const amountNewOperation = document.getElementById('amount-input');
const selectTypeOperation = document.getElementById('type-operation');
const selectCategory = document.getElementById('categories-select');
const dateNewOperation = document.getElementById('date-input');

const loadCategories = () => {
    const storage = getStorage();
    const categories = storage.categories;
    
    for(let category of categories){
        const optionCetegory = document.createElement('option');
        optionCetegory.innerHTML = category.name;
        optionCetegory.setAttribute('value', category.id);
        selectCategory.appendChild(optionCetegory);
    }
}

const createNewOperation = (e) => {
    const newOperation = {
        id: generatorId(),
        description: newOperationName.value,
        amount: amountNewOperation.value,
        type: selectTypeOperation.value,
        category: selectCategory.value,
        date: dateNewOperation.value.replace(/-/g, '/')
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

window.addEventListener('load', () =>{
    loadCategories();
})