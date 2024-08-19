document.addEventListener('DOMContentLoaded', () => {
    const imageColumns = document.querySelectorAll('.image-column');

    imageColumns.forEach(column => {
        column.addEventListener('mouseenter', () => {
            column.style.animationPlayState = 'paused';
        });

        column.addEventListener('mouseleave', () => {
            column.style.animationPlayState = 'running';
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.cards');
    const cards = document.querySelectorAll('.card');
    const cardWidth = cards[0].offsetWidth + 20; // Include margin
    let currentIndex = 0;

    function moveCarousel() {
        currentIndex++;
        if (currentIndex >= cards.length) {
            // Reset to the beginning when we reach the end
            currentIndex = 0;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(0)`;
            // Force reflow
            carousel.offsetHeight;
            carousel.style.transition = 'transform 0.5s ease';
        } else {
            carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
    }

    // Move the carousel every 5 seconds
    setInterval(moveCarousel, 5000);

    // Handle navigation buttons
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            clearInterval(intervalId);
            
            if (index === 0) {
                // Left button
                currentIndex = Math.max(0, currentIndex - 1);
            } else {
                // Right button
                currentIndex = Math.min(cards.length - 1, currentIndex + 1);
            }
            carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            
            // Restart auto-scrolling after manual navigation
            setTimeout(() => {
                clearInterval(intervalId);
                intervalId = setInterval(moveCarousel, 5000);
            }, 5000);
        });
    });

    // Handle pillar buttons (unchanged)
    const pillarButtons = document.querySelectorAll('.pillars button');
    pillarButtons.forEach(button => {
        button.addEventListener('click', () => {
            pillarButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});