const editInputCategory = document.getElementById('edit-input-category');
const formEditCategory = document.getElementById('form-edit-category');

let categoryId;
   
document.addEventListener('DOMContentLoaded', ()=> {
    let params = new URLSearchParams(window.location.search);
    categoryId = params.get("catId");
    if(categoryId != undefined){
        let category = getCategoryById(categoryId);
        editInputCategory.value = category.name;    
    }
    editInputCategory.focus();
});

const saveCategory = function (e) {
    e.preventDefault();
    let categoryName = editInputCategory.value;
    const category =  getCategoryByName(categoryName)
    if(category != undefined && category.id != categoryId){
        Swal.fire('Ups! La categoría ya exite');
    }else{
        updateCategoy(categoryId, categoryName);
        window.location.assign("./categories.html");    
    }
}

formEditCategory.addEventListener('submit', saveCategory);