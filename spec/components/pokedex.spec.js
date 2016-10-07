/* eslint-disable no-unused-expressions */
import $ from 'jquery';
import emitter from 'js/emitter';
import { Pokedex } from 'components/pokedex';

describe('Pokedex spec', () => {
  let instance;
  let sandbox;
  let $fixture;

  beforeEach(() => {
    $fixture = $(fixture.load('pokedex.html')[0]);
    instance = new Pokedex($fixture, $fixture.data());
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    fixture.cleanup();
    sandbox.restore();
  });

  describe('#init', () => {
    it('calls #displayPokemon', () => {
      const stub = sandbox.stub(instance, 'displayPokemon');

      instance.init();
      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('#displayPokemon', () => {
    it('displays the spinner', () => {
      const spy = sandbox.spy(emitter, 'emit');
      sandbox.stub(instance, 'fetchPokemon');

      instance.displayPokemon();

      expect(spy.calledWith('spinner:show')).to.be.true;
    });

    it('calls #fetchPokemon', () => {
      const stub = sandbox.stub(instance, 'fetchPokemon');

      instance.displayPokemon();

      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('#fetchPokemon', () => {
    context('when the request is successful', () => {
      it('calls #onFetchPokemonSuccess', () => {
        const stub = sandbox.stub(instance, 'onFetchPokemonSuccess');
        sandbox.stub($, 'getJSON').returnsPromise().resolves();

        instance.fetchPokemon();

        expect(stub.calledOnce).to.be.true;
      });
    });

    context('when the request fails', () => {
      it('calls #onFetchPokemonFailure', () => {
        const stub = sandbox.stub(instance, 'onFetchPokemonFailure');
        sandbox.stub($, 'getJSON').returnsPromise().rejects();

        instance.fetchPokemon();

        expect(stub.calledOnce).to.be.true;
      });
    });
  });

  describe('#onFetchPokemonSuccess', () => {
    it('hides the spinner', () => {
      const spy = sandbox.spy(emitter, 'emit');
      sandbox.stub(instance, 'renderPokemonEntries');

      instance.onFetchPokemonSuccess();

      expect(spy.calledWith('spinner:hide')).to.be.true;
    });

    it('inserts pokemon entry template on instance.$element', () => {
      const expectedHTML = '<div />';
      const stub = sandbox.stub(instance.$element, 'html');
      sandbox.stub(instance, 'renderPokemonEntries').returns(expectedHTML);

      instance.onFetchPokemonSuccess();

      expect(stub.calledWith(expectedHTML)).to.be.true;
    });
  });
});
