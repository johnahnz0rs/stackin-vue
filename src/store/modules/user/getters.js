export default {
  uId(state) {
    return state.uId;
  },
  today(state) {
    return state.today;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  didAutoSignout(state) {
    return !!state.didAutoSignout;
  }
};