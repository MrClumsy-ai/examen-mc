const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idSolicitante = urlParams.get("sol");
const idPublicacion = urlParams.get("pub");
const LLAVE_SECRETA = "3246ad77-4eb8-4fc8-a9a1-135901658e3b";
const MATRICULA = 2077725;

$(document).ready(function () {
  agregarPublicacion();
  agregarComentarios();
});
function agregarPublicacion() {
  $.ajax({
    url:
      "https://ex2r.fime.uanl.mx/api/Publicaciones/" +
      idSolicitante +
      "/" +
      idPublicacion,
    type: "GET",
    datatype: "json",
    crossdomain: true,
  })
    .done(function (element) {
      if (element.idUsuario == MATRICULA) {
        $("#publicaciones").append(`
      
            <div id="${element.idPublicacion}" class="content">
              <h5 class="${element.idUsuario}">${element.nombre}
                <span>${element.idUsuario}</span>
              </h5>
              <h6>${element.fechaCreacion}</h6>
              <button class="borrar">borrar</button>
              <button class="editar">editar</button>
              <p class="contenido-publicacion">${element.contenido}</p>
              <div class="acciones-div">
               <button class="btn btn-dark like-btn ${element.likePropio}"id="${element.likePropio}">${element.cantidadLikes} likes</button>
                <button class="btn btn-dark comentar-btn">comenta algo</button>
              </div>
            </div>
      
          `);
      } else {
        $("#publicaciones").append(`
           <div id="${element.idPublicacion}" class="content">
             <h5 class="${element.idUsuario}">${element.nombre}
               <span>${element.idUsuario}</span>
             </h5>
             <h6>${element.fechaCreacion}</h6>
             <p class="contenido-publicacion">${element.contenido}</p>
             <div class="acciones-div">
               <button class="btn btn-dark like-btn ${element.likePropio}"id="${element.likePropio}">${element.cantidadLikes} likes</button>
               <button class="btn btn-dark comentar-btn">comenta algo</button>
             </div>
           </div>
         `);
      }
      if (element.likePropio) {
        // btn.css("background-color", "var(--like-color)");
        $("#true").css("background-color", "var(--like-color)");
      }
    })
    .fail(function (a, b, c) {
      console.log(b, c);
    });
}
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
          // el id de comentario esta en el p, hijo del div content
          $("#main").append(`

            <div id="${element.idPublicacion}" class="content">
              <h5 class="${element.idUsuario}">${element.nombre}
                <span>${element.idUsuario}</span>
              </h5>
              <button class="borrar">borrar</button>
              <button class="editar">editar</button>
              <h6>${element.fechaCreacion}</h6>
              <p id="${element.idComentario}" class="contenido-publicacion">${element.contenido}</p>
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
  console.log(btn.hasClass("true"));
  // not liked
  if (btn.hasClass("true")) {
    console.log("quitando like");
    $.ajax({
      url: "https://ex2r.fime.uanl.mx/api/Likes",
      method: "DELETE",
      data: JSON.stringify({
        idPUblicacion: idPublicacion,
        idUsuario: idUsuario,
        llave_Secreta: LLAVE_SECRETA,
      }),
      contentType: "application/json",
    })
      .done(function (result) {
        let likes = btn.text().slice(0, btn.text().indexOf("l"));
        console.log(btn.attr("id"));
        likes--;
        console.log(likes);
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
        idPUblicacion: idPublicacion,
        idUsuario: idUsuario,
        llave_Secreta: LLAVE_SECRETA,
      }),
      contentType: "application/json",
    })
      .done(function (result) {
        let likes = btn.text().slice(0, btn.text().indexOf("l"));
        console.log(btn.attr("id"));
        likes++;
        console.log(likes);
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
// jala perfectamente
let idComentario = 0;
function comentar(contenido, idPublicacion) {
  console.log(idComentario, idPublicacion, MATRICULA, LLAVE_SECRETA, contenido);
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
      idComentario++;
      location.reload();
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
    console.log(this);
    $(this).after(`
    
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
      console.log(contenido, idPublicacion);
      comentando = false;
      console.log("comentado!");
      $("#comentario-div").remove();
      comentar(contenido, idPublicacion);
    }
  });
  $("#cancelar-btn").click(function (e) {
    comentando = false;
    console.log("cancelado");
    $("#comentario-div").remove();
    e.preventDefault();
  });
});

// jala
let editandoCom = false;
$("#main").on("click", ".editar", function () {
  if (!editandoCom) {
    let idPublicacion = $(this).closest("div").attr("id");
    console.log(idPublicacion);

    editandoCom = true;
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
      editandoCom = false;
    });
    // para re-publicar
    let field = $(this).siblings("#editar").children(".editar-field");
    $(".republicar-btn").click(function () {
      console.log($(this));
      $.ajax({
        url: "https://ex2r.fime.uanl.mx/api/Comentarios/" + idCom,
        method: "PUT",
        data: JSON.stringify({
          idComentario: idCom,
          idPublicacion: idPublicacion,
          idUsuario: MATRICULA,
          llave_Secreta: LLAVE_SECRETA,
          contenido: field.val(),
        }),
        contentType: "application/json",
      })
        .done(function (result) {
          console.log("yay");
          location.reload();
        })
        .fail(function (a, b, c) {
          console.log(b, c);
        });
    });
  }
  let comentarioDiv = $(this).parent();
  let idCom = $(this).parent().children("p").attr("id");
  $(this).parent().after(`
  
  
  `);
});

// jala
$("#main").on("click", ".borrar", function () {
  let comentarioDiv = $(this).parent();
  let idComentario = $(this).siblings("p").attr("id");
  let contenido = $(this).siblings("p").text();
  console.log(idComentario, idPublicacion, MATRICULA, LLAVE_SECRETA, contenido);
  $.ajax({
    url: "https://ex2r.fime.uanl.mx/api/Comentarios/" + idComentario,
    method: "DELETE",
    data: JSON.stringify({
      idComentario: parseInt(idComentario),
      idPublicacion: parseInt(idPublicacion),
      idUsuario: MATRICULA,
      llave_Secreta: LLAVE_SECRETA,
      contenido: contenido,
    }),
    contentType: "application/json",
  })
    .done(function (result) {
      console.log("yay");
      comentarioDiv.remove();
    })
    .fail(function (a, b, c) {
      console.log(b, c);
    });
});
