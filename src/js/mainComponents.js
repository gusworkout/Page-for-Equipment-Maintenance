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
        const citas = [];

        const form = document.getElementById("citaForm");
        const listaCitas = document.getElementById("citasRender");

        if (form && listaCitas) {
            form.addEventListener("submit", function (e) {
                e.preventDefault();

                const nombre = document.getElementById("nombre").value;
                const telefono = document.getElementById("telefono").value;
                const tipoCita = document.querySelector('input[name="tipoCita"]:checked')?.value;
                const correo = document.getElementById("correo").value;
                const mensaje = document.getElementById("mensaje").value;

                const nuevaCita = {
                    id: "CITA-" + String(citas.length + 1).padStart(4, "0"),
                    posicion: citas.length + 1,
                    nombre,
                    telefono,
                    tipoCita,
                    correo,
                    mensaje
                };

                citas.push(nuevaCita);
                renderizarCitas();
                form.reset();
                form.querySelector('input[name="tipoCita"]').checked = true;
            });

            function renderizarCitas() {

                listaCitas.innerHTML = "";

                if (citas.length === 0) {
                    const mensaje = document.createElement("p");
                    mensaje.textContent = "No hay citas en el momento, será el primero en atender.";
                    mensaje.style.color = "#666";
                    mensaje.style.fontStyle = "italic";
                    listaCitas.appendChild(mensaje);
                    return;
                }

                citas.forEach((cita) => {
                    const li = document.createElement("li");
                    li.textContent = `[#${cita.id}] Posición: ${cita.posicion} - ${cita.nombre} (${cita.tipoCita})`;
                    listaCitas.appendChild(li);
                });
            }

            // Mostrar mensaje por defecto al cargar
            renderizarCitas();

        }
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
