const btnCrearReceta = document.querySelector(".btnCrearTarea");
const seccionAlerta = document.querySelector(".alerta");
const seccionTareas = document.querySelector(".tareas");

//Ejecuta funcion agregarTarea si hacemos click en el boton
btnCrearReceta.addEventListener("click", function () {
    agregarTarea();
});

//Ejucuta funcion cargarTareas de localstorage una vez cargue el documento
document.addEventListener("DOMContentLoaded", function () {
    cargarTareas();
});

function agregarTarea() {
    const tituloTarea = document.querySelector(".tituloTarea");
    const tareaValue = tituloTarea.value;
    const descripcionTarea = document.querySelector(".descripcionTarea");
    const descripcionValue = descripcionTarea.value;
    if(tareaValue === "" || descripcionValue === "") {
        alertaCamposVacios();
    } else { 
        // Crear objeto tarea
        const tarea = {
            id:Date.now(),
            titulo: tareaValue,
            descripcion: descripcionValue
        };

        // Guardar tarea en localStorage obteniendo las anteriores o un array vacio para añadir
        let tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
        tareasGuardadas.push(tarea);
        localStorage.setItem("tareas", JSON.stringify(tareasGuardadas));


        //Crea elementos en el html
        const contenedorTareas = document.createElement("div");
        contenedorTareas.classList.add("contenedorTareas");
    
        const tituloTareaMostrar = document.createElement("h3");
        tituloTareaMostrar.classList.add("tituloTareaMostrar")
        tituloTareaMostrar.textContent = tareaValue;
    
        const descripcionTareaMostrar = document.createElement("p");
        descripcionTareaMostrar.classList.add("descripcionTareaMostrar")
        descripcionTareaMostrar.textContent = descripcionValue;
    
    
    
        const btnEliminarTarea = document.createElement("button");
        btnEliminarTarea.classList.add("btnEliminarTarea");
        btnEliminarTarea.textContent = "Eliminar Tarea";
        //Le pasamos al boton funcion para eliminar esa tarea cuando le hacemos click
        btnEliminarTarea.addEventListener("click", function () {
            quitarTarea(contenedorTareas, tarea);
        });

    
        contenedorTareas.appendChild(tituloTareaMostrar);
        contenedorTareas.appendChild(descripcionTareaMostrar);
        contenedorTareas.appendChild(btnEliminarTarea);
        seccionTareas.appendChild(contenedorTareas);

         // Limpiar campos de entrada 
         tituloTarea.value = '';
         descripcionTarea.value = '';        
    }
}

// Función para cargar las tareas guardadas en localStorage una vez iniciada la pagina
function cargarTareas() {
    const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareasGuardadas.forEach(function (tarea) {
        const contenedorTareas = document.createElement("div");
        contenedorTareas.classList.add("contenedorTareas");

        const tituloTareaMostrar = document.createElement("h3");
        tituloTareaMostrar.classList.add("tituloTareaMostrar");
        tituloTareaMostrar.textContent = tarea.titulo;

        const descripcionTareaMostrar = document.createElement("p");
        descripcionTareaMostrar.classList.add("descripcionTareaMostrar");
        descripcionTareaMostrar.textContent = tarea.descripcion;

        const btnEliminarTarea = document.createElement("button");
        btnEliminarTarea.classList.add("btnEliminarTarea");
        btnEliminarTarea.textContent = "Eliminar Tarea";
        // Añadir evento para eliminar tarea
        btnEliminarTarea.addEventListener("click", function () {
            quitarTarea(contenedorTareas, tarea);
        });

        contenedorTareas.appendChild(tituloTareaMostrar);
        contenedorTareas.appendChild(descripcionTareaMostrar);
        contenedorTareas.appendChild(btnEliminarTarea);
        seccionTareas.appendChild(contenedorTareas);
    });
}

//Funcion para que aparezca alerta si no ha rellenado los campos
function alertaCamposVacios() {
    const alerta = document.createElement("h3");
    alerta.classList.add("textoAlerta");
    alerta.textContent = "Debes rellenar todos los campos";

    seccionAlerta.appendChild(alerta);
    //Temporizador para que se elimine alerta
    setTimeout(function() {
       alerta.remove(); 
    }, 3000);
}

//Funcion para eliminar Tarea
function quitarTarea(contenedorTareas, tarea) {
     // Eliminar tarea de la lista de tareas guardadas en localStorage
     let tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
    
     //Encuentra el id de la tarea sobre la que hemos pulsado
     const indiceTarea = tareasGuardadas.findIndex(function (t) {
        return t.id === tarea.id;
    });


    // Si encontramos la tarea ya que findIndex retorna -1 si no la encuentra
    if (indiceTarea !== -1) {
        // Eliminar la tarea en el índice encontrado
        tareasGuardadas.splice(indiceTarea, 1);

        // Actualizar el localStorage con el nuevo array
        localStorage.setItem("tareas", JSON.stringify(tareasGuardadas));
    }

    //Elimnar tarea del HTML
    contenedorTareas.remove();
}



