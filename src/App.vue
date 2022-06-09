<template>
  <v-app>
    <TheHeader />
    <v-main>
      <div id="lol">
      <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from './components/TheHeader.vue';

export default {
  components: {
    TheHeader
  },
  computed: {
    didAutoSignout() {
      return this.$store.getters.didAutoSignout;
    },
  },
  created() {
    this.$store.dispatch('autoLogin');
  },
  watch: {
    didAutoSignout(curVal, oldVal) {
      if (curVal && curVal !== oldVal) {
        this.$router.replace('/');
      }
    }
  }
}
</script>

<style scoped>
#lol {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
</style>