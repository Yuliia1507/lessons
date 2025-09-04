"use strict"

// Отримуємо елемент canvas з HTML та його 2D контекст для малювання
const canvas = document.getElementById('glitchCanvas');
const ctx = canvas.getContext('2d');

// Основні налаштування
const fontSize = 16; // розмір шрифту для символів
const charWidth = 10; // приблизна ширина символу для сітки
const charHeight = 20; // приблизна висота символу для сітки
const glitchColors = ['#2b4539', '#61dca3', '#61b3dc']; // кольори для глітчу
const lettersAndSymbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>,0123456789'.split(''); // масив символів

let letters = []; // масив об'єктів символів на екрані
let grid = { columns: 0, rows: 0 }; // кількість колонок і рядків у сітці

// Функція для налаштування розмірів канвасу та ініціалізації сітки символів
function resizeCanvas() {
	// Враховуємо device pixel ratio для чіткої графіки на ретина-дисплеях
	const dpr = window.devicePixelRatio || 1;
	canvas.width = window.innerWidth * dpr;
	canvas.height = window.innerHeight * dpr;
	canvas.style.width = `${window.innerWidth}px`;
	canvas.style.height = `${window.innerHeight}px`;
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // скидаємо трансформацію і масштабуємо під DPR

	// Обчислюємо кількість колонок і рядків для символів
	grid.columns = Math.ceil(window.innerWidth / charWidth);
	grid.rows = Math.ceil(window.innerHeight / charHeight);

	// Створюємо масив символів з випадковим початковим кольором
	letters = Array.from({ length: grid.columns * grid.rows }, () => ({
		char: getRandomChar(),       // випадковий символ
		color: getRandomColor(),     // поточний колір
		targetColor: getRandomColor(), // колір, до якого плавно змінюємо
		colorProgress: 1             // прогрес зміни кольору (1 = кінцевий)
	}));
}

// Функція для випадкового символу
function getRandomChar() {
	return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
}

// Функція для випадкового кольору з масиву glitchColors
function getRandomColor() {
	return glitchColors[Math.floor(Math.random() * glitchColors.length)];
}

// Перетворює HEX-колір на RGB об'єкт {r,g,b} для інтерполяції
function hexToRgb(hex) {
	const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
}

// Функція для плавної зміни кольору між start та end
function interpolateColor(start, end, factor) {
	const r = Math.round(start.r + (end.r - start.r) * factor);
	const g = Math.round(start.g + (end.g - start.g) * factor);
	const b = Math.round(start.b + (end.b - start.b) * factor);
	return `rgb(${r},${g},${b})`;
}

// Функція для малювання всіх символів на канвасі
function drawLetters() {
	// Очищаємо канвас
	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

	// Встановлюємо шрифт та вирівнювання тексту
	ctx.font = `${fontSize}px monospace`;
	ctx.textBaseline = 'top';

	// Малюємо кожен символ у сітці
	letters.forEach((letter, index) => {
		const x = (index % grid.columns) * charWidth; // колонка
		const y = Math.floor(index / grid.columns) * charHeight; // рядок
		ctx.fillStyle = letter.color; // поточний колір символу
		ctx.fillText(letter.char, x, y);
	});
}

// Функція для випадкової заміни деяких символів і запуску їх глітч-ефекту
function updateLetters() {
	const updateCount = Math.max(1, Math.floor(letters.length * 0.05)); // 5% символів міняємо за кадр
	for (let i = 0; i < updateCount; i++) {
		const index = Math.floor(Math.random() * letters.length);
		letters[index].char = getRandomChar(); // новий випадковий символ
		letters[index].targetColor = getRandomColor(); // новий цільовий колір
		letters[index].colorProgress = 0; // запускаємо плавну зміну кольору
	}
}

// Функція для плавної зміни кольору символів
function handleSmoothTransitions() {
	letters.forEach(letter => {
		if (letter.colorProgress < 1) {
			letter.colorProgress += 0.05; // крок прогресу
			if (letter.colorProgress > 1) letter.colorProgress = 1;

			const startRgb = hexToRgb(letter.color);       // поточний колір
			const endRgb = hexToRgb(letter.targetColor);   // цільовий колір

			if (startRgb && endRgb) {
				letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);
			}
		}
	});
}

// Основна функція анімації
function animate() {
	updateLetters();           // змінюємо деякі символи
	handleSmoothTransitions(); // плавно змінюємо кольори
	drawLetters();             // малюємо усі символи
	requestAnimationFrame(animate); // викликаємо себе для наступного кадру
}

// Слухаємо зміну розміру вікна і підлаштовуємо канвас
window.addEventListener('resize', resizeCanvas);

// Початкове налаштування канвасу
resizeCanvas();

// Запуск анімації
animate();
