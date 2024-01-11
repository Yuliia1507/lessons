
/*Homework
==================================================
Задача №1*/
/*Задача №1
Отримати в константу елемент < body >*/
const bodyElement = document.body;
console.log(bodyElement)
/*За допомогою document.body отримали елемент <body> та присвоїли його змінній bodyElement та вивили його в консоль */


/*=================================================
Задача№2
Написати функцію, яка додає в <body> список UL
з певною кількістю LI (кількість має передаватись як параметр функції, також мати значення за замовченням)
*/
function addListToBody(itemCount = 8) { /*Створюємо функцію addListToBody, itemCount = 8 - вказуємо, що список буде з 8 елементів*/
	/* Створюємо список*/
	const myList = document.createElement('ul');

	for (let i = 1; i <= itemCount; i++) { /*Тут вказуємо, що нумерація Li починається з 1 та не перевищує ту кількусть, що ми вказали в параметрі функції (itemCount = 8), а токож щоразу збільшується на 1  */
		const listItem = document.createElement('li');/*Створюємо елемент списку*/
		listItem.textContent = 'List item ' + i; /*Це назва елементів списку*/

		/* Додаємо елемент li до ul*/
		myList.appendChild(listItem);
	}

	/* Додаємо ul до тіла документу*/
	/*document.body.appendChild(myList);*/

	/*Хочу додати список до контейнера*/
	let container = document.querySelector('.page__container');
	container.prepend(myList);

}
/*Викликаємо функцію зі значенням за замовченням (8 елементів)*/
addListToBody();


/*=================================================
Задача №3
Додати до елементу <body> класс loaded.
Потім перевірити чи є клас loaded у елемента <body>
і, якщо є, додати стиль кольору тесту зелений.*/

/*Отримуємо елемент <body>*/
const elementBody = document.body;

/* Додаємо клас "loaded" до елементу <body>*/
elementBody.classList.add('loaded');

/*Перевіряємо, чи має елемент <body> клас "loaded"*/
if (elementBody.classList.contains('loaded')) {
	/*Якщо так, додаємо стиль кольору тексту зелений*/
	elementBody.style.color = 'green';
}

/*=================================================
Задача №4
Дано в html: три елементи з класом item.
Треба отримати ці елементи в константу, кожному додати клас active, 
та перезаписати контент всередені кожного елемента на "Елемент №(тут порядковий номер елементу починаючи з 1)". */

const allItems = document.querySelectorAll('.item'); /*Отримуємо в константу всі елементи з класом "item"*/

allItems.forEach((item, index) => {
	/* Додаємо клас "active"*/
	item.classList.add('active');

	/*Перезаписуємо контент*/
	item.textContent = `Елемент №${index + 1}`;
});


/*=================================================
Задача №5
Дано в html: текст, далі кнопка з класом button.
Треба прокрутити скрол сторінки до кнопки
 */
function scrollToButton() {
	/* Отримуємо елемент кнопки за класом*/
	const button = document.querySelector('.button');

	/* Викликаємо метод scrollIntoView(), щоб прокрутити до кнопки, параметр { behavior: 'smooth' } робить прокрутку більш плавною.*/
	button.scrollIntoView({ behavior: 'smooth' });
}

/*=================================================
Задача №6
Дано в html: посилання з класом link
Треба додати до посилання дата атрибут зі значенням 100
Поім отримати значення атрибуту, та, якщо значення меньше 200
пофарбувати колір тексту посилання в червоний
 */
/*Отримуємо посилання за допомогою класу*/
const link = document.querySelector('.link');

/*Отримуємо значення атрибуту 'data-value'*/
let dataValue = link.getAttribute('data-value');

/*Перевірка, чи значення менше 200*/
if (parseInt(dataValue) < 200) {
	/*Зміна кольору тексту на червоний*/
	link.style.color = 'red';
}
