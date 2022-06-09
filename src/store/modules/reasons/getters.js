export default {
  reasons(state) {
    return state.reasons;
  },
  hasReasons(state) {
    return state.reasons && state.reasons.length > 0;
  }
};