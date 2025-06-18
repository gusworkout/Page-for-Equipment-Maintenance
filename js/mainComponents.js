function carrusel() {
    const carrusel = document.querySelector('.carrusel');
    const carruselItems = document.querySelectorAll('.carrusel-item');
    let currentIndex = 0;

    function showItem(index) {
        carruselItems.forEach((item, i) => {
            item.style.display = (i === index) ? 'block' : 'none';
        });
    }

    function nextItem() {
        currentIndex = (currentIndex + 1) % carruselItems.length;
        showItem(currentIndex);
    }

    setInterval(nextItem, 3000); // Cambia cada 3 segundos
    showItem(currentIndex);
}


function initComponents() {
    carrusel();
}

document.addEventListener('DOMContentLoaded', initComponents);