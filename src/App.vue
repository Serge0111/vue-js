<template>
  <div id="app">
    <div class="table-component">
      <TableSort/>
    </div>
    <div class="create-brand">
      <FormValidation/>
    </div>
  </div>
</template>

<script>
import TableSort from './components/Table.component.vue'
import FormValidation from './components/Form.component.vue'

export default {
  name: 'App',
  components: {
    TableSort,
    FormValidation,
  },
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.create-brand {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.table-component {
  width: 90%;
}
</style>
