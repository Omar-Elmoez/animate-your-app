function ChallengesReducer(state, action) {
  switch (action.type) {
    case "ADD_CHALLENGE":
      return [
        { ...action.payload, id: Math.random().toString(), status: "active" },
        ...state,
      ];

    case "DELETE_CHALLENGE":
      return state.filter((challenge) => challenge.id !== action.payload);

    case "UPDATE_CHALLENGE_STATUS":
      return state.map((challenge) => {
        if (challenge.id === action.payload.challengeId) {
          return { ...challenge, status: action.payload.newStatus };
        }
        return challenge;
      });
  }
}

export default ChallengesReducer;
