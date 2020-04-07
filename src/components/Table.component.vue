<template>
  <div class="table-data">
    <md-table class="md-primary" v-model="allBrands" md-sort="name" md-sort-order="asc" md-card @md-selected="onSelect">
      <md-table-toolbar>
        <h1 class="md-title">Brands</h1>
        <div class="md-toolbar-section-end">
          <DialogEdit/>
          <md-button class="md-icon-button" v-on:click="removeById">
            <md-icon>delete</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Quantity" md-sort-by="quantity">{{ item.quantity }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import { mapGetters, mapActions } from 'vuex';
import DialogEdit from './Edit-dialog.component.vue'

Vue.use(VueMaterial)
  export default {
    components: {
      DialogEdit
    },
    name: 'TableSort',
    data: () => ({
      selected: null,
      brand: null,
      id: undefined,
    }),
    methods: {
      ...mapActions(['fetchBrands']),
      ...mapActions(['removeBrand']),
      ...mapActions(['selectItem']),
      onSelect (items) {
        this.selected = items;
        console.log('SELECTED', this.selected);
        this.selectItem(this.selected);
        this.id = this.selected ? this.selected.id : this.id;
      },
      removeById() {
        this.removeBrand(this.id)
      },
      getAlternateLabel (count) {
        let plural = ''

        if (count > 1) {
          plural = 's'
        }

        return `${count} user${plural} selected`
      },
      passCurrentBrand() {
        this.brand = this.selected;
      }
    },
    computed: mapGetters(['allBrands']),
    created() {
      this.fetchBrands();
    },
  }
</script>
