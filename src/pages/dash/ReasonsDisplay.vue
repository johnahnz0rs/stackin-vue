<template>
  <div class="text-body-1 font-weight-bold my-3">"First you must create within you a Burning Desire, a driving <em>Obsession</em> — the starting point of all achievement"</div>
  
  <div v-if="!!hasReasons">
    <v-card
      v-for="reason in reasons"
      :key="reason.id"
      :id="reason.id"
      variant="outlined"
      class="my-5"
    >
      <v-card-title>
        <div class="text-body-1">{{ reason.reason }}</div>
      </v-card-title>
    </v-card>
  </div>
  <div v-else>
    <v-card>
      <v-card-text>
        <div class="text-body-2">You have no reason to go on. <router-link to="/my-account">Get some!</router-link></div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  computed: {
    hasReasons() {
      return this.$store.getters['reasons/hasReasons'];
      // return null;
    },
    reasons() {
      return this.$store.getters['reasons/reasons'];
    },
  },
  methods: {
    getAndSetReasons() {
      this.$store.dispatch('reasons/getAndSetReasons');
    },
  },
  created() {
    this.getAndSetReasons();
  }
};
</script>
