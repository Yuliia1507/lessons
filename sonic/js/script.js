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











