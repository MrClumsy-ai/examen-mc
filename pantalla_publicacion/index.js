const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idSolicitante = urlParams.get("sol");
const idPublicacion = urlParams.get("pub");
$(document).ready(function () {
  agregarComentarios();
});
function agregarComentarios() {
  $.ajax({
    url:
      "https://ex2r.fime.uanl.mx/api/Comentarios/Publicacion/" +
      idSolicitante +
      "/" +
      idPublicacion,
    type: "GET",
    datatype: "json",
    crossdomain: true,
  })
    .done(function (result) {
      result.forEach((element) => {
        if (element.idUsuario == idSolicitante) {
          $("#main").append(`

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
              </div>
            </div>
          `);
        } else {
          $("#main").append(`

            <div id="${element.idPublicacion}" class="content">
              <h5 class="${element.idUsuario}">${element.nombre}
                <span>${element.idUsuario}</span>
              </h5>
              <h6>${element.fechaCreacion}</h6>
              <p class="contenido-publicacion">${element.contenido}</p>
              <div class="acciones-div">
                <button class="btn btn-dark like-btn">${element.cantidadLikes} likes</button>
                <button class="btn btn-dark comentar-btn">comenta algo</button>
              </div>
            </div>
          `);
        }
      });
    })
    .fail(function (a, b, c) {
      console.log(b, c);
    });
}

$(".like-btn").click(function () {
  $(this).css("background-color", "var(--call-to-action-color)");
});

// comentar algo tu
let comentando = false;
$(".comentar-btn").click(function () {
  if (!comentando) {
    comentando = true;
    console.log("comentando...");
    $(this).parent().append(`
    
      <div id="comentario-div" class="mt-3">
        <form>
          <input id="comentario-field" type="text" placeholder="comenta algo...">
          <button id="comentar-btn" type="submit">Comentar</button>
          <button id="cancelar-btn" type="submit">Cancelar</button>
        </form>
      </div>
    `);

    $("#comentar-btn").click(function (e) {
      // comentario successful
      if (!$("#comentario-field").val().trim() === "") {
        comentando = false;
        console.log("comentado!");
        $("#comentario-div").remove();
      }
      // comentario unsuccessful
      else {
        swal("No hay texto...");
      }
      e.preventDefault();
    });
    $("#cancelar-btn").click(function (e) {
      comentando = false;
      console.log("comentario cancelado");
      $("#comentario-div").remove();
      e.preventDefault();
    });
  } else {
    swal("Ya estas comentando!");
  }
});
