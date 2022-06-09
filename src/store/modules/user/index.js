import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const today = new Date().toLocaleDateString().replace('/', '-').replace('/', '-').replace('. ', '-').replace('. ', '-').replace('.', '-').replace('.', '-');

export default {
  // namespaced: true,
  state() {
    return {
      today,
      uId: null,
      token: null,
      isAuthenticated: false,
      didAutoSignout: false,
    };
  },
  mutations,
  actions,
  getters,
};