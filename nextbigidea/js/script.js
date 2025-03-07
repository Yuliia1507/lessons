"use strict"

//======================SCROLLED HEADER================

window.addEventListener('scroll', () => {
	const header = document.querySelector('header');
	if (window.scrollY > 50) { // Кількість пікселів, після яких змінюється фон
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled');
	}
});





document.addEventListener("DOMContentLoaded", function () {
	const items = document.querySelectorAll(".category__item"); // Всі елементи
	const button = document.querySelector(".category__button");
	const visibleCount = 2; // Початкова кількість видимих елементів
	let currentlyVisible = visibleCount; // Скільки елементів зараз видно

	// Перевіряємо, чи є елементи
	if (!items.length || !button) return;

	function initializeItems() {
		items.forEach((item, index) => {
			if (index < visibleCount) {
				item.style.display = "flex"; // Перші 6 елементів видимі
				item.style.opacity = "1";
				item.style.transform = "translateY(0)";
			} else {
				item.style.display = "none"; // Інші приховані
				item.style.opacity = "0";
				item.style.transform = "translateY(10px)";
			}
		});

		updateButtonText();
	}

	function updateButtonText() {
		button.textContent = (currentlyVisible === items.length) ? "Show Less" : "Show More";
	}

	initializeItems();

	button.addEventListener("click", function () {
		if (currentlyVisible < items.length) {
			// Відкриваємо наступний прихований елемент
			const item = items[currentlyVisible];
			item.style.display = "flex";

			requestAnimationFrame(() => {
				item.style.opacity = "1";
				item.style.transform = "translateY(0)";
				item.style.transition = "opacity 0.4s ease, transform 0.4s ease";
			});

			currentlyVisible++;

			if (currentlyVisible === items.length) {
				button.textContent = "Show Less";
			}
		} else {
			// При "Show Less" ховаємо всі елементи після 6-го
			for (let i = visibleCount; i < items.length; i++) {
				const item = items[i];
				item.style.opacity = "0";
				item.style.transform = "translateY(10px)";
				item.style.transition = "opacity 0.4s ease, transform 0.4s ease";

				setTimeout(() => {
					item.style.display = "none";
				}, 400);
			}
			currentlyVisible = visibleCount;
			button.textContent = "Show More";
		}
	});
});


//======================SCROLL ANIMATION================


const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 500;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		})
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			const popup = el.closest('.popup'); 
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		}
		else {
			bodyLock();
		}
	}

	curentPopup.classList.add('open');
	curentPopup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__content')) {
			popupClose(e.target.closest('.popup'));
		}
	});
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	// if (lockPadding.length > 0) {
	// 	for (let index = 0; index < lockPadding.length; index++) {
	// 		const el = lockPadding[index];
	// 		el.style.paddingRight = lockPaddingValue;
	// 	}
	// }
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape') {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive);
		}
	}
});