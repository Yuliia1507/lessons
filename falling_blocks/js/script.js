"use strict"
// Імпортуємо потрібні модулі з бібліотеки Matter.js
// Engine — двигун фізики, Runner — для запуску симуляції,
// Bodies — для створення тіл, World — контейнер для тіл, Body — для роботи з тілом,
// Mouse, MouseConstraint — для роботи з мишею, Events — для підписки на події.
const { Engine, Runner, Bodies, World, Body, Mouse, MouseConstraint, Events } = Matter;

// Масив слів/фраз, які будуть відображатися у вигляді блоків
const words = [
	"How are you? (English)",
	"¿Cómo estás? (Español)",
	"Comment ça va? (Français)",
	"Wie geht's? (Deutsch)",
	"Come stai? (Italiano)",
	"Tudo bem? (Português)",
	"How are you? (English)",
	"¿Cómo estás? (Español)",
	"Comment ça va? (Français)",
	"Wie geht's? (Deutsch)",
	"Come stai? (Italiano)",
	"Tudo bem? (Português)",
];

// Отримуємо контейнер для сцени з HTML
const scene = document.getElementById('scene');

// Створюємо фізичний двигун та отримуємо його світ
const engine = Engine.create();
const world = engine.world;

// ============================
// Створення блоків HTML + фізики
// ============================
let blocks = words.map(word => {
	// 1. Створюємо div елемент для кожного слова
	const el = document.createElement('div');
	el.className = 'word';  // клас для стилізації
	el.textContent = word;  // текст всередині блоку
	scene.appendChild(el);  // додаємо на сторінку

	// 2. Вимірюємо ширину та висоту блоку (для фізики)
	const width = el.offsetWidth;
	const height = el.offsetHeight;

	// 3. Створюємо фізичне тіло (прямокутник)
	const body = Bodies.rectangle(
		Math.random() * (window.innerWidth - width) + width / 2, // випадкова X-позиція у viewport
		Math.random() * 100,  // випадкова Y-позиція на верхній частині екрану
		width,                 // ширина тіла = ширина HTML-елемента
		height,                // висота тіла = висота HTML-елемента
		{
			restitution: 0.7,    // пружність (скільки відскакує)
			friction: 0.1,       // тертя при дотику з іншими тілами
			frictionAir: 0.02,   // повітряне тертя (сповільнює падіння)
			angle: Math.random() * 0.2 - 0.1 // випадковий початковий кут нахилу
		}
	);

	// 4. Додаємо тіло у фізичний світ
	World.add(world, body);

	// 5. Повертаємо об’єкт, який поєднує HTML + тіло + розміри
	return { el, body, width, height };
});

// ============================
// Створюємо стіни по периметру viewport
// ============================
function createWalls() {
	const w = window.innerWidth;  // ширина вікна
	const h = window.innerHeight; // висота вікна
	const thickness = 100;        // товщина стін

	// Повертаємо масив тіл-стін
	return [
		Bodies.rectangle(w / 2, -thickness / 2, w, thickness, { isStatic: true }), // верхня
		Bodies.rectangle(w / 2, h + thickness / 2, w, thickness, { isStatic: true }), // нижня
		Bodies.rectangle(-thickness / 2, h / 2, thickness, h, { isStatic: true }), // ліва
		Bodies.rectangle(w + thickness / 2, h / 2, thickness, h, { isStatic: true }) // права
	];
}

let walls = createWalls();
World.add(world, walls); // додаємо стіни у світ

// ============================
// Миша і drag (перетягування блоків)
// ============================
const mouse = Mouse.create(scene); // створюємо об’єкт миші
const mouseConstraint = MouseConstraint.create(engine, {
	mouse: mouse,
	constraint: { stiffness: 0.2, render: { visible: false } } // пружність при перетягуванні
});
World.add(world, mouseConstraint);

// Запобігаємо контекстному меню правої кнопки на сцені
scene.addEventListener('contextmenu', e => e.stopPropagation(), true);

// ============================
// Оновлення позицій HTML-блоків під час симуляції
// ============================
Events.on(engine, 'afterUpdate', () => {
	blocks.forEach(b => {
		// Беремо координати та кут з тіла
		const { x, y } = b.body.position;
		const angle = b.body.angle;

		// Переміщуємо HTML-елемент у відповідність до фізичного тіла
		b.el.style.transform = `translate(${x - b.width / 2}px, ${y - b.height / 2}px) rotate(${angle}rad)`;
	});
});

// ============================
// Адаптивність при resize
// ============================
window.addEventListener('resize', () => {
	const w = window.innerWidth;
	const h = window.innerHeight;

	// Видаляємо старі стіни і створюємо нові
	World.remove(world, walls);
	walls = createWalls();
	World.add(world, walls);

	// Переміщуємо блоки всередину viewport, якщо вони опинилися за межами
	blocks.forEach(b => {
		let x = b.body.position.x;
		let y = b.body.position.y;
		const halfW = b.width / 2;
		const halfH = b.height / 2;

		if (x - halfW < 0) x = halfW;
		if (x + halfW > w) x = w - halfW;
		if (y - halfH < 0) y = halfH;
		if (y + halfH > h) y = h - halfH;

		Body.setPosition(b.body, { x, y });
	});
});

// ============================
// Запускаємо фізичний двигун
// ============================
Runner.run(Runner.create(), engine);