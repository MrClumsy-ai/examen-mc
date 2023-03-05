// editar perfil
let editando = false;
$("#editBtn").click(() => {
  if (!editando) {
    editando = true;
    $("#main").append(`
      <center>
        <div id="editar" class="mt-3">
          <button id="editar-foto" class="btn editar-generico">Foto</button>
          <button id="editar-nombre" class="btn editar-generico">Nombre</button>
          <button id="cancelar" class="btn" >cancelar</button>
        </div>
      </center>
    `);

    // cambiar foto
    let editandoFoto = false;
    let editandoNombre = false;
    $("#editar-foto").click(function () {
      if (!editandoFoto) {
        editandoFoto = true;
        editandoNombre = false;
        $("#editar").children("#editar-nombre-div").remove();
        $("#editar").append(`
        <div id="editar-foto-div">
          <form action="/action_page.php">
            <input type="file" id="img" name="img" accept="image/*">
            <input id="foto-btn" value="ok" class="editar-generico" type="button">
            <input id="cancelar-foto" value="cancelar" type="button">
          </form>
        </div>
      `);
      }
      // foto confirmada
      $("#foto-btn").click(function () {
        $("#editar").remove();
        editando = false;
        editandoFoto = false;
      });
      // foto cancelada
      $("#cancelar-foto").click(function () {
        console.log("cancelar foto");
        $("#editar-foto-div").remove();
        editandoFoto = false;
      });
    });
    // cambiar nombre
    $("#editar-nombre").click(function () {
      if (!editandoNombre) {
        editandoNombre = true;
        editandoFoto = false;
        $("#editar").children("#editar-foto-div").remove();
        console.log("nuevo nombre...");
        $("#editar").append(`
          <div id="editar-nombre-div">
            <br>
            <input id="nombre-field" type="text" placeholder="nombre:">
            <input id="nombre-btn" type="submit" value="ok">
            <input id="cancelar-nombre" type="button" value="cancelar">
          </div>
        `);
      }
      // confirmar cambio de nombre
      $("#nombre-btn").click(function () {
        if (!($("#nombre-field").val() === "")) {
          $("#nombre-de-usuario").text($("#nombre-field").val());
          $("#editar").remove();
          editando = false;
          editandoNombre = false;
        } else {
          console.log("no se puede cambiar el nombre a un string vacio");
        }
      });
      // cancelar cambio de nombre
      $("#cancelar-nombre").click(function () {
        $("#editar-nombre-div").remove();
        editandoNombre = false;
      });
    });
    // cancelar edicion
    $("#cancelar").click(function () {
      $("#editar").remove();
      editando = false;
    });
  }
});
