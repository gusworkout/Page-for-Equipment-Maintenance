document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname;

    const scrollToOrRedirect = (hash) => {
        if (currentPage.includes("index.html") || currentPage === "/" || currentPage === "/index") {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
            window.location.href = `index.html${hash}`;
        }
    };

    // ----------- Escritorio -----------
    document.getElementById("irAgenda")?.addEventListener("click", () => {
        window.location.href = "agenda.html";
    });

    document.getElementById("IrAcercaDe")?.addEventListener("click", () => {
        window.location.href = "acercade.html";
    });

    document.getElementById("IrAServicios")?.addEventListener("click", () => {
        scrollToOrRedirect("#comunicarse");

    });

    document.getElementById("irHome")?.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    // Chat Whatsapp
    const btn = document.getElementById("btnWhatsApp");

    if (btn) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const numero = "573059230920";
            const mensaje = "Hola, estoy interesado en sus servicios de mantenimiento.";
            const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

            window.open(url, "_blank");
        });
    }
    const btnSoporte = document.getElementById("IrAWhatsappSoporte");

    if (btn) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const numero = "573059230920";
            const mensaje = "Hola, tengo una consulta sobre la pagina de mantenimientos.";
            const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

            window.open(url, "_blank");
        });
    }



    // ----------- Funcionalidad agenda.html -----------
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

    document.getElementById("numeroAllamar").addEventListener("submit", function (e) {
        e.preventDefault();
        const tel = document.getElementById("numerotelefono").value
        if (tel != "" && tel.toString().length > 9) {
            Swal.fire({
                title: '¡Espera tu llamada pronto!',
                text: 'Tu numero ha sido guardado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
                
            });
            this.reset();
        }else{
            Swal.fire({
                title: '¡Espera!',
                text: 'Compureba que estas escribiendo bien tu numero.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
                
            });
        }

        
        
    });

    const likeCheckbox = document.getElementById("like-checkbox");
    const dislikeCheckbox = document.getElementById("dislike-checkbox");

    const likeCountElement = document.querySelector(".like-text-content");
    const dislikeCountElement = document.querySelector(".dislike-text-content");


    let likeCount = parseInt(likeCountElement.textContent);
    let dislikeCount = parseInt(dislikeCountElement.textContent);


    likeCheckbox.addEventListener("change", () => {
        if (likeCheckbox.checked) {
            likeCount++;
            likeCountElement.textContent = likeCount;

            if (dislikeCheckbox.checked) {
                dislikeCheckbox.checked = false;
                dislikeCount = Math.max(0, dislikeCount - 1);
                dislikeCountElement.textContent = dislikeCount;
            }
        } else {
            likeCount = Math.max(0, likeCount - 1);
            likeCountElement.textContent = likeCount;
        }
    });

    dislikeCheckbox.addEventListener("change", () => {
        if (dislikeCheckbox.checked) {
            dislikeCount++;
            dislikeCountElement.textContent = dislikeCount;

            if (likeCheckbox.checked) {
                likeCheckbox.checked = false;
                likeCount = Math.max(0, likeCount - 1);
                likeCountElement.textContent = likeCount;
            }
        } else {
            dislikeCount = Math.max(0, dislikeCount - 1);
            dislikeCountElement.textContent = dislikeCount;
        }
    });



});
