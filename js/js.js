document.addEventListener('DOMContentLoaded', function()
{
    var apiUrl = 'https://paginas-web-cr.com/Api/apis/ListaEstudiantes.php'
    var ApiBorrarEstudiante = "https://paginas-web-cr.com/Api/apis/BorrarEstudiantes.php'"
    var APIActualizarEstudiante = 'https://paginas-web-cr.com/Api/apis/ActualizarEstudiantes.php';
    var modal2 = new bootstrap.Modal(document.getElementById('modal2'));
    var modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'));
    var formActualizar = document.getElementById('formActualizar');
    var table = new Tabulator('#tabla-estudiante', {
        columnDefaults:{ /// a todas las columnas
            vertAlign:"middle"
        },
        layout: "fitColumns",
        height: "100%",
        minHeight: 300,
        minWidth: 150,
        rowHeight: 40,
        columnsDefaults: {
            width: 200, 
        },
        pagination:"local",
        paginationSize: 10,
        paginationCounter: "rows",   
    }); 
    
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
       var columns = [
        { title: "ID", field: "id", visible: false, resizable: false, hozAlign: "center", sorter: "number" },
        {
            title: "Informacion personal",
            columns: [
                {title:"Identificador", field:"cedula", headerFilter:"input", hozAlign:"center", sorter: "string", width: 150 },
                {title:"Nombre", field:"nombre", hozAlign: "center", sorter:"string", width:130,  },
                {title:"Apellido Paterno", field:"apellidopaterno", hozAlign:"center", sorter:"string", width: 115},
                {title:"Apellido Materno", field:"apellidomaterno", visible: false, hozAlign: "center", sorter:"string"},
                {title:"Fecha de nacimiento", field:"fechanacimiento", visible: false, hozAlign: "center", sorter:"date"},
                {title:"Genero", field:"sexo",  hozAlign: "center", sorter:"string", width: 100},
                {title:"Direccion", field:"direccion", hozAlign: "center", sorter:"string"},
                {title:"Nacionalidad", field:"nacionalidad", hozAlign: "center", sorter:"string", width: 120},
                {title:"ID Carreras", field:"idCarreras", visible: false, hozAlign: "center", sorter:"number"}

            ]
            

        },
        {
            title: "Informacion de Trabajo",
            columns: [
                {title:"Email", field:"correoelectronico", hozAlign:"center", sorter: "string"},
                {title:"Telefono", field:"telefono", hozAlign:"center", sorter: "number", width: 100 },
                {title:"Usuario", field:"usuario", hozAlign:"center", sorter: "string", width: 100 },
                {title:"Telefono Celular", visible: true, field:"telefonocelular", hozAlign:"center", sorter: "number" }
            ]

        },
        {
            title: "Acciones", field: "accion", formatter: function(){
                return '<button class="btn btn-primary btn-sm btn-edit"> Editar</button> <button id="btn-Eliminar" class="btn btn-danger btn-sm btn-delete">Eliminar</button>';
                }, hozAlign: "center", headerSort: false, width: 200
        }
 
    ];
    table.setColumns(columns);
    table.setData(data.data)


    document.getElementById('tabla-estudiante').addEventListener('click', function (event){
       ///optiene el  elemento que disparo el evento clic
        var target = event.target;

        if(target.classList.contains('btn-delete')){
            var row = table.getRow(target.closest('.tabulator-row'));

            //verifica que la fila existe antes de continuar
            if (row){
                var rowData = row.getData();
                // llamar a la funcion para eliminar datos de la fi;a
                abrirEliminar(rowData.nombre);

                
             }
        } 

        if(target.classList.contains('btn-edit')){
            var row = table.getRow(target.closest('.tabulator-row'));

            //verifica que la fila existe antes de continuar
            if (row){
                var rowData = row.getData();
                abrirEditar(rowData); // llamar a la funcion para eliminar datos de la fi;a

                
             }
        } 
    
        });

        formActualizar.addEventListener('submit', function(event){
            event.preventDefault();
            // Obtiene la fila actualizada desde la tabla
            var row = table.getRows().find(row => row.getData().id === document.getElementById('id').value);
            // verifica que la fila existe antes de continuar
            if(row) {
                var updateData = {
                    id: document.getElementById('id').value,
                    cedula: document.getElementById('identificador').value,
                    correoelectronico: document.getElementById('email').value,
                    telefono: document.getElementById('telefono').value,
                    telefonocelular: document.getElementById('telefonoC').value,
                    fechanacimiento: document.getElementById('fechaN').value,
                    sexo: document.getElementById('sexo').value,
                    direccion: document.getElementById('direccion').value,
                    nacionalidad: document.getElementById('nacionalidad').value,
                    nombre: document.getElementById('nombre').value,
                    apellidopaterno: document.getElementById('apellidoP').value,
                    apellidomaterno: document.getElementById('apellidoM').value,
                    idCarreras: document.getElementById('grupo').value,
                    usuario: document.getElementById('usuario').value,
            };
            actualizarEstudiante(row, updateData);
            }
        }); 

    })
    .catch(error => console.error('Error al cargar los datos desde la API', error));

    function abrirEliminar(nombre) {
        document.getElementById('parrafo').innerHTML = `Estas seguro de que deseas eliminar al estudiante ${nombre}?`  
        modal2.show();
    }

    function abrirEditar(data) {
        document.getElementById('id').value = data.id;
        document.getElementById('identificador').value = data.cedula;
        document.getElementById('email').value = data.correoelectronico;
        document.getElementById('telefono').value = data.telefono;
        document.getElementById('telefonoC').value = data.telefonocelular;
        document.getElementById('fechaN').value = data.fechanacimiento;
        document.getElementById('sexo').value = data.sexo;
        document.getElementById('direccion').value = data.direccion;
        document.getElementById('nacionalidad').value = data.nacionalidad;
        document.getElementById('nombre').value = data.nombre;
        document.getElementById('apellidoP').value = data.apellidopaterno;
        document.getElementById('apellidoM').value = data.apellidomaterno;
        document.getElementById('grupo').value = data.idCarreras;
        document.getElementById('usuario').value = data.usuario;
        modalEditar.show();
    }

    function actualizarEstudiante(row, rowdata){
        fetch(APIActualizarEstudiante,
        {
           method:"POST",
          body:JSON.stringify(rowdata)
       })//url de peticion de datos
       .then(respuesta => respuesta.json())//recibe los datos en formato json
       .then((datosrepuesta) => {    
        if(datosrepuesta.data){
            row.update();
           mostrarConfirmacion();
           setTimeout(function(){
            window.location.reload();
           }, 2000);
           
        }else{
            showErrorActualizar();
        }   
     
          })
          .catch(error => console.error('Error en la solicitud de actualización', error));
    }

    function showErrorActualizar(){
        document.getElementById('parrafo').innerHTML = `Ha surgido un error al intentar actualizar el estudiante`  
        modal2.show();
    }

    function mostrarConfirmacion(){
        document.getElementById('parrafo').innerHTML = `Estudiante actualizado correctamente`  
        modal2.show();
    }
})