<template>

  <!-- this is a form to add a new reason -->
  <add-reason></add-reason>

  <!-- these are the user's reasons, listed out -->
  <account-reasons></account-reasons>

</template>

<script>
import AddReason from './AddReason.vue';
import AccountReasons from './AccountReasons.vue';

export default {
  components: {
    AddReason,
    AccountReasons,
  },
};
</script>

