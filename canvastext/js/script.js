"use strict"

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const text = "Canvas";
const fontSize = 300;
const particles = [];
const mouse = { x: null, y: null, radius: 50 };

// Draw text on canvas
ctx.font = `${fontSize}px Arial`;
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText(text, canvas.width / 2, canvas.height / 2);

// Get pixel data
const textData = ctx.getImageData(0, 0, canvas.width, canvas.height);
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Create particles
for (let y = 0; y < canvas.height; y += 6) {
	for (let x = 0; x < canvas.width; x += 6) {
		const index = (y * canvas.width + x) * 4;
		if (textData.data[index + 3] > 128) {
			particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				targetX: x,
				targetY: y,
				vx: 0,
				vy: 0,
			});
		}
	}
}

// Update function
function updateParticles() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	particles.forEach(p => {
		const dx = p.targetX - p.x;
		const dy = p.targetY - p.y;
		p.vx += dx * 0.05;
		p.vy += dy * 0.05;
		p.vx *= 0.6;
		p.vy *= 0.6;
		p.x += p.vx;
		p.y += p.vy;

		// Hover effect
		const distX = p.x - mouse.x;
		const distY = p.y - mouse.y;
		const distance = Math.sqrt(distX * distX + distY * distY);
		if (distance < mouse.radius) {
			const angle = Math.atan2(distY, distX);
			p.vx += Math.cos(angle) * 2;
			p.vy += Math.sin(angle) * 2;
		}

		ctx.fillStyle = "#2dd4bf";
		ctx.fillRect(p.x, p.y, 5, 5);
	});
	requestAnimationFrame(updateParticles);
}
updateParticles();

// Mouse events
canvas.addEventListener("mousemove", (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
});
