<template>
    <div class="text-h5">Login</div>
    
    <v-form class="my-4">
      <v-text-field 
        label="Email" 
        variant="outlined" 
        type="email"
        v-model.trim="email"
      ></v-text-field>
      <v-text-field 
        label="Password" 
        variant="outlined" 
        type="password" 
        v-model.trim="pass"
      ></v-text-field>
      <v-btn color="green" @click.prevent="submitLogin"><span class="text-white">Login</span></v-btn>
      <router-link to="/signup" class="ml-8">Sign up instead</router-link>
      <!-- <span class="view-toggler ml-6" @click="toggleView('signup')">Sign up instead</span> -->
    </v-form>
    
</template>

<script>
export default {
  data() {
    return {
      email: '',
      pass: '',
      loginDataIsValid: true,
    };
  },
  computed: {
    uId() {
      return this.$store.getters['uId'];
    },
    token() {
      return this.$store.getters['token'];
    }
  },
  methods: {
    async submitLogin() {
      // console.log('submitting login', this.email, this.pass);
      // "validation"
      this.loginDataIsValid = true;
      if (this.email === '' || this.pass.length < 6) {
        this.loginDataIsValid = false;
        return;
      }
      // dispatch
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.pass,
        });
      } catch (err) {
        console.log(err.message);
      }
      this.$router.replace('/dash');
      this.loginDataIsValid = true;
    },
  },
}
</script>

<style scoped>
</style>
