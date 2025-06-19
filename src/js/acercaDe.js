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
    document.getElementById("irAHome")?.addEventListener("click", () => {
        window.location.href = "index.html";
    });
});