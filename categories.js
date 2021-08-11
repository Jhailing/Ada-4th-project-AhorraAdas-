//DOM
const categoryInput = document.getElementById("category-input");
const categoryButton = document.getElementById("category-button");
const categoryContainer = document.getElementById("categories");
const trashIcon = document.createElement("span");
const newDivCategory = document.createElement("div");

const addCategory = (event) => {
    //  console.log('hello');
    event.preventDefault();
    //Creando el div principal
    newDivCategory.classList.add("mb-3");
    categoryContainer.appendChild(newDivCategory);
    //Creando columna principal
    const divColumns = document.createElement("div");
    divColumns.classList.add("columns", "is-vcentered", "is-mobile");
    newDivCategory.appendChild(divColumns);
    //Creando columnas vacias
    const divColumn = document.createElement("div");
    divColumn.classList.add("column");
    divColumns.appendChild(divColumn);
    //Creando span que contiene los nombres de las categorias
    const nameCategory = document.createElement("span");
    nameCategory.classList.add("tag", "is", "primary", "is-ligth", "is-size-6");
    nameCategory.innerHTML = categoryInput.value;
    divColumn.appendChild(nameCategory);
    //Creando div que contienen los iconos
    const divIcons = document.createElement("div");
    divIcons.classList.add("column", "is-narrow");
    divColumns.appendChild(divIcons);
    //Anclas de los iconos editar
    const hyperlinkEdit = document.createElement("a");
    hyperlinkEdit.setAttribute("href", "#");
    hyperlinkEdit.classList.add("button", "is-light");
    divIcons.appendChild(hyperlinkEdit);
    //Icono Editar
    const editIcon = document.createElement("span");
    editIcon.innerHTML = `<i class="far fa-edit"></i>`;
    editIcon.classList.add("icon", "is-medium");
    hyperlinkEdit.appendChild(editIcon);
    //Anclas de los iconos editar
    const hyperlinkTrash = document.createElement("div");
    //hyperlinkTrash.setAttribute("href", "#");
    hyperlinkTrash.classList.add("button", "is-light");
    divIcons.appendChild(hyperlinkTrash);
    //Icono Eliminar
    trashIcon.innerHTML = `<i class="far fa-trash-alt"></i>`;
    trashIcon.classList.add("icon", "is-medium");
    hyperlinkTrash.appendChild(trashIcon);
    categoryInput.value = "";
}
categoryButton.addEventListener("click", addCategory);
