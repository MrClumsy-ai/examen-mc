const MATRICULA = 2077725;
// agregar las publicaciones
$(document).ready(function () {
  agregarPublicaciones();
});

function agregarPublicaciones() {
  $.ajax({
    url: "https://ex2r.fime.uanl.mx/api/Likes/" + MATRICULA + "/" + MATRICULA,
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
