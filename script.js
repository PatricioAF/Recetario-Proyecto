// funcionalidades al dar click en el boton "+ crear" (para crear una receta). mostrara el modal

let botonCrear = document.querySelector('.boton-crear');
let botonCerrar = document.querySelector('#cerrar');
let botonGuardar = document.querySelector('#guardar');
let listaRecetas = document.querySelector('.lista-recetas ul')

botonCrear.addEventListener('click', () => {
    document.querySelector('.contenedor-modal').style.display = 'flex';
});

botonCerrar.addEventListener('click', () => {
    document.querySelector('.contenedor-modal').style.display = 'none';
});

botonGuardar.addEventListener('click', () => {

    document.querySelector('.contenedor-modal').style.display = 'none';

    let receta = {
        titulo: document.querySelector('#titulo').value,
        ingredientes: document.querySelector('#ingredientes').value,
        preparacion: document.querySelector('#preparacion').value,
        descripcion: document.querySelector('#descripcion').value
    };

    localStorage.setItem('nuevaReceta', JSON.stringify(receta));

    //funcionalidad para la lista de recetas

    let crearLi = document.createElement('li');
    let crearImg = document.createElement('img');
    crearImg.src = '/recursos/imagen-receta.jpg';
    let crearH4 = document.createElement('h4');
    crearH4.textContent = receta.titulo

    crearLi.appendChild(crearImg);
    crearLi.appendChild(crearH4);
    listaRecetas.appendChild(crearLi);
    
    document.querySelectorAll('.titulo-textarea textarea').forEach(textarea => {
        textarea.value = '';
    });

});
