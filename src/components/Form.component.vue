<template>
  <div class="form-data"> 
    <form novalidate class="md-layout" @submit.prevent="validateNewBrand">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Brand</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('brandName')">
                <label for="first-name">Brand Name</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.brandName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.brandName.required">The brand name is required</span>
                <span class="md-error" v-else-if="!$v.form.brandName.minlength">Invalid brand name</span>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Create Brand</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="brandSaved">The brand {{ lastUser }} was saved with success!</md-snackbar>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength,
  } from 'vuelidate/lib/validators'
  import { mapActions } from 'vuex';

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      form: {
        brandName: null,
      },
      brandSaved: false,
      sending: false,
      lastUser: null
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
      ...mapActions(['addTodos']),
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.brandName = null
      },
      saveNewBrand () {
        this.sending = true
        this.addTodos(this.form.brandName)
        this.brandSaved = true
        this.sending = false
        this.clearForm()
      },
      validateNewBrand () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveNewBrand()
        }
      }
    }
  }
</script>
<style scoped>

.form-data{
  margin-top: 10px;
  width: 50%;
}

</style>