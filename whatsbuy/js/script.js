"use strict"
document.addEventListener("DOMContentLoaded", () => {
	const iconMenu = document.querySelector(".icon-menu");
	const menuBody = document.querySelector(".menu__body");

	iconMenu.addEventListener("click", () => {
		if (window.innerWidth <= 1150) {
			iconMenu.classList.toggle("active");
			document.body.classList.toggle("menu-open");

			if (document.body.classList.contains("menu-open")) {
				// Отримуємо реальну висоту меню
				const maxMenuHeight = Math.min(window.innerHeight * 0.8, menuBody.scrollHeight);
				menuBody.style.maxHeight = `${maxMenuHeight}px`;
			} else {
				menuBody.style.maxHeight = "0px";
			}
		}
	});

	// Закриваємо меню при кліку на посилання
	document.addEventListener("click", (e) => {
		const targetElement = e.target;
		if (targetElement.closest(".menu") && targetElement.tagName === "A") {
			if (window.innerWidth <= 1150) {
				document.body.classList.remove("menu-open");
				iconMenu.classList.remove("active");
				menuBody.style.maxHeight = "0px";
			}
		}

		// Закриваємо меню, якщо клік поза ним
		if (!targetElement.closest(".icon-menu") && !targetElement.closest(".menu") && window.innerWidth <= 1150) {
			document.body.classList.remove("menu-open");
			iconMenu.classList.remove("active");
			menuBody.style.maxHeight = "0px";
		}
	});

	// Закриваємо меню при зміні розміру екрану
	window.addEventListener("resize", () => {
		if (window.innerWidth > 1150) {
			document.body.classList.remove("menu-open");
			iconMenu.classList.remove("active");
			menuBody.style.maxHeight = "none";
		}
	});
});



// let arrow = document.getElementById("arrow");

// console.log(arrow.getTotalLength());


//========================================

document.addEventListener("DOMContentLoaded", function () {
	function moveElements() {
		const screenWidth = window.innerWidth;
		const elementsToMove = document.querySelectorAll("[data-da]");

		elementsToMove.forEach(function (element) {
			const data = element.getAttribute("data-da").split(",");
			if (data.length === 3) {
				const destinationSelector = data[0].trim();
				const order = parseInt(data[1].trim());
				const requiredScreenWidth = parseInt(data[2].trim());

				const destination = document.querySelector(destinationSelector);
				if (!destination) return;

				// Збереження початкового контейнера
				if (!element.dataset.originalParent) {
					const parent = element.parentNode;
					const index = Array.from(parent.children).indexOf(element);
					element.dataset.originalParent = parent.tagName.toLowerCase() + (parent.id ? `#${parent.id}` : '') + (parent.className ? `.${parent.className.replace(/\s+/g, '.')}` : '');
					element.dataset.originalIndex = index;
				}

				if (screenWidth <= requiredScreenWidth && !element.classList.contains("moved")) {
					// Переміщення в нове місце
					if (order === 1) {
						destination.insertBefore(element, destination.firstChild);
					} else {
						const previousElement = destination.children[order - 2];
						if (previousElement) {
							destination.insertBefore(element, previousElement.nextSibling);
						} else {
							destination.appendChild(element);
						}
					}
					element.classList.add("moved");
				} else if (screenWidth > requiredScreenWidth && element.classList.contains("moved")) {
					// Повернення на початкове місце
					const originalParentSelector = element.dataset.originalParent;
					const originalIndex = parseInt(element.dataset.originalIndex, 10);
					const originalParent = document.querySelector(originalParentSelector);

					if (originalParent) {
						const children = Array.from(originalParent.children);
						if (originalIndex < children.length) {
							originalParent.insertBefore(element, children[originalIndex]);
						} else {
							originalParent.appendChild(element);
						}
						element.classList.remove("moved");
					}
				}
			}
		});
	}

	moveElements();

	window.addEventListener("resize", function () {
		moveElements();
	});
});


