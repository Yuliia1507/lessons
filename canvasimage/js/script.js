"use strict"

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "img/butterfly.png";

const rows = 50, cols = 50;
const RADIUS = 50;
let pieces = [];
let mouseX = -9999, mouseY = -9999;
let animationFrameId;
let assembling = true;

img.onload = () => {
	console.log("Зображення завантажено!", img.width, img.height);
	canvas.width = img.width;
	canvas.height = img.height;

	createPieces();
	animate();
};

function createPieces() {
	const pieceWidth = img.width / cols;
	const pieceHeight = img.height / rows;

	pieces = [];
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			pieces.push({
				sx: x * pieceWidth,
				sy: y * pieceHeight,
				dx: Math.random() * canvas.width,
				dy: Math.random() * canvas.height,
				tx: x * pieceWidth,
				ty: y * pieceHeight,
				width: pieceWidth,
				height: pieceHeight,
				rotation: Math.random() * 360,
				targetRotation: 0,
				scatteredX: Math.random() * canvas.width,
				scatteredY: Math.random() * canvas.height,
				scatteredRotation: Math.random() * 360
			});
		}
	}
}

function lerp(start, end, t) {
	return start + (end - start) * t;
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	pieces.forEach(piece => {
		const dist = Math.hypot(piece.tx + piece.width / 2 - mouseX, piece.ty + piece.height / 2 - mouseY);
		const insideRadius = dist < RADIUS;

		piece.dx = lerp(piece.dx, insideRadius ? piece.scatteredX : piece.tx, 0.1);
		piece.dy = lerp(piece.dy, insideRadius ? piece.scatteredY : piece.ty, 0.1);
		piece.rotation = lerp(piece.rotation, insideRadius ? piece.scatteredRotation : 0, 0.1);
	});

	pieces.forEach(piece => {
		ctx.save();
		ctx.translate(piece.dx + piece.width / 2, piece.dy + piece.height / 2);
		ctx.rotate((piece.rotation * Math.PI) / 180);
		ctx.drawImage(
			img,
			piece.sx, piece.sy, piece.width, piece.height,
			-piece.width / 2, -piece.height / 2, piece.width, piece.height
		);
		ctx.restore();
	});

	// Якщо анімація збору завершена (усі частинки на своїх місцях)
	if (assembling && pieces.every(piece => Math.abs(piece.dx - piece.tx) < 0.5 && Math.abs(piece.dy - piece.ty) < 0.5)) {
		assembling = false;
	}

	animationFrameId = requestAnimationFrame(animate);
}

canvas.addEventListener("mousemove", e => {
	const rect = canvas.getBoundingClientRect();
	mouseX = e.clientX - rect.left;
	mouseY = e.clientY - rect.top;
});

canvas.addEventListener("mouseleave", () => {
	mouseX = -9999;
	mouseY = -9999;
});
