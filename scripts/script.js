document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

function generatorId() {
  var u = '', i = 0;
  while(i ++ < 36) {
      var c = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i-1], r = Math.random() * 16 | 0, v = c == 'x' ? r:(r&0x3|0x8);
      u += (c == '-' || c == '4') ? c:v.toString(16);
  }
  return u;
}

const getStorage = () =>{
  const storage = JSON.parse(localStorage.getItem('ahorradas'));
  if(storage){
    return storage;
  }
  return {
    operations: [],
    categories: [
      {id:generatorId(), name: 'Comida'}, 
      {id:generatorId(), name: 'Educación'}, 
      {id:generatorId(), name: 'Salidas'}, 
      {id:generatorId(), name: 'Servicios'}, 
      {id:generatorId(), name: 'Trabajo'}, 
      {id:generatorId(), name: 'Transporte'}
    ]
  }
}

const setStorage = (value) =>{
  localStorage.setItem('ahorradas', JSON.stringify(value));
}

const today = () => {
  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

const getCategoryById = (id) => {
  const storage = getStorage();
  const categories = storage.categories.filter(category => category.id === id);
  return categories[0];
}