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

    // ----------- Móvil -----------
    document.getElementById("irAgendaMobile")?.addEventListener("click", () => {
        window.location.href = "agenda.html";
    });

    document.getElementById("IrAcercaDeMobile")?.addEventListener("click", () => {
        window.location.href = "acercade.html";
    });

    document.getElementById("irHomeMobile")?.addEventListener("click", () => {
        window.location.href = "index.html";
    });


    // ----------- Funcionalidad agenda.html -----------
    if (currentPage.includes("agenda.html")) {

        let citas = [];

        // Función para guardar en localStorage
        function guardarCitas() {
            localStorage.setItem("citas", JSON.stringify(citas));
        }

        // Función para cargar citas desde localStorage
        function cargarCitas() {
            const citasGuardadas = localStorage.getItem("citas");
            if (citasGuardadas) {
                citas = JSON.parse(citasGuardadas);
                renderCitas();
            }
        }

        // Función para renderizar las citas
        function renderCitas() {
            const lista = document.getElementById("citasRender");
            lista.innerHTML = ""; // Limpia lista

            citas.forEach((cita, index) => {
                const li = document.createElement("li");
                li.innerHTML = `
      <strong>${cita.nombre}</strong> - ${cita.correo} - ${cita.telefono} - 
      <em>${cita.tipo}</em>
      <br>
      <button class="btn-editar" data-index="${index}">Modificar</button>
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

        // Evento al enviar formulario
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
        });

        // Inicializar
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
