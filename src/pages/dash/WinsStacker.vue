<template>
  <div class="text-body-1 font-weight-bold my-3">Wins are habits that <em>You</em> think are admirable and desirable. Do these <span class="text-decoration-underline">every</span>day to earn self-love, self-confidence. Push for growth.</div>

  <div v-if="!!hasWins">
    <v-card v-for="win in wins"
      :key="win.id"
      :id="win.id"
      class="d-flex pa-4 my-4"
    >
      <v-icon
        v-if="!!win.stacked"
        class="mr-2"
        @click.prevent="stackWin(win.id, false, win.programId, win.win, win.dateCreated)"
      >
        mdi-checkbox-marked-outline
      </v-icon>
      <v-icon
        v-else
        class="mr-2"
        @click.prevent="stackWin(win.id, true, win.programId, win.win, win.dateCreated)"
      >
        mdi-checkbox-blank-outline
      </v-icon>
      <p :class="win.stacked ? 'text-decoration-line-through' : ''">{{ win.win }}</p>
    </v-card>
  </div>
  <div v-else>
    <div class="text-h6 text-center mt-4 border-1">
      you have yet to set your program. 
      <br />
      <router-link to="/my-account#users-program">add a few wins</router-link>
    </div>
  </div>


</template>

<script>
export default {
  computed: {
    hasWins() {
      return this.$store.getters['wins/hasWins'];
    },
    wins() {
      return this.$store.getters['wins/wins'];
    },
    hasProgram() {
      return this.$store.getters['wins/hasProgram'];
    },
    program() {
      return this.$store.getters['wins/program']
    }
  },
  methods: {
    stackWin(id, stackedStatus, programId, win, dateCreated) {
      console.log('stack or unstack win id#', id, stackedStatus);
      this.$store.dispatch('wins/updateOneWin', {
        id,
        stacked: stackedStatus,
        programId,
        win,
        dateCreated,
      })
    },
  },
};
</script>

<style scoped>
i:hover {
  cursor: pointer;
}
</style>
