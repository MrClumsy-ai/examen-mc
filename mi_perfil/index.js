$(document).ready(function () {
  // agregar publicaciones pasadas
  // $("#publicaciones").prepend(`
  // `);
});

$("#publicar-btn").click(function (e) {
  if ($("#publicacion-field").val().trim() === "") {
    alert("No se puede publicar una publicacion vacia");
  }
  // publicacion valida...
  else {
    console.log($("#publicacion-field").val().trim());
    let nombre = "edy";
    $("#publicaciones").prepend(`
    
      <div class="content">
        <h5>${nombre}</h5>
        <p>
          ${$("#publicacion-field").val().trim()}
        </p>
      </div>
    
    `);
    $("#publicacion-field").val("   ");
  }

  e.preventDefault();
});

// info personal
let toggledInfo = false;
$("#info-personal").click(function () {
  if (toggledInfo) {
    toggledInfo = false;
    $("#info-div").remove();
  } else {
    toggledInfo = true;
    $(this).after(`
  
    <div class="mt-3" id="info-div">
      <ul>
        <li>Nombre: Eduardo Menchaca Cano</li>
        <li>Matricula: 2077725</li>
        <li>Estudiado: Instituto Regiomontano Cumbres</li>
        <li>Pasatiempos: Videojuegos, Musica, Codigos</li>
        <li>Trabajos: Forbidden Coffee Cafeteria</li>
        <li>Conocimientos: C, C++, C#, HTML, CSS, JavaScript, Java, Python, Rust</li>
      </ul>
    </div>

  `);
  }
});
