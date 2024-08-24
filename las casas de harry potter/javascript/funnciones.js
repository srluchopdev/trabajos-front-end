fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('data-container');
        
        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            const name = document.createElement('h2');
            name.textContent = item.nombre;
            
            const house = document.createElement('p');
            house.textContent = `Casa: ${item.casa}`;
            
            card.appendChild(name);
            card.appendChild(house);
            
            container.appendChild(card);
        });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));