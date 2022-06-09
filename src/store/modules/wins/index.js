import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      program: null,
      hasProgram: null,
      wins: null,
      hasWins: null,
    };
  },
  mutations,
  actions,
  getters
};