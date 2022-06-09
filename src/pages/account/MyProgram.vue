<template>
    
    <!-- this is a form to add a new program item -->
    <add-program></add-program>

    <!-- this are the user's program, each win listed out -->
    <account-program></account-program>

</template>

<script>
import AccountProgram from './AccountProgram.vue';
import AddProgram from './AddProgram.vue';

export default {
  components: {
    AddProgram,
    AccountProgram,
  },
}
</script>


