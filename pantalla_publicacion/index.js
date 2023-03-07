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
        swal("No hay texto...")
      }
      e.preventDefault();
    });
    $("#cancelar-btn").click(function (e) {
      comentando = false;
      console.log("comentario cancelado");
      $("#comentario-div").remove();
      e.preventDefault();
    });
  }
  else {
    swal("Ya estas comentando!")
  }
});
