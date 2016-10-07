/* eslint-disable no-unused-expressions */
import $ from 'jquery';
import emitter from 'js/emitter';
import { Spinner } from 'components/spinner';

describe('Spinner component',() => {
  let instance;
  let sandbox; // sinonjs para resetar o testes

  // 1 - setup
  beforeEach(() => {
    instance = new Spinner($('<div />'));
    sandbox = sinon.sandbox.create();
  });

  // 4 - Teardown
  afterEach(() => {
    sandbox.restore();
  });

  describe('#init ', () => {
    it('calls #bindListeners', () => {
      const stub = sandbox.stub(instance, 'bindListeners');

      instance.init();

      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('#bindListeners', () => {
    context('when spinner:show event is triggered', () => {
      it('calls #onSpinnerShow', () => {
        const stub = sandbox.stub(instance, 'onSpinnerShow');

        instance.bindListeners();
        emitter.emit('spinner:show');

        expect(stub.calledOnce).to.be.true;
      });
    });

    context('when spinner:hide event is triggered', () => {
      it('calls #onSpinnerHide', () => {
        const stub = sandbox.stub(instance, 'onSpinnerHide');

        instance.bindListeners();
        emitter.emit('spinner:hide');

        expect(stub.calledOnce).to.be.true;
      });
    });
  });

  describe('#onSpinnerShow', () => {
    it('displays the spinner', () => {
      instance.onSpinnerShow();
      const visibleClass = instance.spinnerVisibleClass;

      const hasClass = instance.$element.hasClass(visibleClass);

      expect(hasClass).to.be.true;
    });
  });

  describe('#onSpinnerHide', () => {
    it('displays the spinner', () => {
      instance.onSpinnerHide();
      const visibleClass = instance.spinnerVisibleClass;

      const hasClass = instance.$element.hasClass(visibleClass);

      expect(hasClass).to.be.false;
    });
  });
});
