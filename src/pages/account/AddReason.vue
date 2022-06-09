<template>
  <v-card 
    outlined 
    density="compact"
    class="bg-teal mt-3 mb-5" 
  >
    <v-card-title class="text-white">add a reason why you want things to change</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="addAReason" density="compact">
        <v-textarea 
          density="compact"
          rows="3"
          auto-grow
          bg-color="white"
          v-model.trim="newReason"
        ></v-textarea>
        <v-btn class="bg-green" block type="submit"><span class="text-white">Add this reason</span></v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      newReason: "what are you doing all this for? who is it for? who do you want to be? what do you admire?", 
    };
  },
  computed: {
    today() {
      return this.$store.getters["today"];
    },
  },
  methods: {
    addAReason() {
      const data = {
        reason: this.newReason,
        dateCreated: this.today,
        dateUpdated: this.today,
      };
      this.$store.dispatch("reasons/addNewReason", data);
      this.newReason = "";
    },
  },
};
</script>

