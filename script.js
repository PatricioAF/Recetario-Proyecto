
window.addEventListener('DOMContentLoaded', mostrarRecetas);

document.querySelector('#cerrar-detalle').addEventListener('click', () => {
    document.querySelector('.contenedor-modal-detalle').style.display = 'none';
});

// funcionalidades al dar click en el boton "+ crear" (para crear una receta). mostrara el modal

let recetaEditando = null;
let botonCrear = document.querySelector('.boton-crear');
let botonCerrar = document.querySelector('#cerrar');
let botonGuardar = document.querySelector('#guardar');
let listaRecetas = document.querySelector('.lista-recetas ul')

botonCrear.addEventListener('click', () => {
    document.querySelector('.contenedor-modal').style.display = 'flex';
});

// funcionalidades del modal donde creamos una receta 

botonCerrar.addEventListener('click', () => {
    document.querySelector('.contenedor-modal').style.display = 'none';
});

botonGuardar.addEventListener('click', () => {

    document.querySelector('.contenedor-modal').style.display = 'none';

    //obtiene el localStorage actual o una lista vacia si no hay nada 
    let recetasGuardadas = JSON.parse(localStorage.getItem('recetas')) || [];


    let nuevaReceta = {
        titulo: document.querySelector('#titulo').value,
        ingredientes: document.querySelector('#ingredientes').value,
        preparacion: document.querySelector('#preparacion').value,
        descripcion: document.querySelector('#descripcion').value
    };


    //Agrega la nueva receta al array
    recetasGuardadas.push(nuevaReceta);


    //guarda el array actualizado en tipo string la nueva receta creada
    localStorage.setItem('recetas', JSON.stringify(recetasGuardadas));

    document.querySelectorAll('.titulo-textarea textarea').forEach(textarea => {
        textarea.value = '';
    });

    mostrarRecetas();
});

function mostrarRecetas() {

    listaRecetas.innerHTML = '';
    let recetas = JSON.parse(localStorage.getItem('recetas')) || [];

    recetas.forEach(receta => {

        if(!receta) return;

        //funcionalidad para la lista de recetas

        let crearLi = document.createElement('li');
        let crearImg = document.createElement('img');
        crearImg.src = '/recursos/imagen-receta.jpg';
        let crearH4 = document.createElement('h4');
        crearH4.textContent = receta.titulo
        let botonEditar = document.createElement('button');
        let botonEliminar = document.createElement('button');
        botonEditar.textContent = '✏️';
        botonEditar.classList.add('boton-editar');
        botonEliminar.textContent = '❌';
        botonEliminar.classList.add('boton-eliminar');


        crearLi.appendChild(crearImg);
        crearLi.appendChild(crearH4);
        crearLi.appendChild(botonEditar);
        crearLi.appendChild(botonEliminar);

        botonEliminar.addEventListener('click', (evento) => {
            evento.stopPropagation(); // Para que no se abra el modal detalle al hacer click en eliminar

            let recetas = JSON.parse(localStorage.getItem('recetas')) || [];

            // Filtra todas las recetas que NO coincidan con el título del <h4>
            recetas = recetas.filter(r => r.titulo !== receta.titulo);

            // Actualiza el localStorage
            localStorage.setItem('recetas', JSON.stringify(recetas));

            // Vuelve a mostrar las recetas actualizadas
            mostrarRecetas();
        });

        //evento de cada elemento para abrir modal que muestra detalles

        crearLi.addEventListener('click', (evento) => {

            if (evento.target.tagName === 'BUTTON') return;

            document.querySelector('.contenedor-modal-detalle').style.display = 'flex';
            document.querySelector('#titulo-detalle').textContent = receta.titulo;
            document.querySelector('#ingredientes-detalle').textContent = receta.ingredientes;
            document.querySelector('#preparacion-detalle').textContent = receta.preparacion;
            document.querySelector('#descripcion-detalle').textContent = receta.descripcion;
        });

        listaRecetas.appendChild(crearLi);
    });
};
