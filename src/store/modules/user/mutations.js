export default {
  setUser(state, data) {
    state.uId = data.uId;
    state.token = data.token;
    state.isAuthenticated = true;
    state.didAutoSignout = false;
  },
  setAutoSignout(state) {
    state.didAutoSignout = true;
  },
};