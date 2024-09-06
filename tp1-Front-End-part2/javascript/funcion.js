// URL del archivo JSON
const jsonUrl = '../data.json';

// Función para llenar el select con opciones desde el JSON
async function populateSelect() {
    try {
        const response = await fetch(jsonUrl);
        const data = await response.json();
        const select = document.getElementById('options');

        data.options.forEach(option => {
            const optElement = document.createElement('option');
            optElement.value = option.value;
            optElement.textContent = option.text;
            select.appendChild(optElement);
        });
    } catch (error) {
        console.error('Error al cargar el JSON:', error);
    }
}

// Llamar a la función para llenar el select
populateSelect();

// Listener para el submit del formulario
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    console.log(formObject);
});