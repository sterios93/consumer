<template>
  <div>
    <vue-tel-input
      :value="value"
      v-bind="phoneProps"
      @validate="onValidate"
      @input="onInput"
      @blur="onBlur"
    />
    <p
      v-if="showPhoneError"
      class="error-message">This field is required</p>
  </div>
</template>

<script>
import VueTelInput from 'vue-tel-input'

export default {
  components: {
    VueTelInput
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    showErrors: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      phoneFieldDirty: false,
      isPhoneValid: false,
      phoneProps: {
        defaultCountry: 'de',
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        placeholder: 'Enter a phone number',
        required: true,
        enabledCountryCode: false,
        enabledFlags: true,
        preferredCountries: ['AU', 'BR'],
        onlyCountries: [],
        ignoredCountries: [],
        autocomplete: 'off',
        name: 'telephone',
        maxLen: 25,
        wrapperClasses: '',
        inputClasses: '',
        countryEnabled: true,
        dropdownOptions: {
          disabledDialCode: false
        },
        inputOptions: {
          showDialCode: true
        }
      }
    }
  },
  computed: {
    showPhoneError () {
      return this.showErrors && !this.isPhoneValid && this.phoneFieldDirty
    }
  },
  methods: {
    onValidate (event) {
      if (!this.phoneFieldDirty) return
      this.isPhoneValid = event.isValid
      this.$emit('validate', event)
    },
    onInput (event) {
      this.phoneFieldDirty = true
      this.$emit('input', event)
    },
    onBlur () {
      this.phoneFieldDirty = true
      this.$emit('blur', event)
    }
  }
}
</script>

<style lang="stylus">
    .vue-tel-input
        padding: 8px;
        border: none !important;
        border-bottom: 1px solid #cccccc !important;
        border-radius: 0;
        &:focus
            outline: none !important;
        &:focus-within
            box-shadow: none !important;
    p.error-message
        margin-top: 1px
        color: #f55a4e
        font-size: 12px !important
</style>
