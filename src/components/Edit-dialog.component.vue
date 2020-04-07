<template>
  <div>
    <md-dialog :md-active.sync="isShownDialog">
      <md-dialog-title>Edit Brand</md-dialog-title>
      <form novalidate class="md-layout edit-form" v-on:submit.prevent>
        <div class="md-layout">
          <div class="md-layout-item">
            <md-field :class="getValidationClass('brandName')">
              <label for="first-name">Brand Name</label>
              <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.brandName" />
              <span class="md-error" v-if="!$v.form.brandName.required">The brand name is required</span>
              <span class="md-error" v-else-if="!$v.form.brandName.minlength">Invalid brand name</span>
            </md-field>
          </div>
        </div>
      </form>
      
      <md-dialog-actions>
        <md-button class="md-primary" @click="isShownDialog = false">Close</md-button>
        <md-button class="md-primary" @click="validateEditedBrand">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-primary" @click="showPopup">
      <md-icon>edit</md-icon>
    </md-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
} from 'vuelidate/lib/validators'

  export default {
    name: 'DialogEdit',
    mixins: [validationMixin],
    data: () => ({
      form: {
        brandName: null,
      },
      isShownDialog: false,
      brandItem: null,
    }),
    validations: {
      form: {
        brandName: {
          required,
          minLength: minLength(3)
        },
      }
    },
    methods: {
      ...mapActions(['updateBrand']),
      showPopup() {
        console.log('WATCH IT', this.brand);
        this.isShownDialog = true;
        this.brandItem = this.editSelectedItem;
        this.form.brandName = this.brandItem.name;
      },
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      saveEditedBrand () {
        this.brandItem.name = this.form.brandName;
        console.log('BORINIA', this.brandItem)
        this.updateBrand(this.brandItem);
        this.isShownDialog = false;
      },
      validateEditedBrand () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveEditedBrand()
        }
      }
    },
    computed: mapGetters(['editSelectedItem']),
  }
</script>

<style scoped>
  .md-dialog {
    max-width: 768px;
  }
  .edit-form {
    width: 90%;
    margin:  0 auto;;
  }
</style>