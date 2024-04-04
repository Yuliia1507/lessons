"use strict"

document.addEventListener("click", function (e) {
	const targetElement = e.target;

	// Toggle menu class for body
	if (targetElement.closest('.icon-menu')) {
		document.body.classList.toggle('menu-open');
	}

	// Toggle 'open' class for wrapperMenu
	const wrapperMenu = document.querySelector('.icon-menu');
	if (wrapperMenu === targetElement || wrapperMenu.contains(targetElement)) {
		wrapperMenu.classList.toggle('open');
	}
});




const heroImage = document.querySelector('.hero__image');

window.onload = function () {
	heroImage.classList.add('show');
};


document.addEventListener("DOMContentLoaded", function () {
	let items = document.querySelectorAll('.hero__item, .hero__title, .hero__text, .hero__buttons-wrap, .hero__link');

	function revealItems() {
		items.forEach(function (item, index) {
			setTimeout(function () {
				item.classList.add('show');
			}, index * 500); 
		});
	}

	revealItems();
});


document.addEventListener("DOMContentLoaded", function () {
	function moveElements() {
		let screenWidth = window.innerWidth;
		let elementsToMove = document.querySelectorAll("[data-da]");

		elementsToMove.forEach(function (element) {
			let data = element.getAttribute("data-da").split(",");
			if (data.length === 3) {
				let destinationSelector = data[0].trim();
				let order = parseInt(data[1].trim());
				let requiredScreenWidth = parseInt(data[2].trim());
				let destination = document.querySelector(destinationSelector);
				let initialParent = element.dataset.initialParent; // Отримати початкового батька напряму

				if (!destination) return;

				if (screenWidth <= requiredScreenWidth && !element.classList.contains("moved")) {
					if (order === 1) {
						destination.insertBefore(element, destination.firstChild);
					} else {
						let previousElement = destination.children[order - 2];
						if (previousElement) {
							destination.insertBefore(element, previousElement.nextSibling);
						} else {
							destination.appendChild(element);
						}
					}
					element.classList.add("moved");
					// Зберегти початкове положення тільки якщо воно ще не збережено
					if (!element.dataset.initialParent) {
						element.dataset.initialParent = initialParent;
					}
				} else if (screenWidth > requiredScreenWidth && element.classList.contains("moved")) {
					// Перевірити, чи є початкове положення
					if (initialParent) {
						let initialParentElement = document.querySelector(".header__action"); // Отримати початкового батька напряму
						if (initialParentElement) {
							initialParentElement.appendChild(element); // Повернути елемент на його початкове місце
							element.classList.remove("moved");
						} else {
							// Handle the case where the initial parent element is not found
							console.error("Initial parent element not found");
						}
					} else {
						// Handle the case where the initial parent data is missing
						console.error("Initial parent data missing");
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








