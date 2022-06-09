<template>
  <div v-if="!!hasReasons" id="users-reasons">
    <v-card 
      v-for="reason in reasons" 
      :key="reason.id" 
      :id="reason.id"
      class="my-3 bg-green-lighten-4"
    >
      <v-card-text class="d-flex justify-space-between">
        <p>{{reason.reason}}</p>
        <router-link class="edit-delete float-right" :to="`/reason/${reason.id}`">Edit / Delete</router-link>
      </v-card-text>
    </v-card>
  </div>
  <!-- if user has no reasons -->
  <div v-else>
    <p>
      you have no reasons yet. add some, brother/sister. remember to remember:
    </p>
    <ul>
      <li>what you're doing here,</li>
      <li>
        your hard-earned lessons (don't make the same mistakes again, dogg),
      </li>
      <li>what you want (what are you doing all this for?),</li>
      <li>
        who you're doing it for (yourself, your family, your lady or man, your
        children, your teammates, your homies, and so on)
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    reasons() {
      return this.$store.getters['reasons/reasons'];
    },
    hasReasons() {
      return this.$store.getters['reasons/hasReasons'];
    },
  },
};
</script>

<style scoped>
.edit-delete {
  width: 40px !important;
  height: 100%;
  margin-left: 12px;
}
</style>
