"use strict"

document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest('.icon-menu')) {
		document.body.classList.toggle('menu-open');
	}

}

function updateCounter(counterElement, startValue, endValue) {
	if (counterElement) {
		counterElement.textContent = startValue + 'K+';
	}

	let intervalId = setInterval(function () {
		startValue++;
		if (startValue > endValue) {
			clearInterval(intervalId); // Stop the counter when it reaches the target value
		} else {
			counterElement.textContent = startValue + 'K+';
		}
	}, 100);
}

document.addEventListener('DOMContentLoaded', function () {
	const counters = document.querySelectorAll('.item-counter__number');
	counters.forEach(function (counter) {
		let startValue = parseInt(counter.getAttribute('data-start'));
		let endValue = parseInt(counter.getAttribute('data-end'));
		updateCounter(counter, startValue, endValue);
	});
});

document.addEventListener('DOMContentLoaded', function () {
	const imageBlock = document.querySelector('.image');
	const decorImage = document.querySelector('.image__decor');

	// Add event listener to respond to mouse movement
	imageBlock.addEventListener('mousemove', function (event) {
		const rect = imageBlock.getBoundingClientRect();
		const mouseX = event.clientX - rect.left;
		const mouseY = event.clientY - rect.top;

		const offsetX = (mouseX / rect.width - 35) * 10;
		const offsetY = (mouseY / rect.height - 35) * 10;

		const rotateX = offsetY;
		const rotateY = offsetX;

		decorImage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
	});

	// Stop animation when mouse leaves the .image block
	imageBlock.addEventListener('mouseleave', function () {
		decorImage.style.transform = 'rotateX(0deg) rotateY(0deg)';
	});
});

document.addEventListener("DOMContentLoaded", function () {
	const itemsToShow = 3;
	const itemMetawork = document.querySelectorAll(".item-metawork");
	const showMoreBtn = document.querySelector(".show-more");

	let itemsShown = itemsToShow; // Початкова кількість показаних елементів

	function toggleItems() {
		if (window.innerWidth <= 585) {
			itemMetawork.forEach((item, index) => {
				if (index < itemsShown) {
					item.style.display = "block";
				} else {
					item.style.display = "none";
				}
			});
		} else {
			itemMetawork.forEach(item => {
				item.style.display = "block";
			});
		}

		// Перевіряємо, чи всі елементи вже видимі, і змінюємо текст кнопки відповідно
		if (itemsShown === itemMetawork.length) {
			showMoreBtn.textContent = "Show less";
		} else {
			showMoreBtn.textContent = "Show more";
		}
	}

	toggleItems(); // Викликаємо перевірку вікна при завантаженні сторінки

	showMoreBtn.addEventListener("click", function () {
		if (itemsShown === itemMetawork.length) {
			// Якщо всі елементи вже видимі, ховаємо їх по одному, починаючи з останнього
			itemsShown = itemsToShow;
			toggleItems();
		} else {
			// Якщо ще є елементи, які не відображені, показуємо наступний елемент
			itemsShown++;
			toggleItems();
		}
	});

	window.addEventListener("resize", toggleItems); // Викликаємо перевірку вікна при зміні розміру вікна
});


const swiper = new Swiper('.swiper-container', {
	// Налаштування відображення
	slidesPerView: 'auto',
	loop: true, // дозволяє відео листатися знову
	slidesPerView: 1.1,
	spaceBetween: 54,
	breakpoints: {
		320: {
			spaceBetween: 15
		},
		480: {
			spaceBetween: 15
		},
		650: {
			spaceBetween: 20
		},
		991: {
			spaceBetween: 30
		}
	}
});

function playVideo(videoId) {
	var video = document.getElementById(videoId);
	var overlay = document.getElementById('overlay' + videoId.charAt(videoId.length - 1));
	var bottomOverlay = document.getElementById('bottomOverlay' + videoId.charAt(videoId.length - 1));
	video.play();
	overlay.style.display = 'none';
	bottomOverlay.style.display = 'none';

	// Приховати bottom-overlay при торканні на тач-скріні
	video.addEventListener('touchstart', function (event) {
		if (!video.paused && !video.ended) {
			toggleOverlay(videoId);
		}
	});
}

function showOverlay(videoId) {
	var overlay = document.getElementById('overlay' + videoId.charAt(videoId.length - 1));
	overlay.style.display = 'flex';
	var bottomOverlay = document.getElementById('bottomOverlay' + videoId.charAt(videoId.length - 1));
	bottomOverlay.style.display = 'block';
}

function toggleOverlay(videoId) {
	var bottomOverlay = document.getElementById('bottomOverlay' + videoId.charAt(videoId.length - 1));
	if (bottomOverlay.style.display === 'block') {
		bottomOverlay.style.display = 'none';
	} else {
		bottomOverlay.style.display = 'block';
	}
}






