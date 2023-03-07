$(document).ready(function () {
  // agregar publicaciones recientes
  // $("#publicaciones").prepend(`
  // `);
});

let id = 0; // quitar esto luego
// nueva publicacion
$("#publicar-btn").click(function (event) {
  let numLikes = 0;
  let numComenarios = 0;
  id++; // quitar esto luego

  if (!($("#publicacion-field").val().trim() == "")) {
    let name = "Joe biden"; // quitar esto luego
    $("#publicaciones").prepend(
      `<div id="${id}" class="content">
        <h5>
          ${name}
        </h5>
        <button class="borrar">borrar</button>
        <button class="editar">editar</button>
        <p class="contenido-publicacion">
          ${$("#publicacion-field").val()}
        </p>
        <div class="acciones-div">
          <button class="btn btn-dark like-btn">${numLikes} Likes</button>
          <button class="btn btn-dark comentar-btn">Comenta algo</button>
          <button class="btn btn-info mostrar-comentarios">Mostrar todos los comentarios (${numComenarios})</button>
        </div>
      </div>`
    );
    $("#publicacion-field").val("");
  }
  event.preventDefault();
});

// borrar publicacion
$("#publicaciones").on("click", ".borrar", function () {
  console.log("publicacion #" + $(this).closest("div").attr("id") + " borrada");
  $(this).closest("div").remove();
});

let editando = false;
// editar publicacion
$("#publicaciones").on("click", ".editar", function () {
  // hace para que solo salga 1 caja de editar
  if (!editando) {
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
        $("#editar").remove();
        editando = false;
        console.log("done!");
      } else {
        console.log("no se puede re-publicar un string vacio");
      }
    });
  }
});

// like
let liked = false;
let likes = 0;
$("#publicaciones").on("click", ".like-btn", function () {
  // dar like
  if (!liked) {
    liked = true;
    likes++;
    $(this).text(`${likes} Likes`);
    $(this).css("background-color", "var(--like-color)");
  }
  // quitar like
  else {
    liked = false;
    likes--;
    $(this).text(`${likes} Likes`);
    $(this).css("background-color", "var(--sin-like-color)");
  }
});

// dar comentario
let comentarios = 0;
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
  window.location.href = "../pantalla_publicacion/pantalla_publicacion.html";
});
