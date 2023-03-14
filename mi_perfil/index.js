const MATRICULA = 2077725;
const NOMBRE = "Eduardo Menchaca";
const LLAVE_SECRETA = "hi";
// agregar las publicaciones
$(document).ready(function () {
  agregarPublicaciones();
});

function agregarPublicaciones() {
  $.ajax({
    url:
      "https://ex2r.fime.uanl.mx/api/Publicaciones/all/" +
      MATRICULA +
      "/" +
      MATRICULA,
    type: "GET",
    datatype: "json",
    crossdomain: true,
  })
    .done(function (result) {
      result.forEach((element) => {
        $("#publicaciones").append(`
      
        <div id="${element.idPublicacion}" class="content">
          <h5 class="${element.idUsuario}">${element.nombre}
            <span>${element.idUsuario}</span>
          </h5>
          <h6>${element.fechaCreacion}</h6>
          <p class="contenido-publicacion">${element.contenido}</p>
          <div class="acciones-div">
            <button class="btn btn-dark like-btn">${element.cantidadLikes} likes</button>
            <button class="btn btn-dark comentar-btn">comenta algo</button>
            <button class="btn btn-dark mostrar-comentarios">Mostrar todos los comentarios(${element.cantidadComentarios})</button>
          </div>
        </div>
      
      `);
      });
    })
    .fail(function (error) {
      console.log("error");
    });
}

// unauthorized?!?!?!
let idPublicacion = 0;
function publicar(contenido) {
  $.ajax({
    url: "https://ex2r.fime.uanl.mx/api/Publicaciones",
    method: "POST",
    data: JSON.stringify({
      idPublicacion: idPublicacion,
      idUsuario: MATRICULA,
      llave_Secreta: MATRICULA.toString,
      contenido: contenido,
    }),
    contentType: "application/json",
  });
  idPublicacion++;
}

// nueva publicacion
$("#publicar-btn").click(function (e) {
  if ($("#publicacion-field").val().trim() === "") {
    alert("No se puede publicar una publicacion vacia");
  }
  // publicacion valida...
  else {
    console.log($("#publicacion-field").val().trim());

    let contenido = $("#publicacion-field").val().trim();
    publicar($("#publicacion-field").val().trim());
    $("#publicaciones").prepend(`
    
      <div id=${idPublicacion} class="content">
        <h5 id="${MATRICULA}">
          ${NOMBRE}
          <span>${MATRICULA}</span>
        </h5>
        <button class="borrar">borrar</button>
        <button class="editar">editar</button>
        <p class="contenido-publicacion">
          ${contenido}
        </p>
        <div class="acciones-div">
          <button class="btn btn-dark like-btn">0 Likes</button>
          <button class="btn btn-dark comentar-btn">Comenta algo</button>
          <button class="btn btn-info mostrar-comentarios">Mostrar todos los comentarios (0)</button>
        </div>
      </div>
    
    `);
    $("#publicacion-field").val("");
  }

  e.preventDefault();
});

// info personal
let toggledInfo = false;
$("#info-personal").click(function () {
  if (toggledInfo) {
    toggledInfo = false;
    $("#info-div").remove();
  } else {
    toggledInfo = true;
    $(this).after(`
  
    <div class="mt-3" id="info-div">
      <ul>
        <li>Nombre: Eduardo Menchaca Cano</li>
        <li>Matricula: 2077725</li>
        <li>Estudiado: Instituto Regiomontano Cumbres, UANL FIME</li>
        <li>Pasatiempos: Videojuegos, Musica, Codificar, no usar los acentos en las palabras</li>
        <li>Trabajos: Forbidden Coffee Cafeteria</li>
        <li>Conocimientos: C, C++, C#, HTML, CSS, JavaScript, Java, Python, Rust</li>
      </ul>
    </div>

  `);
  }
});
