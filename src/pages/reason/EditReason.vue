<template>
  <div class="px-4">
    <div class="text-h5 my-3 font-weight-bold">Edit Reason</div>

    <div v-if="!!reason">
      <v-form
        @submit.prevent="updateReason" 
        density="compact"
        class="mt-8 mb-14"
      >
        <v-textarea
          rows="3"
          auto-grow
          bg-color="white"
          variant="outlined"
          v-model.trim="reason"
        ></v-textarea>
        <div class="text-subtitle-2">Created on: {{ dateCreated }}</div>
        <div class="text-subtitle-2 mb-4">Last updated on: {{ dateUpdated }}</div>
        <v-btn
          type="submit"
          block
          class="bg-green"
        ><span class="text-white">Update Reason</span></v-btn>
      </v-form>
      <div class="d-flex justify-space-between">
        <v-btn @click.prevent="cancel" class="bg-grey">Cancel</v-btn>
        <v-btn @click.prevent="deleteReason" class="bg-red"><span class="text-white">Delete Reason</span></v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      reason: null,
      dateCreated: null,
      dateUpdated: null,
    };
  },
  methods: {
    async getTheReason() {
      const allReasons = await this.$store.getters['reasons/reasons'];
      // console.log('allReasons', allReasons);
      if (!allReasons) {
        this.$router.replace('/my-account/#my-account-my-reasons');
      }
      let currentReason = allReasons.filter((item) => item.id == this.id);
      currentReason = currentReason[0];
      this.reason = currentReason.reason;
      this.dateCreated = currentReason.dateCreated.replace('-', '/').replace('-', '/');
      this.dateUpdated = currentReason.dateUpdated.replace('-', '/').replace('-', '/');
    },
    async updateReason() {
      console.log('updateReason');
      await this.$store.dispatch('reasons/updateOneReason', {
        id: this.id,
        reason: this.reason,
        dateCreated: this.dateCreated,
      });
      this.$router.replace('/my-account/#my-account-my-reasons');
    },
    async deleteReason() {
      await this.$store.dispatch('reasons/deleteOneReason', {
        id: this.id
      });
      this.$router.replace('/my-account/#my-account-my-reasons');
    },
    cancel() {
      this.$router.replace('/my-account/#my-account-my-reasons');
    },
  },
  created() {
    this.getTheReason();
  },
};
</script>

