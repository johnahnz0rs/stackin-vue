<template>
  <div id="my-account" class="px-4">
    <div class="text-h5 my-3 font-weight-bold">My Account</div>

    <v-tabs grow>
      <v-tab 
        :class="{ active: reasonsIsVisible }" 
        @click="setView('reasons')"
      >
        My Reasons
      </v-tab>
      <v-tab 
        :class="{ active: programIsVisible }" 
        @click="setView('program')"
      >
        My Program
      </v-tab>
    </v-tabs>

    <!-- this is the reasons section, where users can adjust their reminders -->    
    <section v-if="reasonsIsVisible" id="my-account-my-reasons">
      <my-reasons></my-reasons>
    </section>

    <!-- this is the program, where users can adjust their daily wins -->
    <section v-if="programIsVisible" id="my-account-my-program">
      <my-program></my-program>
    </section>

  </div>
</template>

<script>


import MyReasons from './MyReasons.vue';
import MyProgram from './MyProgram.vue';

export default {
  components: {
    MyReasons,
    MyProgram,
  },
  data() {
    return {
      reasonsIsVisible: true,
      programIsVisible: false,
    };
  },
  methods: {
    getReasons() {
      this.$store.dispatch('reasons/getAndSetReasons');
    },
    getProgram() {
      this.$store.dispatch('wins/getAndSetProgram');
    }, 
    setView(view) {
      if (view == 'reasons') {
        this.reasonsIsVisible = true;
        this.programIsVisible = false;
      } else if (view == 'program') {
        this.reasonsIsVisible = false;
        this.programIsVisible = true;
      }
    },
  },
  created() {
    this.getReasons();
    this.getProgram();
  }
}
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
