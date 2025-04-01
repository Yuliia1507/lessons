"use strict"

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const numParticles = 200;
const mouse = { x: null, y: null, radius: 200 };

const colors = ["#ff00ff", "#00ffff", "#ff0000", "#00ff00", "#ffff00", "#ff8800", "#8800ff"];

class Particle {
	constructor(x, y, size, color) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.baseX = x;
		this.baseY = y;
		this.speed = Math.random() * 6 + 2;
	}

	draw() {
		ctx.fillStyle = this.color;
		ctx.shadowBlur = 10;
		ctx.shadowColor = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}

	update() {
		let dx = mouse.x - this.x;
		let dy = mouse.y - this.y;
		let distance = Math.sqrt(dx * dx + dy * dy);
		let forceDirectionX = dx / distance;
		let forceDirectionY = dy / distance;
		let maxDistance = mouse.radius;
		let force = (maxDistance - distance) / maxDistance;
		let directionX = forceDirectionX * force * this.speed * 5;
		let directionY = forceDirectionY * force * this.speed * 5;

		if (distance < mouse.radius) {
			this.x -= directionX;
			this.y -= directionY;
		} else {
			if (this.x !== this.baseX) {
				let dx = this.baseX - this.x;
				this.x += dx * 0.02;
			}
			if (this.y !== this.baseY) {
				let dy = this.baseY - this.y;
				this.y += dy * 0.02;
			}
		}
	}
}

function init() {
	for (let i = 0; i < numParticles; i++) {
		let x = Math.random() * canvas.width;
		let y = Math.random() * canvas.height;
		let size = Math.random() * 10 + 5;
		let color = colors[Math.floor(Math.random() * colors.length)];
		particles.push(new Particle(x, y, size, color));
	}
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	particles.forEach(particle => {
		particle.update();
		particle.draw();
	});
	requestAnimationFrame(animate);
}

window.addEventListener("mousemove", event => {
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

init();
animate();
