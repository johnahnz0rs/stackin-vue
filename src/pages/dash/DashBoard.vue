<template>
  <div id="dashboard" class="px-4">
    <div class="d-flex justify-space-between my-3 align-end">
      <div class="text-h5 font-weight-bold">Dashboard</div>
      <div class="text-h6 font-weight-bold">{{ today }}</div>
    </div>
    

    <v-tabs grow fixed-tabs>
      <v-tab
        :class="{ active: reasonsIsVisible }"
        @click="setView('reasons')"
      >
        Burning Desire
      </v-tab>
      <v-tab
        :class="{ active: winsIsVisible }"
        @click="setView('wins')"
      >
        Program
      </v-tab>
    </v-tabs>

    <section v-if="reasonsIsVisible">
      <reasons-display></reasons-display>
    </section>

    <section v-else-if="winsIsVisible">
      <wins-stacker></wins-stacker>
    </section>

  </div>
</template>

<script>
import WinsStacker from './WinsStacker.vue';
import ReasonsDisplay from './ReasonsDisplay.vue';

export default {
  components: {
    ReasonsDisplay,
    WinsStacker,
  },
  data() {
    return {
      reasonsIsVisible: false,
      winsIsVisible: true,
    };
  },
  computed: {
    today() {
      return this.$store.getters['today'];
    },
  },
  methods: {
    setView(view) {
      if (view == 'reasons') {
        this.reasonsIsVisible = true;
        this.winsIsVisible = false;
      } else if (view == 'wins') {
        this.reasonsIsVisible = false;
        this.winsIsVisible = true;
      }
    },
    createWinsForDashboard() {
      this.$store.dispatch('wins/createWinsForDashboard');
    }
  },
  created() {
    this.createWinsForDashboard();
  },
};
</script>

<style scoped>
button {
  width: 50% !important;
}
button.active {
  /* background-color: darkseagreen !important; */
  background-color: lightblue !important;
}
</style>
