// script.js

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startAnimation');
    const stopButton = document.getElementById('stopAnimation');
    const header = document.querySelector('.header');

    let animationId;
    let shapeInterval;

    // Create Keyframes Dynamically
    const createKeyframes = () => {
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        const keyframes = `
            @keyframes colorShift {
                0% { background-color: #0d6efd; }
                25% { background-color: #dc3545; }
                50% { background-color: #ffc107; }
                75% { background-color: #198754; }
                100% { background-color: #0d6efd; }
            }
        `;
        styleSheet.innerHTML = keyframes;
        document.head.appendChild(styleSheet);
    };

    createKeyframes();

    // Start Animation
    startButton.addEventListener('click', () => {
        header.style.animation = 'colorShift 10s infinite';
        startShapeGenerator();
    });

    // Stop Animation
    stopButton.addEventListener('click', () => {
        header.style.animation = '';
        stopShapeGenerator();
    });

    // Random Shape Generator Inspired by TempleOS
    const canvas = document.getElementById('shapeCanvas');
    const ctx = canvas.getContext('2d');

    // Resize canvas to full screen
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Generate a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Generate a random shape
    function drawRandomShape() {
        const shapeType = Math.floor(Math.random() * 3); // 0: circle, 1: rectangle, 2: triangle
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 50 + 10;
        ctx.fillStyle = getRandomColor();
        ctx.strokeStyle = getRandomColor();
        ctx.lineWidth = 2;

        switch (shapeType) {
            case 0: // Circle
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                break;
            case 1: // Rectangle
                ctx.fillRect(x, y, size, size);
                ctx.strokeRect(x, y, size, size);
                break;
            case 2: // Triangle
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + size, y);
                ctx.lineTo(x + size / 2, y - size);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                break;
            default:
                break;
        }
    }

    // Start generating shapes
    function startShapeGenerator() {
        if (!shapeInterval) {
            shapeInterval = setInterval(drawRandomShape, 500);
        }
    }

    // Stop generating shapes
    function stopShapeGenerator() {
        if (shapeInterval) {
            clearInterval(shapeInterval);
            shapeInterval = null;
        }
    }
});
