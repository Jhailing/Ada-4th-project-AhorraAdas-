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
    categories: []
  }
}

const setStorage = (value) =>{
  localStorage.setItem('ahorradas', JSON.stringify(value));
}