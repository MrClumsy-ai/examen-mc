let id = 0;

// nueva publicacion
$("#publicar-btn").click(function (event) {
  id++;
  if (!($("#publicacion-field").val().trim() == "")) {
    $("#publicaciones").prepend(
      `<div id="${id}" class="content">
        <h5>
          Dwayne Johnson
        </h5>
        <button class="borrar">borrar</button>
        <button class="editar">editar</button>
        <p class="contenido-publicacion">
          ${$("#publicacion-field").val()}
        </p>
      </div>`
    );
    $("#publicacion-field").val("");
    console.log(event);
  }
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
