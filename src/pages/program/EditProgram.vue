<template>

  <div class="px-4">
    <div class="text-h5 my-3 font-weight-bold">Edit Program</div>

    <div v-if="!!win">
      <v-form
        @submit.prevent="updateOneProgram"
        density="compact"
        class="mt-8 mb-14"
      >
        <v-textarea
          rows="3"
          auto-grow
          bg-color="white"
          variant="outlined"
          v-model.trim="win"
        ></v-textarea>
        <div class="text-subtitle-2">Created on: {{ dateCreated }}</div>
        <div class="text-subtitle-2 mb-4">Last updated on: {{ dateUpdated }}</div>
        <v-btn
          type="submit"
          block
          class="bg-green"
        ><span class="text-white">Update Program</span></v-btn>
      </v-form>
      <div class="d-flex justify-space-between">
        <v-btn @click.prevent="cancel" class="bg-grey">Cancel</v-btn>
        <v-btn @click.prevent="deleteAProgram" class="bg-red"><span class="text-white">Delete this Daily Win</span></v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      win: null,
      dateCreated: null,
      dateUpdated: null,
    };
  },
  methods: {
    async getTheProgram() {
      const allProgram = await this.$store.getters['wins/program'];
      if (!allProgram) {
        this.$router.replace('/my-account/#my-account-my-program');
      }
      const currentProgram = allProgram.filter(item => item.id == this.id);
      this.win = currentProgram[0].win;
      this.dateCreated = currentProgram[0].dateCreated.replace('-', '/').replace('-', '/');
      this.dateUpdated = currentProgram[0].dateUpdated.replace('-', '/').replace('-', '/');
    },
    async updateOneProgram() {
      await this.$store.dispatch('wins/updateOneProgram', {
        id: this.id,
        win: this.win,
        dateCreated: this.dateCreated,
      });
      this.$router.replace('/my-account/#my-account-my-program');
    },
    cancel() {
      this.$router.replace('/my-account/#my-account-my-program');
    },
    async deleteAProgram() {
      await this.$store.dispatch('wins/deleteOneProgram', {
        id: this.id
      });
      this.$router.replace('/my-account/#my-account-my-program');
    },
  },
  created() {
    this.getTheProgram();
  },
}
</script>


<style scoped>
label {
  font-size: 12px;
}
textarea {
  width: 100%;
}
.flex {
  display: flex;
  justify-content: space-between;
}
input[type=submit] {
  padding: 8px;
  background-color: green;
  color: white;
  /* text-shadow: 1px 1px; */
  font-weight: bold;
  border-radius: 4px;
}
button {
  padding: 8px;
  border-radius: 4px;
  font-weight: bold;
}
.cancel {
  background-color: lightgray;
  color: darkslategray;
}
.delete {
  background-color: lightcoral;
  color: white;
}
</style>
