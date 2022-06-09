<template>
  <v-card 
    outlined 
    density="compact"
    class="bg-teal mt-3 mb-5"
  >
    <v-card-title class="text-white">add a daily win to your program</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="addAWinToProgram" density="compact">
        <v-textarea
          density="compact" 
          rows="2"
          auto-grow
          bg-color="white"
          v-model.trim="newWin"
        ></v-textarea>
        <v-btn class="bg-green" block type="submit"><span class="text-white">Add this win to your program</span></v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      newWin: 'stack wins everyday.',
    };
  },
  computed: {
    today() {
      return this.$store.getters['today'];
    }
  },
  methods: {
    addAWinToProgram() {
      console.log('starting addAWinToProgram()');
      const data = {
        win: this.newWin,
        dateCreated: this.today,
        dateUpdated: this.today,
      };
      console.log('starting this.$store.dispatch(wins/addNewWinToProgram', data);
      this.$store.dispatch('wins/addNewWinToProgram', data);
      this.newWin = '';
    }
  }
}
</script>


