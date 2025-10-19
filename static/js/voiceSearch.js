// Verificar compatibilidad con la API de voz
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!window.SpeechRecognition) {
    console.warn("Este navegador no soporta reconocimiento de voz.");
} else {
    const recognition = new window.SpeechRecognition();
    recognition.lang = 'es-ES'; // Idioma español
    recognition.continuous = false;
    recognition.interimResults = false;

    const micButton = document.getElementById('voice-search-button');
    const micIndicator = document.getElementById('mic-status-indicator');

    micButton.addEventListener('click', () => {
        recognition.start();
        micIndicator.classList.remove('hidden');
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        console.log("Dijiste:", transcript);
        micIndicator.classList.add('hidden');

        buscarProducto(transcript);
    };

    recognition.onerror = (event) => {
        console.error("Error de voz:", event.error);
        micIndicator.classList.add('hidden');
    };

    recognition.onend = () => {
        micIndicator.classList.add('hidden');
    };

    function buscarProducto(nombre) {
    nombre = nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    const productos = document.querySelectorAll('.product-card');
    let encontrado = false;

    productos.forEach(producto => {
        const tituloElem = producto.querySelector('h3');
        const titulo = tituloElem.innerText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        if (titulo.includes(nombre)) {
            producto.classList.remove('hidden'); // Mostrar coincidencia
            encontrado = true;
            // ✨ efecto visual para resaltarlo
            producto.classList.add('ring-4', 'ring-blue-500', 'transition');
            producto.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            producto.classList.add('hidden'); // Ocultar no coincidentes
        }
    });

    if (!encontrado) {
        alert(`No se encontró ningún producto que coincida con: "${nombre}"`);
    }
}

}
