const editInputCategory = document.getElementById('edit-input-category');
const btnSaveCategory = document.getElementById('save-categoy-edit-btn');
const btnEditCategory = document.getElementById('not-save-category-edit-btn');
const formChangeCategory = document.getElementById('form');

//Boton cancelar
function canceledBtn() {
    window.location.assign("./categories.html");
}

let params = new URLSearchParams(window.location.search);
let idParamsCateg = params.get("catId");
let categoryParams = params.get("catName");
editInputCategory.value = categoryParams;
editInputCategory.focus();

const editCategory = function (e) {
    e.preventDefault();
    let inputCategory = editInputCategory.value;
    if (inputCategory != "") {
        const storage = getStorage();
        for (let i = 0; i < storage.categories.length; i++) {
            if (storage.categories[i].id.toString() == idParamsCateg) {
                storage.categories[i].name = inputCategory;
                break;
            }
        }
        storage.categories.forEach(function (element) {
            if (element.id == params.get("id")) {
                inputCategory = element.name
            }
        })
        setStorage(storage);
    }
    window.location.assign("./categories.html");
}
btnSaveCategory.addEventListener('click', editCategory);
