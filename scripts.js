// script.js

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startAnimation');
    const hero = document.querySelector('.hero');
    const bioCard = document.querySelector('.bio-card'); // Biography Card
    const canvas = document.getElementById('shapeCanvas');
    const shapeCard = document.querySelector('.shape-card'); // Shape Generator Card
    const shapeCol = document.querySelector('.shape-col'); // Shape Generator Column
    const overlay = document.querySelector('.overlay');
    const buttonGroup = document.querySelector('.button-group');

    let shapeInterval;
    let clearCanvasInterval;
    let overlayInterval;

    // Function to generate a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Function to change overlay background color
    function changeOverlayColor() {
        overlay.style.backgroundColor = getRandomColor();
    }

    // Function to start animations
    function startAnimations(event) {
        event.stopPropagation(); // Prevent the click from triggering the document listener

        // 1. Biography Card Falls Down
        bioCard.classList.add('fall-down');

        // 2. Canvas Expands
        shapeCard.classList.add('expand-canvas');

        // 3. Center the Shape Generator Card by adjusting its parent column
        shapeCol.classList.remove('col-md-5');
        shapeCol.classList.add('col-md-6', 'mx-auto'); // Adjust to desired width

        // 4. Background Overlay Starts Shifting Colors
        overlayInterval = setInterval(changeOverlayColor, 2000); // Change color every 2 seconds

        // 5. Remove Start Button
        buttonGroup.innerHTML = ''; // Removes all child elements (Start button)

        // 6. Start Random Shape Generator
        startShapeGenerator();

        // 7. Start Clearing the Canvas Periodically
        startCanvasClearer();

        // 8. Add Event Listener to Stop Animations When Clicking Outside the Shape Card
        document.addEventListener('click', outsideClickListener);
    }

    // Function to stop animations
    function stopAnimations() {
        // 1. Biography Card Returns to Original Position
        bioCard.classList.remove('fall-down');

        // 2. Canvas Returns to Original Size and Shape Generator Stops
        shapeCard.classList.remove('expand-canvas');
        canvas.style.transform = 'scale(1)'; // Ensure scale is reset

        // 3. Reset the Shape Generator Column's Classes
        shapeCol.classList.remove('col-md-6', 'mx-auto');
        shapeCol.classList.add('col-md-5');

        // 4. Stop Background Overlay Shifting Colors
        clearInterval(overlayInterval);
        overlayInterval = null;
        overlay.style.backgroundColor = 'rgba(240, 240, 240, 0.1)'; // Reset to initial color

        // 5. Re-add Start Button
        buttonGroup.innerHTML = `
            <button class="btn btn-outline-primary me-2" id="startAnimation">Start</button>
        `;
        // Reattach event listener to the new Start button
        const newStartButton = document.getElementById('startAnimation');
        newStartButton.addEventListener('click', startAnimations);

        // 6. Remove Event Listener
        document.removeEventListener('click', outsideClickListener);

        // 7. Stop Shape Generator
        stopShapeGenerator();

        // 8. Stop Clearing the Canvas
        stopCanvasClearer();
    }

    // Function to handle clicks outside the Shape Generator Card
    function outsideClickListener(event) {
        const targetElement = event.target; // Clicked element

        // Check if the clicked element is inside the Shape Generator Card
        if (!shapeCard.contains(targetElement)) {
            stopAnimations();
        }
    }

    // Function to start generating shapes
    function startShapeGenerator() {
        if (!shapeInterval) {
            shapeInterval = setInterval(() => {
                drawRandomShape();
            }, 300); // Drawing every 300ms
        }
    }

    // Function to stop generating shapes
    function stopShapeGenerator() {
        if (shapeInterval) {
            clearInterval(shapeInterval);
            shapeInterval = null;
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        }
    }

    // Function to clear the canvas periodically
    function startCanvasClearer() {
        if (!clearCanvasInterval) {
            clearCanvasInterval = setInterval(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }, 10000); // Clear every 10 seconds
        }
    }

    function stopCanvasClearer() {
        if (clearCanvasInterval) {
            clearInterval(clearCanvasInterval);
            clearCanvasInterval = null;
        }
    }

    // Event Listener for Start Button
    startButton.addEventListener('click', startAnimations);

    // Random Shape Generator Enhanced with Lines (Existing Functionality)
    const ctx = canvas.getContext('2d');

    // Resize canvas to fit its container
    function resizeCanvas() {
        canvas.width = shapeCard.clientWidth - 40; // Adjust for padding
        canvas.height = 300; // Fixed height as per card
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Generate a random shape or line
    function drawRandomShape() {
        const shapeType = Math.floor(Math.random() * 4); // 0: circle, 1: rectangle, 2: triangle, 3: line
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 50 + 10;
        ctx.lineWidth = Math.random() * 3 + 1; // Random line width between 1 and 4

        switch (shapeType) {
            case 0: // Circle
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fillStyle = getRandomColor();
                ctx.fill();
                ctx.strokeStyle = getRandomColor();
                ctx.stroke();
                break;
            case 1: // Rectangle
                ctx.fillStyle = getRandomColor();
                ctx.fillRect(x, y, size, size);
                ctx.strokeStyle = getRandomColor();
                ctx.strokeRect(x, y, size, size);
                break;
            case 2: // Triangle
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + size, y);
                ctx.lineTo(x + size / 2, y - size);
                ctx.closePath();
                ctx.fillStyle = getRandomColor();
                ctx.fill();
                ctx.strokeStyle = getRandomColor();
                ctx.stroke();
                break;
            case 3: // Line
                const xEnd = Math.random() * canvas.width;
                const yEnd = Math.random() * canvas.height;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(xEnd, yEnd);
                ctx.strokeStyle = getRandomColor();
                ctx.stroke();
                break;
            default:
                break;
        }
    }
});
