import { createContext, useReducer } from 'react';
import ChallengesReducer from '../reducers/challenge-reducer';

export const ChallengesContext = createContext({
  challenges: [],
  addChallenge: () => {},
  updateChallengeStatus: () => {},
});

export default function ChallengesContextProvider({ children }) {
  const [challenges, dispatch] = useReducer(ChallengesReducer, [])

  function addChallenge(challenge) {
    dispatch({
      type: 'ADD_CHALLENGE',
      payload: challenge
    })
  }

  function deleteChallenge(challengeId) {
    dispatch({
      type: 'DELETE_CHALLENGE',
      payload: challengeId
    })
  }

  function updateChallengeStatus(challengeId, newStatus) {
    dispatch({
      type: 'UPDATE_CHALLENGE_STATUS',
      payload: { challengeId, newStatus }
    })
  }

  const challengesContext = {
    challenges,
    addChallenge,
    deleteChallenge,
    updateChallengeStatus,
  };

  return (
    <ChallengesContext.Provider value={challengesContext}>
      {children}
    </ChallengesContext.Provider>
  );
}
