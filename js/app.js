"use strict"

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);

		if (error === 0) {
			form.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		} else {
			alert('Заполните обязательные поля');
		}

	}


	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_phone')) {
				if (phoneTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}

	//Функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
	//Функция теста phone
	function phoneTest(input) {
		return !/[0-9]/.test(input.value);
	}
});








const swiper = new Swiper(".reviews__slider", {
	// Optional parameters
	// количество слайдов
	slidesPerView: 3, // auto - при управлении высотой
	// отступ между слайдами
	spaceBetween: 30,
	// Скорость смены слайдов
	speed: 800,
	// Вертикальный слайдер
	// direction: "vertical",
	// Зацикленность
	loop: true,
	// Включение паралакс
	parallax: true,
	// Свои классы
	// wrapperClass: "class",
	// slideClass: "class",
	// Навигация по слайдам
	// Пагинация
	pagination: {
		el: ".swiper-pagination", // определяем рабочий контейнер
		type: "bullets",
		clickable: true,
		// bulletClass: "class", // если переназначаем стандартный класс
		// bulletActiveClass: "class", // если переназначаем стандартный класс
	},
	// Стрелки
	navigation: {
		nextEl: ".swiper-button-next", // определяем рабочий контейнер
		prevEl: ".swiper-button-prev", // определяем рабочий контейнер
	},
	// Скролл
	scrollbar: {
		el: ".swiper-scrollbar", // определяем рабочий контейнер
		dragClass: "class", // если переназначаем стандартный класс
		// возможность перетаскивать скролл
		braggable: true,
	},
	// Отключить если слайдов меньше чем нужно
	watchOverflow: true,
	// Обновить слайдер при изменении элементов
	observer: true,
	// Обновить слайдер при изменении родительских элементов
	observeParents: true,
	// Обновить слайдер при изменении дочерних элементов
	observeSlideChildren: true,
	// Управление мышью
	mousewheel: {
		// чувствительность мыши
		sensitivity: 1,
		// клас объекта срабатывания eventsTarget: ".image-slider"
	},
	// Управление клавиатурой
	keyboard: {
		// вкл / выкл
		enable: true,
		// вкл / выкл в пределах вьюпорта
		onlyInViewport: true,
		// вкл / выкл клавиши Up Dn
		pageUpDown: true,
	},
	// Брекпотнты
	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 1,
			spaceBetween: 20
		},
		// when window width is >= 480px
		577: {
			slidesPerView: 2,
			spaceBetween: 30
		},
		// when window width is >= 640px
		769: {
			slidesPerView: 3,
			spaceBetween: 40
		}
	}
});







function getTimeRemaining(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));
	return {
		total: t,
		days: days,
		hours: hours,
		minutes: minutes,
		seconds: seconds
	};
}

function initializeClock(id, endtime) {
	var clock = document.getElementById(id);
	var daysSpan = clock.querySelector(".days");
	var hoursSpan = clock.querySelector(".hours");
	var minutesSpan = clock.querySelector(".minutes");
	var secondsSpan = clock.querySelector(".seconds");

	function updateClock() {
		var t = getTimeRemaining(endtime);

		if (t.total <= 0) {
			clearInterval(timeinterval);
			var deadline = new Date(Date.parse(new Date()) + 25 * 1000);
			initializeClock('countdown', deadline);
		}

		daysSpan.innerHTML = t.days;
		hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
		minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
		secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
	}

	updateClock();
	var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 45 * 1000);
initializeClock("countdown", deadline);

























