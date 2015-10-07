import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';

describe('Reducer', () => {
  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Bad Timing']};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Bad Timing']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Bad Timing', 'Eureka']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Bad Timing', 'Eureka']
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Bad Timing', 'Eureka']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'Bad Timing'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Bad Timing', 'Eureka'],
        tally: {'Bad Timing': 1}
      },
      entries: []
    }));
  });

  it('has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Bad Timing']};
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Bad Timing']
    }));
  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Bad Timing', 'Eureka']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Bad Timing'},
      {type: 'VOTE', entry: 'Eureka'},
      {type: 'VOTE', entry: 'Bad Timing'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'Bad Timing'
    }));
  });
});
