const carousel = document.querySelector('.carousel');
        const images = document.querySelectorAll('.carousel img');
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');

        let index = 0;

        function showNextImage() {
            if (index >= images.length - 1) {
                index = 0;
            } else {
                index++;
            }
            carousel.style.transform = `translateX(${-index * 320}px)`;
        }

        function showPrevImage() {
            if (index <= 0) {
                index = images.length - 1;
            } else {
                index--;
            }
            carousel.style.transform = `translateX(${-index * 320}px)`;
        }

        nextButton.addEventListener('click', showNextImage);
        prevButton.addEventListener('click', showPrevImage);