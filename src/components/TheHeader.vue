<template>
  <div>
    <v-app-bar
      fixed
      dark
      color="black"
    >
      <v-app-bar-title @click="homeOrDash"><router-link class="text-yellow font-weight-bold" :to="homeOrDash">STACKIN Wins</router-link></v-app-bar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-spacer></v-spacer>
    <v-navigation-drawer 
      v-model="drawer" 
      temporary
    >
      <v-list nav>
        <v-list-item v-if="!isAuthenticated">
          <router-link to="/login">Login</router-link>
        </v-list-item>
        <v-list-item v-if="!isAuthenticated">
          <router-link to="/signup">Signup</router-link>
        </v-list-item>
        <v-list-item v-if="isAuthenticated">
          <router-link to="/dash">Dashboard</router-link>  
        </v-list-item>
        <v-list-item v-if="isAuthenticated">
          <router-link to="/my-account">My Account</router-link>  
        </v-list-item>
        <!-- <v-list-item>
          <router-link to="/performance-review">Review</router-link>
        </v-list-item> -->
        <v-list-item>
          <router-link to="/faq">FAQs</router-link>
        </v-list-item>
        <v-list-item v-if="isAuthenticated">
          <router-link to="#" @click.prevent="signOut">Sign out</router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>


  <!-- <v-btn class="mt-15" @click.prevent="printStuff">print stuff</v-btn> -->
</template>

<script>
export default {
  computed: {
    /* DEV - remove before deploy */
    uId() {
      return this.$store.getters['uId'];
    },
    today() {
      return this.$store.getters['today'];
    },
    token() {
      return this.$store.getters['token'];
    },
    isAuthenticated() {
      return this.$store.getters['isAuthenticated'];
    },
    reasons() {
      return this.$store.getters['reasons/reasons'];
    },
    wins() {
      return this.$store.getters['wins/wins'];
    },
    program() {
      return this.$store.getters['wins/program'];
    },
    homeOrDash() {
      return this.isAuthenticated ? '/dash' : '/';
    }
  },
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    /* DEV - remove before deploy */
    // printStuff() {
    //   console.log('**********[ printStuff ]**********');
    //   console.log('uId:', this.uId);
    //   console.log('today:', this.today);
    //   console.log('token:', this.token);
    //   console.log('isAuthenticated:', this.isAuthenticated);
    //   console.log('reasons:', this.reasons);
    //   console.log('wins:', this.wins);
    //   console.log('program:', this.program);
    // },
    async signOut() {
      await this.$store.dispatch('signout');
      this.$router.replace('/#auth');
    }
  }
}
</script>


<style scoped>
  /* ul {
    list-style: none;
  }
  li {
    display: inline;
    margin: 6px 12px 6px 0;
  } */
</style>