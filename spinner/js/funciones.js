document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('spinner').classList.add('active');
});

document.getElementById('stopButton').addEventListener('click', function() {
    document.getElementById('spinner').classList.remove('active');
});