
const icon = document.querySelector('.icon-menu');
icon.addEventListener('click', function () {
	document.documentElement.classList.toggle('menu-open');
});

const header1 = document.querySelector('.first-header');
const header2 = document.querySelector('.second-header');

window.addEventListener('scroll', () => {
	if (window.scrollY > header1.offsetHeight) {
		header1.style.opacity = '0';
		header2.style.position = 'fixed';
		header2.style.top = '0';
	} else {
		header1.style.opacity = '1';
		header2.style.position = 'absolute';
		header2.style.top = header1.offsetHeight + 'px';
	}
});