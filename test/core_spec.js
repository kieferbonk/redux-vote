import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setEntries, next, vote} from '../src/core';

describe('Application logic', () => {
  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Bad Timing', 'Eureka');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Bad Timing', 'Eureka')
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Bad Timing', 'Eureka'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Bad Timing', 'Eureka')
      }));
    });
  });

  describe('Next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Bad Timing', 'Eureka', 'The Visitor')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Bad Timing', 'Eureka')
        }),
        entries: List.of('The Visitor')
      }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Bad Timing', 'Eureka'),
          tally: Map({
            'Bad Timing': 4,
            'Eureka': 2
          })
        }),
        entries: List.of('The Visitor', 'Insignificance', 'Walkabout')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('The Visitor', 'Insignificance')
        }),
        entries: List.of('Walkabout', 'Bad Timing')
      }));
    });

    it('puts botth from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Bad Timing', 'Eureka'),
          tally: Map({
            'Bad Timing': 3,
            'Eureka': 3
          })
        }),
        entries: List.of('The Visitor', 'Insignificance', 'Walkabout')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('The Visitor', 'Insignificance')
        }),
        entries: List.of('Walkabout', 'Bad Timing', 'Eureka')
      }))
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Bad Timing', 'Eureka'),
          tally: Map({
            'Bad Timing': 4,
            'Eureka': 2
          })
        }),
        entries: List()
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        winner: 'Bad Timing'
      }))
    });
  });

  describe('Vote', () => {
    it('creates a tally for the voted entry', () => {
        const state = Map({
          pair: List.of('Bad Timing', 'Eureka')
        })
        const nextState = vote(state, 'Bad Timing');

        expect(nextState).to.equal(Map({
          pair: List.of('Bad Timing', 'Eureka'),
          tally: Map({
            'Bad Timing': 1
          })
        }))
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        pair: List.of('Bad Timing', 'Eureka'),
        tally: Map({
          'Bad Timing': 3,
          'Eureka': 2
        })
      });
      const nextState = vote(state, 'Bad Timing');

      expect(nextState).to.equal(Map({
        pair: List.of('Bad Timing', 'Eureka'),
        tally: Map({
          'Bad Timing': 4,
          'Eureka': 2
        })
      }));
    });
  });
});
