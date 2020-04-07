<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Preferences</md-dialog-title>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-primary" @click="showDialog = true">
      <md-icon>edit</md-icon>
    </md-button>
  </div>
</template>

<script>
  export default {
    name: 'DialogEdit',
    data: () => ({
      showDialog: false
    })
  }
</script>

<style scoped>
  .md-dialog {
    max-width: 768px;
  }
</style>