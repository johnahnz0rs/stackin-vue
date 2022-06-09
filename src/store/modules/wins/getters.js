export default {
  wins(state) {
    return state.wins;
  },
  hasWins(state) {
    return state.wins && state.wins.length > 0;
  },
  program(state) {
    return state.program;
  },
  hasProgram(state) {
    return state.program && state.program.length > 0;
  }
};