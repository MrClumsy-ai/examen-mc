const MATRICULA = 2077725;
const NOMBRE = "Eduardo Menchaca";
const LLAVE_SECRETA = "3246ad77-4eb8-4fc8-a9a1-135901658e3b";
$(document).ready(function () {
  agregarPublicaciones();
});

// jala
// perfecto
function agregarPublicaciones() {
  $.ajax({
    url: "https://ex2r.fime.uanl.mx/api/Publicaciones/all/" + MATRICULA,
    type: "GET",
    datatype: "json",
    crossdomain: true,
  })
    .done(function (result) {
      result.forEach((element) => {
        let textoFecha = element.fechaCreacion;
        let fechaCreacion = moment(textoFecha);
        fechaCreacion.locale("es");
        fechaCreacion = fechaCreacion.fromNow();

        if (element.idUsuario == MATRICULA) {
          $("#publicaciones").append(`
      
            <div id="${element.idPublicacion}" class="content">
              <h5 class="${element.idUsuario}">${element.nombre}
                <span>${element.idUsuario}</span>
              </h5>
              <h6>${fechaCreacion}</h6>
              <button class="borrar">borrar</button>
              <button class="editar">editar</button>
              <p class="contenido-publicacion">${element.contenido}</p>
              <div class="acciones-div">
               <button class="btn btn-dark like-btn ${element.likePropio}"id="${element.likePropio}">${element.cantidadLikes} likes</button>
                <button class="btn btn-dark comentar-btn">comenta algo</button>
                <button class="btn btn-info mostrar-comentarios">Mostrar todos los comentarios(${element.cantidadComentarios})</button>
              </div>
            </div>
      
          `);
        } else {
          $("#publicaciones").append(`
           <div id="${element.idPublicacion}" class="content">
             <h5 class="${element.idUsuario}">${element.nombre}
               <span>${element.idUsuario}</span>
             </h5>
             <h6>${fechaCreacion}</h6>
             <p class="contenido-publicacion">${element.contenido}</p>
             <div class="acciones-div">
               <button class="btn btn-dark like-btn ${element.likePropio}"id="${element.likePropio}">${element.cantidadLikes} likes</button>
               <button class="btn btn-dark comentar-btn">comenta algo</button>
               <button class="btn btn-info mostrar-comentarios">Mostrar todos los comentarios(${element.cantidadComentarios})</button>
             </div>
           </div>
         `);
        }
        if (element.likePropio) {
          // btn.css("background-color", "var(--like-color)");
          $("#true").css("background-color", "var(--like-color)");
        }
      });
    })
    .fail(function (error) {
      console.log("error");
    });
}

let idPublicacion = 9;
// nueva publicacion
// perfecto
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
        llave_Secreta: LLAVE_SECRETA,
        contenido: contenido,
      }),
      contentType: "application/json",
    })
      .done(function (result) {
        location.reload();
      })
      .fail(function (a, b, c) {
        console.log(b, c);
      });
    // borrar esto luego
    $("#publicacion-field").val("");
    idPublicacion++;
  }
  event.preventDefault();
});

// borrar publicacion
// perfecto
$("#publicaciones").on("click", ".borrar", function () {
  let idPublicacion = $(this).closest("div").attr("id");
  let contenido = $(this).siblings("p").text().trim();
  let publicacion = $(this).parent();
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
      publicacion.remove();
    })
    .fail(function (a, b, c) {
      console.log(b, c);
    });
});

let editando = false;
// editar publicacion
// perfecto
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
// perfecto
$("#publicaciones").on("click", ".like-btn", function () {
  let idPublicacion = $(this).parent().parent().attr("id");
  let idUsuario = $(this).parent().parent().children("h5").attr("class");
  let btn = $(this);
  console.log(idPublicacion);
  // not liked
  if (btn.hasClass("true")) {
    console.log("quitando like");
    $.ajax({
      url: "https://ex2r.fime.uanl.mx/api/Likes",
      method: "DELETE",
      data: JSON.stringify({
        idPublicacion: idPublicacion,
        idUsuario: MATRICULA,
        llave_Secreta: LLAVE_SECRETA,
      }),
      contentType: "application/json",
    })
      .done(function (result) {
        let likes = btn.text().slice(0, btn.text().indexOf("l"));
        likes--;
        btn.css("background-color", "black");
        btn.removeClass("true");
        btn.addClass("false");
        btn.text(likes + " likes");
        console.log("yay");
      })
      .fail(function (a, b, c) {
        console.log(b, c);
      });
  } else {
    console.log("poniendo like");
    $.ajax({
      url: "https://ex2r.fime.uanl.mx/api/Likes",
      method: "POST",
      data: JSON.stringify({
        idPublicacion: idPublicacion,
        idUsuario: MATRICULA,
        llave_Secreta: LLAVE_SECRETA,
      }),
      contentType: "application/json",
    })
      .done(function (result) {
        let likes = btn.text().slice(0, btn.text().indexOf("l"));
        likes++;
        btn.removeClass("false");
        btn.addClass("true");
        btn.attr("id");
        btn.css("background-color", "var(--like-color)");
        btn.text(likes + " likes");
        console.log("yay");
      })
      .fail(function (a, b, c) {
        console.log(b, c);
      });
  }
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

// dar comentario
let idComentario = 300;
function comentar(contenido, idPublicacion) {
  $.ajax({
    url: "https://ex2r.fime.uanl.mx/api/Comentarios",
    method: "POST",
    data: JSON.stringify({
      idComentario: idComentario,
      idPublicacion: idPublicacion,
      idUsuario: MATRICULA,
      llave_Secreta: LLAVE_SECRETA,
      contenido: contenido,
    }),
    contentType: "application/json",
  })
    .done(function (result) {
      console.log("ajax jalo (comentar)");
    })
    .fail(function (a, b, c) {
      console.log(b, c);
    });
  idComentario++;
}

// jala perfectamente
let comentando = false;
$("#publicaciones").on("click", ".comentar-btn", function () {
  if (!comentando) {
    comentando = true;
    console.log("comentando...");
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
      let contenido = $("#comentario-field").val().trim();
      let idPublicacion = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .attr("id");
      comentar(contenido, idPublicacion);
      comentando = false;
      console.log("comentado!");
      $("#comentario-div").remove();
    }
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
