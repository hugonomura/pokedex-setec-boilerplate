import $ from 'jquery';
import emitter from 'js/emitter';

class Spinner {
	constructor(element) {
		this.$element = element;
		this.spinnerVisibleClass = 'spinner--visible';
	}

	init() {
		this.bindListeners();
	}

	bindListeners() {
		emitter.on('spinner:show', this.onSpinnerShow.bind(this));
		emitter.on('spinner:hide', this.onSpinnerHide.bind(this));


		$('body').on('click', () => {
			emitter.emit('spinner:show');
		});
	}

	onSpinnerShow() {
		this.$element.addClass(this.spinnerVisibleClass); // you can use the 'toggleClass' method too
	}

	onSpinnerHide() {
		this.$element.removeClass(this.spinnerVisibleClass);
	}
}

export default ($element) => {
	new Spinner($element).init();
};
