var contenidoMenu = document.querySelector("#menu");

contenidoMenu.innerHTML +=
`<nav class="navbar navbar-expand-lg navbar-dark bg-dark text-white "  >
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="Imagenes/logo1.png" alt="" width="70" height="54" class="d-inline-block align-text-top rounded-circle">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class=" collapse navbar-collapse  " id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">

          <li class="nav-item ">
              <a class="nav-link " href="inicio.html">
                Inicio
              </a>
          <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"href="#">Insertar Datos</a>
          <ul class="dropdown-menu bg-secondary">
            <li>
              <a class="dropdown-item" href="InsertarCurso.html"> Insertar Curso</a>
            </li>
            <li>
              <a class="dropdown-item" href="InsertarEstudiantes.html"> Insertar  Estudiante</a >
            </li>
            <li>
              <a class="dropdown-item" href="InsertarProfesor.html"> Insertar  Profesor</a>
            </li>
            <li>
              <a class="dropdown-item" href="InsertarGrupo.html"> Insertar Grupo</a>
            </li>
          
          </ul>
        </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"  href="#" >Listas</a>
              <ul class="dropdown-menu bg-secondary">
                <li>
                  <a class="dropdown-item" href="listaEstudantes.html"
                    > Estudiantes</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="listaProfesores.html"
                    > Profesores</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="listarcurso.html"
                    > Cursos</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="listaGrupo.html"
                    > Grupos</a
                  >
                </li>
                
                
                
              </ul>
            </li>
             
          </ul>
  
        </div>
      </div>
    </nav>`
  