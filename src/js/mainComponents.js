document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname;


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

});
