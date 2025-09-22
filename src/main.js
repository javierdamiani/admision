import Alpine from "alpinejs";
import mask from "@alpinejs/mask";
import collapse from "@alpinejs/collapse";
import htmx from "htmx.org";

window.Alpine = Alpine;

Alpine.plugin(mask);
Alpine.plugin(collapse);

Alpine.data("expanded", () => ({
	width: 0,
	expand: true,
	toggle() {
		this.expand = !this.expand;
	},
	check() {
		this.width = window.innerWidth > 0 ? window.innerWidth : screen.width;
		this.expand = true;
		if (this.width < 768) {
			this.expand = false;
		}
	},
}));

Alpine.data("atTop", () => ({
	alto: 0,
	istop: true,
	height() {
		this.alto = window.innerWidth < 768 ? 1 : 40;
	},
	scroll() {
		this.istop = window.scrollY < this.alto;
	},
}));

Alpine.data("bdate", () => ({
	fecha: "",
	checkf(event) {
		if (event.target.value.substr(0, 2) > 31) {
			this.fecha = `${event.target.value.substr(0, 1).toString().padStart(2, "0")}/${event.target.value.substr(1, 1)}`;
		}
		if (event.target.value.length > 3 && event.target.value.substr(3, 2) > 12) {
			this.fecha = `${event.target.value.substr(0, 3)}${event.target.value.substr(3, 1).toString().padStart(2, "0")}/${event.target.value.substr(4, 1)}`;
		}
		const d = new Date();
		const y = new Date(d.setFullYear(d.getFullYear() - 15));
		if (
			event.target.value.length > 6 &&
			event.target.value.substr(6, 4) >= y.getFullYear()
		) {
			this.fecha = `${event.target.value.substr(0, 6)}${y.getFullYear()}`;
		}
	},
}));

Alpine.data("milestone", () => ({
	counter: 0,
	visible: false,
	animate(finalCount) {
		const time = 500;
		const interval = 9;
		const step = Math.floor((finalCount * interval) / time);
		let timer = setInterval(() => {
			this.counter = this.counter + step;
			if (this.counter >= finalCount + step) {
				this.counter = finalCount;
				clearInterval(timer);
				timer = null;
				return;
			}
		}, interval);
	},
}));

Alpine.data("slider", () => ({
	container: null,
	prev: null,
	next: null,
	init() {
		this.container = this.$refs.container;

		this.update();

		this.container.addEventListener("scroll", this.update.bind(this), {
			passive: true,
		});
	},
	update() {
		if (!this.container) return;
		const rect = this.container.getBoundingClientRect();
		const visibleElements = Array.from(this.container.children).filter(
			(child) => {
				const childRect = child.getBoundingClientRect();

				return childRect.left >= rect.left && childRect.right <= rect.right;
			},
		);
		if (visibleElements.length > 0) {
			this.prev = this.getPrevElement(visibleElements);
			this.next = this.getNextElement(visibleElements);
		}
	},
	getPrevElement(list) {
		const sibling = list[0].previousElementSibling;

		if (sibling instanceof HTMLElement) {
			return sibling;
		}

		return null;
	},
	getNextElement(list) {
		const sibling = list[list.length - 1].nextElementSibling;

		if (sibling instanceof HTMLElement) {
			return sibling;
		}

		return null;
	},
	scrollTo(element) {
		const current = this.container;

		if (!current || !element) return;

		const nextScrollPosition =
			element.offsetLeft +
			element.getBoundingClientRect().width / 2 -
			current.getBoundingClientRect().width / 2;

		current.scroll({
			left: nextScrollPosition,
			behavior: "smooth",
		});
	},
}));

Alpine.data(
	"carousel",
	(
		carouselData = {
			slides: [],
			intervalTime: 0,
		},
	) => ({
		slides: carouselData.slides,
		autoplayIntervalTime: carouselData.intervalTime,
		currentSlideIndex: 1,
		isPaused: false,
		autoplayInterval: null,
		transition: "slide",
		previous() {
			if (this.currentSlideIndex > 1) {
				this.currentSlideIndex = this.currentSlideIndex - 1;
			} else {
				// If it's the first slide, go to the last slide
				this.currentSlideIndex = this.slides.length;
			}
		},
		next() {
			if (this.currentSlideIndex < this.slides.length) {
				this.currentSlideIndex = this.currentSlideIndex + 1;
			} else {
				// If it's the last slide, go to the first slide
				this.currentSlideIndex = 1;
			}
		},
		autoplay() {
			this.autoplayInterval = setInterval(() => {
				if (!this.isPaused) {
					this.next();
				}
			}, this.autoplayIntervalTime);
		},
		// Updates interval time
		setAutoplayIntervalTime(newIntervalTime) {
			clearInterval(this.autoplayInterval);
			this.autoplayIntervalTime = newIntervalTime;
			this.autoplay();
		},
	}),
);

Alpine.data("search_carrera", () => ({
	search: "",
	show_item(el) {
		return (
			this.search === "" ||
			el.textContent.toLowerCase().includes(this.search.toLowerCase())
		);
	},
}));

Alpine.start();

window.htmx = htmx;

window.dateMask = (input) => {
	return "99/99/9999";
};

window.checknine = () => {
	const celular = document.getElementById("celular");
	celular.addEventListener("input", (e) => {
		if (e.target.value.match(/^(\d)\1+$/))
			e.target.setCustomValidity("Ingresa un número de celular válido");
		else e.target.setCustomValidity("");
	});
};
