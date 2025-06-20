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


    document.getElementById("IrAServiciosMobile")?.addEventListener("click", () => {
        window.location.href = "index.html#comunicarse";

    });
});