//===========================

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
	if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
		document.getElementById("scrollToTopBtn").classList.add("visible");
	} else {
		document.getElementById("scrollToTopBtn").classList.remove("visible");
	}
}

document.getElementById("scrollToTopBtn").onclick = function () { topFunction() };

function topFunction() {
	window.scrollTo({ top: 0, behavior: 'smooth' });
}


//=================================================

document.addEventListener('DOMContentLoaded', () => {
	const counters = document.querySelectorAll('.item-counter');

	// Функція для анімації чисел
	const animateCounter = (element) => {
		const target = +element.getAttribute('data-count');
		let count = 0;
		const increment = target / 100;

		const interval = setInterval(() => {
			count += increment;
			if (count >= target) {
				clearInterval(interval);
				count = target;
			}

			// Додавання "M" для чисел більше 1 мільйона
			if (target >= 1000000) {
				element.textContent = Math.floor(count / 1000000) + "M+";
			} else {
				element.textContent = Math.floor(count) + (element.textContent.includes('%') ? '%' : '+');
			}
		}, 10);
	};

	// Перевірка видимості елемента за допомогою IntersectionObserver
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const numberElement = entry.target.querySelector('.item-counter__number');
				if (numberElement && !numberElement.classList.contains('counted')) {
					animateCounter(numberElement);
					numberElement.classList.add('counted');
				}
				entry.target.classList.add('visible');
			}
		});
	}, {
		threshold: 0.5
	});

	counters.forEach(counter => {
		observer.observe(counter);
	});
});

document.addEventListener("DOMContentLoaded", () => {
	const processSection = document.querySelector(".process__wrapper"); // Секція з анімацією
	const elements = document.querySelectorAll(".process__item");
	const arrows = document.querySelectorAll(".arrow"); // Всі стрілочки
	let currentIndex = 0;
	let isAnimating = false;
	let animationStarted = false;
	let scrollCount = 0;
	let lastTouchY = 0; // Змінна для збереження попередньої координати Y (для сенсорних пристроїв)

	function showNextElement() {
		if (currentIndex < elements.length) {
			elements[currentIndex].classList.add("visible"); // Показуємо елемент
			if (arrows[currentIndex]) {
				arrows[currentIndex].classList.add("visible"); // Показуємо відповідну стрілочку
			}
			currentIndex++;
			isAnimating = false;
		}

		// Якщо всі елементи з'явилися, знімаємо блокування скролу
		if (currentIndex >= elements.length) {
			document.removeEventListener("wheel", handleScroll);
			document.removeEventListener("touchmove", handleTouchScroll);
		}
	}

	function handleScroll(event) {
		event.preventDefault(); // Блокуємо стандартний скрол під час анімації
		scrollCount++;

		// Якщо здійснено два скролінги, запускаємо анімацію
		if (scrollCount === 2) {
			isAnimating = true;
			showNextElement();
			scrollCount = 0; // Скидаємо лічильник
		}
	}

	function handleTouchScroll(event) {
		event.preventDefault(); // Блокуємо стандартний скрол під час анімації
		const touchY = event.touches[0].clientY;

		// Якщо прокручено достатньо відстані
		if (lastTouchY !== 0 && Math.abs(lastTouchY - touchY) > 50) {
			scrollCount++; // Якщо прокручено більше 50px, вважаємо це як скрол
			if (scrollCount === 2) {
				isAnimating = true;
				showNextElement();
				scrollCount = 0; // Скидаємо лічильник
			}
		}

		lastTouchY = touchY; // Оновлюємо координату Y
	}

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting && !animationStarted) {
				animationStarted = true; // Запускаємо тільки один раз
				document.addEventListener("wheel", handleScroll, { passive: false });
				document.addEventListener("touchmove", handleTouchScroll, { passive: false });
			}
		});
	}, { threshold: 0.5 }); // Почати, коли 50% секції видно

	observer.observe(processSection);
}); 