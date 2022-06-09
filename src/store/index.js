import { createStore } from 'vuex';

import userModule from './modules/user/index';
import reasonsModule from './modules/reasons/index.js';
import winsModule from './modules/wins/index.js';

const store = createStore({
  modules: {
    reasons: reasonsModule,
    wins: winsModule,
    user: userModule,
  }
});

export default store;