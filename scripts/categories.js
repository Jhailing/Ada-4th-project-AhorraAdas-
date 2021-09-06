const categoryInput = document.getElementById("category-input");
const categoryButton = document.getElementById("category-button");
const categoryForm = document.getElementById('form');
const categoryContainer = document.getElementById("categories");

document.addEventListener('DOMContentLoaded', ()=> {
    showCategories();
})

categoryForm.addEventListener('submit', e => {
    e.preventDefault();
    const categoryName = categoryInput.value;
    if(getCategoryByName(categoryName) != undefined){
        alert('Ups, la categoría ya existe!');
    }else{
        newCategory(categoryName);
        form.reset();
        categoryInput.focus();
        showCategories();    
    }
})

const showCategories = () => {
    categoryContainer.innerHTML = "";
    const categories = getAllCateries();    
    for(const categ of categories){
        const itemCategories = document.createElement('div');
        itemCategories.classList.add('mb-3', 'list-task');
        const columnsCategory = document.createElement('div');
        columnsCategory.classList.add('columns', 'is-vcentered', 'is-mobile');
        const columnCategory = document.createElement('div');
        columnCategory.classList.add('column');
        const categoryName = document.createElement('span');
        categoryName.classList.add('tag', 'is-primary', 'is-light', 'is-size-6');
        categoryName.innerText = categ.name;
        const divsIcons = document.createElement('div');
        divsIcons.classList.add('column', 'is-narrow');
        const buttonEdit = document.createElement('a');
        buttonEdit.classList.add('button', 'is-light');
        buttonEdit.dataset.id = categ.id;
        buttonEdit.setAttribute('href', `./edit-category.html?catId=${categ.id}`);
        const iconEdit = document.createElement('span');
        iconEdit.classList.add('icon', 'is-medium', 'btn-edit');
        const iconButtonEdit = document.createElement('i');
        iconButtonEdit.classList.add('far', 'fa-edit');
        const buttonDelete = document.createElement('button');
        buttonDelete.classList.add('button', 'is-light');
        const itemTrash = document.createElement('span');
        itemTrash.classList.add('icon', 'is-medium', 'btn-delete');
        const iconButton = document.createElement('i');
        iconButton.classList.add('far','fa-trash-alt');
        itemTrash.style.pointerEvents= 'none';
        buttonDelete.dataset.id = categ.id;
        buttonDelete.addEventListener('click', onDeleteCategory);
        categoryContainer.appendChild(itemCategories);
        itemCategories.appendChild(columnsCategory);
        columnsCategory.appendChild(columnCategory);
        columnCategory.appendChild(categoryName);
        columnsCategory.appendChild(divsIcons);
        divsIcons.appendChild(buttonEdit);
        buttonEdit.appendChild(iconEdit);
        divsIcons.appendChild(buttonDelete);
        buttonDelete.appendChild(itemTrash);
        iconEdit.appendChild(iconButtonEdit);
        itemTrash.appendChild(iconButton);
    }
}

const onDeleteCategory = (e) => {
    let categoryId = e.target.dataset.id;
    deleteCategory(categoryId);
    showCategories();
}