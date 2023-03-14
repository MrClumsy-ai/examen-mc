const MATRICULA = 2077725;
const NOMBRE = "Eduardo Menchaca";
const LLAVE_SECRETA = "hi";
$(document).ready(function () {
  agregarPublicaciones();
});

function agregarPublicaciones() {
  $.ajax({
    url: "https://ex2r.fime.uanl.mx/api/Publicaciones/all/" + MATRICULA,
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
            <button class="btn btn-info mostrar-comentarios">Mostrar todos los comentarios(${element.cantidadComentarios})</button>
          </div>
        </div>
      
      `);
      });
    })
    .fail(function (error) {
      console.log("error");
    });
}

let idPublicacion = 0;
// nueva publicacion
// unauthorized
// llave secreta ???????????????????????????????????????/
$("#publicar-btn").click(function (event) {
  let contenido = $("#publicacion-field").val().trim();

  if (!contenido == "") {
    console.log(idPublicacion, MATRICULA, contenido);

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
    })
      .done(function (result) {
        // $("#publicaciones").prepend(
        //   `<div id=${idPublicacion} class="content">
        //     <h5 id="${MATRICULA}">
        //       ${NOMBRE}
        //       <span>${MATRICULA}</span>
        //     </h5>
        //     <button class="borrar">borrar</button>
        //     <button class="editar">editar</button>
        //     <p class="contenido-publicacion">
        //       ${contenido}
        //     </p>
        //     <div class="acciones-div">
        //       <button class="btn btn-dark like-btn">0 Likes</button>
        //       <button class="btn btn-dark comentar-btn">Comenta algo</button>
        //       <button class="btn btn-info mostrar-comentarios">Mostrar todos los comentarios (0)</button>
        //     </div>
        //   </div>`
        // );
      })
      .fail(function (a, b, c) {
        console.log(b, c);
      });
    // borrar esto luego
    $("#publicaciones").prepend(
      `<div id=${idPublicacion} class="content">
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
      </div>`
    );

    $("#publicacion-field").val("");
    idPublicacion++;
  }
  event.preventDefault();
});

// borrar publicacion
// unauthorized
$("#publicaciones").on("click", ".borrar", function () {
  let idPublicacion = $(this).closest("div").attr("id");
  let contenido = $(this).siblings("p").text().trim();
  $.ajax({
    url: "https://ex2r.fime.uanl.mx/api/Publicaciones/" + idPublicacion,
    method: "DELETE",
    data: JSON.stringify({
      idPublicacion: idPublicacion,
      idUsuario: MATRICULA,
      llave_Secreta: LLAVE_SECRETA,
      contenido: contenido,
    }),
    contentType: "application/json",
  })
    .done(function (result) {
      console.log("yay");
      $(this).closest("div").remove();
    })
    .fail(function (a, b, c) {
      console.log(b, c);
    });
});

let editando = false;
// editar publicacion
// unauthorized
$("#publicaciones").on("click", ".editar", function () {
  // hace para que solo salga 1 caja de editar
  if (!editando) {
    let idPublicacion = $(this).closest("div").attr("id");
    console.log(idPublicacion);

    editando = true;
    console.log(
      "editando publicacion #" + $(this).closest("div").attr("id") + "..."
    );
    // crea la caja para editar
    $(this).closest("div").append(`
  
      <div id="editar">
        <input 
          class="editar-field" 
          type="text" 
          placeholder="editar:" 
          value="${$(this).siblings(".contenido-publicacion").text().trim()}"
        >
        <input
          class="republicar-btn"
          type="submit"
          value="re-publicar"
        >
        <input
          class="cancelar-btn"
          type="submit"
          value="cancelar"
        >
      </div>
  
    `);
    // para cancelar...
    $("#editar").on("click", ".cancelar-btn", function () {
      console.log("edicion cancelada");
      $("#editar").remove();
      editando = false;
    });
    // para re-publicar
    $("#editar").on("click", ".republicar-btn", function () {
      console.log("re-publicando...");
      let field = $(this).parent().find(".editar-field").val().trim();
      if (!(field === "")) {
        $(this).parent().siblings(".contenido-publicacion").text(field);
        let idPublicacion = $(this).parent().parent().attr("id");
        console.log($(this).parent().parent().attr("id"));
        console.log("dando:", idPublicacion, MATRICULA, LLAVE_SECRETA, field);
        $.ajax({
          url: "https://ex2r.fime.uanl.mx/api/Publicaciones/" + idPublicacion,
          method: "PUT",
          data: JSON.stringify({
            idPublicacion: idPublicacion,
            idUsuario: MATRICULA,
            llave_Secreta: LLAVE_SECRETA,
            contenido: field,
          }),
          contentType: "application/json",
        })
          .done(function (result) {
            console.log("yay");
            console.log("done!");
          })
          .fail(function (a, b, c) {
            console.log(b, c);
          });
        $("#editar").remove();
        editando = false;
      } else {
        console.log("no se puede re-publicar un string vacio");
      }
    });
  }
});

