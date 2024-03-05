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
	slidesPerView: '1.1',
	loop: true,
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


function playVideo(button) {
	const video = button.closest('.swiper-slide').querySelector('video');
	const overlay = button.closest('.swiper-slide').querySelector('.overlay');
	const bottomOverlay = button.closest('.swiper-slide').querySelector('.bottom-overlay');

	if (video.paused) {
		video.play().then(function () {
			overlay.style.display = 'none';
			bottomOverlay.style.display = 'none';
		}).catch(function (error) {
			console.log("Error playing the video: " + error.message);
		});
	} else {
		video.pause();
		overlay.style.display = 'flex';
		bottomOverlay.style.display = 'block';
	}
}



function showOverlay(video) {
	var overlay = video.nextElementSibling;
	overlay.style.display = 'flex';
	var bottomOverlay = overlay.nextElementSibling;
	bottomOverlay.style.display = 'block';
}

function toggleOverlay(video) {
	var overlay = video.nextElementSibling;
	overlay.style.display = (overlay.style.display === 'none') ? 'flex' : 'none';
	var bottomOverlay = overlay.nextElementSibling;
	bottomOverlay.style.display = (bottomOverlay.style.display === 'none') ? 'block' : 'none';
}

document.addEventListener('click', function (event) {
	if (event.target.classList.contains('play-button')) {
		playVideo(event.target);
	}
});
document.addEventListener('touchend', function (event) {
	if (event.target.classList.contains('play-button')) {
		playVideo(event.target);
	}
});

document.addEventListener('DOMContentLoaded', function () {
	var videos = document.querySelectorAll('.swiper-slide video');
	videos.forEach(function (video) {
		video.addEventListener('play', function () {
			toggleOverlay(this);
		});
		video.addEventListener('pause', function () {
			toggleOverlay(this);
		});
	});
});





