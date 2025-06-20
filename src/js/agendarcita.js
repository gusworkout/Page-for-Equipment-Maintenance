document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname;

    if (currentPage.includes("agenda.html")) {

        let citas = [];

        function guardarCitas() {
            localStorage.setItem("citas", JSON.stringify(citas));
        }

        function cargarCitas() {
            const citasGuardadas = localStorage.getItem("citas");
            if (citasGuardadas) {
                citas = JSON.parse(citasGuardadas);
                renderCitas();
            }
        }


        function renderCitas() {
            const lista = document.getElementById("citasRender");
            lista.innerHTML = "";

            citas.forEach((cita, index) => {
                const li = document.createElement("li");
                li.innerHTML = `
      <span class="nombreCita" >${cita.nombre}</span> <span >Realizar: <em class="labelTipoCita">${cita.tipo}</em></span> 
     <div class="contenedorBotones">
      <button class="btnControl editar" data-index="${index}">Modificar</button>
     <button class="btnControl eliminar" data-index="${index}">Eliminar</button>
        </div>`;
                lista.appendChild(li);
            });


            document.querySelectorAll(".eliminar").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const index = e.target.getAttribute("data-index");
                    citas.splice(index, 1);
                    guardarCitas();
                    renderCitas();
                });
            });


            document.querySelectorAll(".editar").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const index = e.target.getAttribute("data-index");
                    const cita = citas[index];

                    document.getElementById("nombre").value = cita.nombre;
                    document.getElementById("correo").value = cita.correo;
                    document.getElementById("telefono").value = cita.telefono;
                    document.getElementById("mensaje").value = cita.mensaje;


                    document.querySelectorAll("input[name='tipoCita']").forEach(radio => {
                        radio.checked = radio.value === cita.tipo;
                    });

                    citas.splice(index, 1);
                    guardarCitas();
                    renderCitas();
                });
            });
        }

        document.querySelector(".confirmarCitas").addEventListener("click", (e) => {
                if (citas.length === 0) {
                    Swal.fire({
                        title: 'Atención',
                        text: 'No hay citas registradas para confirmar.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                    return; 
                }
                const index = e.target.getAttribute("data-index");
                citas.splice(index, 1);
                guardarCitas();
                renderCitas();
                Swal.fire({
                    title: '¡Cita asignada!',
                    text: 'Pronto nos comunicaremos contigo para darte más información.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
            });
        

        document.getElementById("citaForm").addEventListener("submit", function (e) {
            e.preventDefault();

            const cita = {
                nombre: document.getElementById("nombre").value,
                correo: document.getElementById("correo").value,
                telefono: document.getElementById("telefono").value,
                tipo: document.querySelector("input[name='tipoCita']:checked").value,
                mensaje: document.getElementById("mensaje").value
            };

            citas.push(cita);
            guardarCitas();
            this.reset();
            renderCitas();
            Swal.fire({
                title: '¡Cita Registrada!',
                text: 'Tu cita ha sido guardada correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        });




        cargarCitas();
    }
});