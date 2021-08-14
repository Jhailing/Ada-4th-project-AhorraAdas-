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

let listCategories= {}

categoryForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log(categoryInput.value)

    createCategory(e)
})

const createCategory = e => {
    //Validando el input
    if(categoryInput.value.trim() === ""){
        console.log('esta vacio')
        return
    }
//Construyendo el objeto
    const category  = {
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
    categoryContainer.innerHTML = "";
    Object.values(listCategories).forEach((category) => {
        const addObjCat = template.cloneNode(true)
        addObjCat.querySelector('span').textContent = category.name
        fragment.appendChild(addObjCat)
    })
    categoryContainer.appendChild(fragment)
    console.log(listCategories);
}

const deleteColumns = (e) => {
    const itemCategory = e.target;
  
    if (e.target.classList.contains("")) {
      delete categories[e.target.dataset.id]
      console.log(categories)
    } else if (e.target.id > 0){
      delete categories[e.target.dataset.id]
      console.log(categories)
    }
}