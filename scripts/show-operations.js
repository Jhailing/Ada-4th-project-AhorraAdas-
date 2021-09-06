const containerWithOperations = document.getElementById('with-operations');
const containerNoOperations = document.getElementById('no-operations');
const operationsList = document.getElementById('list-operations');

document.addEventListener('DOMContentLoaded', ()=> {
    const storage = getStorage();
    showOperations(operations);
})

const showOperations = (operations) =>{
    if(!operations.length){
        containerNoOperations.classList.remove('is-hidden');
        containerWithOperations.classList.add('is-hidden');
        return
    }
    containerNoOperations.classList.add('is-hidden');
    containerWithOperations.classList.remove('is-hidden');

    operationsList.innerHTML = '';

    for(const op of operations){
        const date = new Date(op.date);
        const itemOperations = document.createElement('div');
        itemOperations.classList.add('mb-3');
        const cellsContainer = document.createElement('div');
        cellsContainer.classList.add('columns', 'is-multiline', 'is-mobile', 'is-vcentered');
        const cellDescription = document.createElement('div');
        cellDescription.classList.add('column', 'is-3-tablet', 'is-6-mobile');
        const descriptionName = document.createElement('h3');
        descriptionName.classList.add('has-text-weight-semibold');
        descriptionName.innerHTML = op.description;
        const cellCategory = document.createElement('div');
        cellCategory.classList.add('column', 'is-3-tablet', 'is-6-mobile', 'has-text-right-mobile');
        const categorySelected = document.createElement('span');
        categorySelected.classList.add('tag', 'is-primary', 'is-light');
        const category = getCategoryById(op.category);
        categorySelected.innerHTML = op.category;
        const cellDate = document.createElement('div');
        cellDate.classList.add('column', 'is-2-tablet', 'has-text-grey', 'is-hidden-mobile', 'has-text-centered-tablet');
        const dateComponent =  op.date.split('-');
        cellDate.innerHTML = `${dateComponent[2]}/${dateComponent[1]}/${dateComponent[0]}`;
        const cellAmount = document.createElement('div');
        cellAmount.classList.add('column', 'is-2-tablet', 'is-6-mobile', 'has-text-weight-bold', 'has-text-right-tablet', 'is-size-4-mobile');
        if(op.type === 'expense'){
            cellAmount.classList.add('has-text-danger');
            cellAmount.innerHTML = `-$ ${op.amount}`;
        } else{
            cellAmount.classList.add('has-text-success');
            cellAmount.innerHTML = `+$ ${op.amount}`;
        }
        const cellActionsBtns = document.createElement('div');
        cellActionsBtns.classList.add('column', 'is-2-tablet', 'is-6-mobile', 'has-text-right');
        const contActionBtns = document.createElement('p');
        contActionBtns.classList.add('is-fullwidth');
        const editBtn = document.createElement('a');
        editBtn.classList.add('button', 'is-light');
        editBtn.setAttribute('href', `./edit-operation.html?opId=${op.id}&opDescription=${op.description}&opAmount=${op.amount}&opType=${op.type}&opCategory=${op.category}&opDate=${op.date}`);
        const contIconEdit = document.createElement('span');
        contIconEdit.classList.add('icon', 'is-medium', 'btn-edit-operation');
        contIconEdit.setAttribute('aria-label', 'Editar');
        const iconEdit = document.createElement('i');
        iconEdit.classList.add('far', 'fa-edit');
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('button', 'is-light');
        const contIconDelete = document.createElement('span');
        contIconDelete.classList.add('icon', 'is-medium', 'btn-delete-operation');
        contIconDelete.setAttribute('aria-label', 'Eliminar');
        const iconDelete = document.createElement('i');
        iconDelete.classList.add('far', 'fa-trash-alt');
        contIconDelete.style.pointerEvents = 'none';
        deleteBtn.addEventListener('click', deleteOperation);
        deleteBtn.dataset.id = op.id;

        operationsList.appendChild(itemOperations);
        itemOperations.appendChild(cellsContainer);
        cellsContainer.appendChild(cellDescription);
        cellDescription.appendChild(descriptionName);
        cellsContainer.appendChild(cellCategory);
        cellCategory.appendChild(categorySelected);
        cellsContainer.appendChild(cellDate);
        cellsContainer.appendChild(cellAmount);
        cellsContainer.appendChild(cellActionsBtns);
        cellActionsBtns.appendChild(contActionBtns);
        contActionBtns.appendChild(editBtn);
        editBtn.appendChild(contIconEdit);
        contIconEdit.appendChild(iconEdit);
        contActionBtns.appendChild(deleteBtn);
        deleteBtn.appendChild(contIconDelete);
        contIconDelete.appendChild(iconDelete);
    }
}

function deleteOperation (e) {
    let deleteById = e.target.dataset.id;
    const storage = getStorage();
    const operations = storage.operations.filter(op => op.id !== deleteById);
    storage.operations = operations;
    setStorage(storage);
    showOperations(operations);
}


// const storage = getStorage();
//     const newCategory = e.target.name.value;

//     if(storage.categories.includes(newCategory)){
//         nameCategory = "";
//         return alert('Esta categoria ya existe')
//     } else if (!storage.categories.includes(nameCategory)) {
//         const category  = {
//             id: generatorId(), 
//             name: categoryInput.value, 
//         }
//     }