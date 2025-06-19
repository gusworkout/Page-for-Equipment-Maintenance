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
            lista.innerHTML = ""; // Limpia lista

            citas.forEach((cita, index) => {
                const li = document.createElement("li");
                li.innerHTML = `
      <span class="nombreCita" >${cita.nombre}</span> <span >Realizar: <em class="labelTipoCita">${cita.tipo}</em></span> 
     
      <button class="btn-editar" data-index="${index}">Modificar <svg class="svg" viewBox="0 0 512 512">
        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg></button>
    <button class="btn-eliminar" data-index="${index}"><span class="text">Eliminar</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
        `;
                lista.appendChild(li);
            });


            document.querySelectorAll(".btn-eliminar").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const index = e.target.getAttribute("data-index");
                    citas.splice(index, 1);
                    guardarCitas();
                    renderCitas();
                });
            });


            document.querySelectorAll(".btn-editar").forEach(btn => {
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
