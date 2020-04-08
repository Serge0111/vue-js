<template>
  <div>
    <md-dialog :md-active.sync="showAlertIfNotSelected">
      <md-dialog-title>Note</md-dialog-title>
      <div class="alert-msg">You can not edit or delete before you select a row.</div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="resetAlert">Ok</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'DialogAlert',
    data: () => ({
      first: false,
    }),
    methods: {
      ...mapActions(['showAlertModal']),
      resetAlert() {
        this.showAlertModal(false);
      }
    },
    computed: mapGetters(['showAlertIfNotSelected']),
  }
</script>
<style scoped>

.alert-msg{
  margin: 0 auto;
  width: 90%;
}

</style>