// like
// unauthorized
$("#publicaciones").on("click", ".like-btn", function () {
  let idPublicacion = $(this).parent().parent().attr("id");
  let idUsuario = $(this).parent().parent().children("h5").attr("class");
  $.ajax({
    url: "https://ex2r.fime.uanl.mx/api/Likes",
    method: "POST",
    data: JSON.stringify({
      idPUblicacion: idPublicacion,
      idUsuario: idUsuario,
      llave_Secreta: LLAVE_SECRETA,
    }),
    contentType: "application/json",
  })
    .done(function (result) {
      $(this).css("background-color", "var(--like-color)");
      console.log("yay");
    })
    .fail(function (a, b, c) {
      console.log(b, c);
    });
  // if (!liked) {
  //   liked = true;
  //   likes++;
  //   $(this).text(`${likes} Likes`);
  //   $(this).css("background-color", "var(--like-color)");
  // }
  // // quitar like
  // else {
  //   liked = false;
  //   likes--;
  //   $(this).text(`${likes} Likes`);
  //   $(this).css("background-color", "var(--sin-like-color)");
  // }
});

// unauthorized
// dar comentario
let idComentario = 0;
function comentar(contenido) {
  $.ajax({
    url: "https://ex2r.fime.uanl.mx/api/Comentarios",
    method: "POST",
    data: JSON.stringify({
      idComentario: idComentario,
      idPublicacion: idPublicacion,
      idUsuario: MATRICULA,
      llave_Secreta: MATRICULA.toString,
      contenido: contenido,
    }),
    contentType: "application/json",
  });
  idComentario++;
}

let comentarios = 0;
let comentando = false;
$("#publicaciones").on("click", ".comentar-btn", function () {
  if (!comentando) {
    comentando = true;
    console.log("comentando...");
    console.log(this);
    $(this).siblings(".mostrar-comentarios").after(`
    
      <div id="comentario-div" class="mt-3">
        <form>
          <input id="comentario-field" type="text" placeholder="comenta algo...">
          <button id="comentar-btn" type="submit">Comentar</button>
          <button id="cancelar-btn" type="button">Cancelar</button>
        </form>
      </div>

    `);
  }
  $("#comentar-btn").click(function (e) {
    if (!($("#comentario-field").val().trim() === "")) {
      comentar($("#comentario-field").val().trim());
      comentando = false;
      console.log("comentado!");
      $("#comentario-div").remove();
    }
    e.preventDefault();
  });
  $("#cancelar-btn").click(function (e) {
    comentando = false;
    console.log("cancelado");
    $("#comentario-div").remove();
    e.preventDefault();
  });
});

// mostrar mas comentarios (redirige a pantalla_publicacion.html)
$("#publicaciones").on("click", ".mostrar-comentarios", function () {
  let idSolicitante = MATRICULA;
  let idPublicacion = parseInt($(this).parent().parent().attr("id"));
  let toUrl =
    "../pantalla_publicacion/pantalla_publicacion.html?sol=" +
    idSolicitante +
    "&pub=" +
    idPublicacion;

  console.log(toUrl);
  window.location.href = toUrl;
});
