<template>

  <div class="text-h5">Sign Up</div>

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
      placeholder="min 6 characters"
    ></v-text-field>
    <p v-if="!signupDataIsValid" class="text-subtitle-2">Please enter a valid email and password.</p>
    <v-btn color="green" @click.prevent="submitSignup"><span class="text-white">Sign Up</span></v-btn>
      <router-link to="/login" class="ml-8">Login instead</router-link>
  </v-form>

</template>

<script>
export default {
  data() {
    return {
      signupDataIsValid: true,
      email: '',
      pass: '',
      // phone: '',
    };
  },
  methods: {
    async submitSignup() {
      console.log('submitting signup', this.email, this.pass);
      
      // "validation"
      this.signupDataIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.pass.length < 6
      ) {
        this.signupDataIsValid = false;
        return;
      }

      // dispatch
      await this.$store.dispatch('signup', {
        email: this.email,
        password: this.pass
      });

      this.$router.replace('/dash');

    },
  },
};
</script>

<style scoped>
.errmsg {
  border: 1px solid black;
  color: red;
  font-weight: bold;
  background-color: lightpink;
}
.errmsg p {
  padding: 8px;
  margin: 0;
}
</style>