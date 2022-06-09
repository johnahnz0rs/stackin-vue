<template>
  <div class="px-4 my-6">
    <!-- <div class="text-h4">this is homepage, bro</div> -->
    <!-- <div class="text-h6">lol we stack wins, then we feel great.</div> -->
    <div class="text-h4">lol we stack wins, then we feel great.</div>
  </div>
  <div id="auth" class="mt-10 px-6">
    <v-card v-if="displayLogin" class="mx-auto px-6 py-3">
      <login-form></login-form>
    </v-card>
    <v-card v-else-if="displaySignup" class="mx-auto px-6 py-3">
      <signup-form></signup-form>
    </v-card>
  </div>
</template>

<script>
import LoginForm from './LoginForm.vue';
import SignupForm from './SignupForm.vue';
export default {
  components: {
    LoginForm,
    SignupForm,
  },
  props: ['view'], 
  data() {
    return {
      displayLogin: true,
      displaySignup: false,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['isAuthenticated'];
    }
  }, 
  methods: {
    toggleView(view) {
      if (view == 'login') {
        this.displayLogin = true;
        this.displaySignup = false;
      } else if (view == 'signup') {
        this.displayLogin = false;
        this.displaySignup = true;
      }
    }
  },
  created() {
    if (this.view) {
      this.toggleView(this.view);
    }
  },
  updated() {
    if (this.view) {
      this.toggleView(this.view);
    }
  }
}
</script>

<style scoped>
.v-card {
  max-width: 400px !important;
}
</style>