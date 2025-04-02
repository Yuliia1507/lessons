"use strict"

const canvas = document.getElementById("smokeCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

const particles = [];

class Particle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = Math.random() * 20 + 10;
		this.opacity = 1;
		this.velocityX = (Math.random() - 0.5) * 1.5;
		this.velocityY = (Math.random() - 0.5) * 1.5;
		this.fadeSpeed = Math.random() * 0.01 + 0.005;
	}

	update() {
		this.x += this.velocityX;
		this.y += this.velocityY;
		this.opacity -= this.fadeSpeed;
		this.size *= 0.98;
	}

	draw() {
		ctx.fillStyle = `rgba(2, 132, 199, ${this.opacity})`;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

function createSmokeEffect(e) {
	for (let i = 0; i < 10; i++) {
		particles.push(new Particle(e.clientX, e.clientY));
	}
}

document.addEventListener("mousemove", createSmokeEffect);

function animate() {
	ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	particles.forEach((particle, index) => {
		particle.update();
		particle.draw();

		if (particle.opacity <= 0) {
			particles.splice(index, 1);
		}
	});

	requestAnimationFrame(animate);
}

animate();