let id = 0;

// nueva publicacion
$("#publicar-btn").click(() => {
  id++;
  if(!($("#publicacion-field").val().trim() == "")) {

    $("#publicaciones").prepend(
      `<div id="${id}" class="content">
        <h5>
          Dwayne Johnson
        </h5>
        <button class="borrar">borrar</button>
        <button class="editar">editar</button>
        <p>
          ${$("#publicacion-field").val()}
        </p>
      </div>`
    );
    $("#publicacion-field").val("");
  }

  
});

// borrar publicacion
$("#publicaciones").on("click", ".borrar", function () {
  console.log("publicacion #"+$(this).closest("div").attr("id") + " borrada");
  $(this).closest("div").remove();
});

let editando = false;
// editar publicacion
$("#publicaciones").on("click", ".editar", function () {

  if (!editando){

    editando = true;
    console.log("editando publicacion #"+$(this).closest("div").attr("id")+"...");
    
    $(this).closest("div").append(`
  
      <input 
        class="editar-field" 
        type="text" 
        placeholder="editar:" 
        value="${$(this).closest("p").text()}"
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
  
    `)
    
  }
  
})