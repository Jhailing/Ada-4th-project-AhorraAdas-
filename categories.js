//Select the elements
const categoryInput = document.getElementById("category-input");
const categoryButton = document.getElementById("category-button");
const categoryForm = document.getElementById('form');
const categoryContainer = document.getElementById("categories");
const trashIcon = document.createElement("span");
const newDivCategory = document.createElement("div");
const divIcons = document.createElement("div");
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()

let listCategories = {}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('listCategories')) {
        listCategories = JSON.parse(localStorage.getItem('listCategories'))
    }
    addCategory();
})

categoryContainer.addEventListener('click', (e) => {
    actBtnDelete(e)
})

categoryForm.addEventListener('submit', e => {
    e.preventDefault();
    createCategory(e)
})

const createCategory = e => {
    if (categoryInput.value.trim() === "") {
        return
    }

    const category = {
        id: Date.now(),
        name: categoryInput.value,
        estado: false
    }
    listCategories[category.id] = category

    form.reset()
    categoryInput.focus()
    addCategory()
}

const addCategory = () => {
    localStorage.setItem('listCategories', JSON.stringify(listCategories))
    categoryContainer.innerHTML = "";
    Object.values(listCategories).forEach((category) => {
        const addObjCat = template.cloneNode(true)
        addObjCat.querySelector('span').textContent = category.name
        addObjCat.querySelectorAll('.far')[0].dataset.id = category.id
        addObjCat.querySelectorAll('.far')[1].dataset.id = category.id
        fragment.appendChild(addObjCat)
    })
    categoryContainer.appendChild(fragment)
}

const actBtnDelete = (e) => {
    if (e.target.classList.contains('fa-trash-alt')) {
        listCategories[e.target.dataset.id].estado = true
        addCategory()
    }
    if (e.target.classList.contains('fa-trash-alt')) {
        delete listCategories[e.target.dataset.id]
        addCategory()
    }
    e.stopPropagation()
}