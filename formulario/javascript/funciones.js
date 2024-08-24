document.getElementById('submitBtn').addEventListener('click', function() {
    const NOMBRE = document.getElementById('NOMBRE').value;
    const APELLIDO= document.getElementById('APELLIDO').value;
    const CARGO = document.getElementById('CARGO').value;
    const textarea1 = document.getElementById('textarea1').value;

    const formData = {
        MONBRE: NOMBRE,
        APELLIDO: APELLIDO,
        CARGO: CARGO,
        textarea1: textarea1
    };

    console.log(formData);
});
