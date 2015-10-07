import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {
  describe('A number', () => {
    function increment (currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    })
  });

  describe('A List', () => {
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('is immutable', () => {
      let state = List.of('Bad Timing', 'Eureka');
      let nextState = addMovie(state, 'The Visitor');

      expect(nextState).to.equal(List.of(
        'Bad Timing',
        'Eureka',
        'The Visitor'
      ));

      expect(state).to.equal(List.of(
        'Bad Timing',
        'Eureka'
      ));
    });
  });

  describe('A tree', () => {
    function addMovie(currentState, movie) {
      return currentState.update(
        'movies',
        movies => movies.push(movie)
      );
    }

    it('is immutable', () => {
      let state = Map({
        movies: List.of('Bad Timing', 'Eureka')
      });
      let nextState = addMovie(state, 'The Visitor');

      expect(nextState).to.equal(Map({
        movies: List.of(
          'Bad Timing',
          'Eureka',
          'The Visitor'
        )
      }));

      expect(state).to.equal(Map({
        movies: List.of(
          'Bad Timing',
          'Eureka'
        )
      }));
    });
  });
});
