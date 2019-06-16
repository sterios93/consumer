<template>
    <v-container>
        <v-layout wrap>
            <v-flex xs12 md6>
                <v-text-field
                    class="purple-input"
                    label="First Name (required)"
                    v-model="firstName"
                    :error-messages="firstNameErrors"
                    required
                    @input="validate('firstName')"
                    @blur="validate('firstName')"
                    >
                </v-text-field>
            </v-flex>

            <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Last Name (required)"
                v-model="lastName"
                :error-messages="lastNameErrors"
                required
                @input="validate('lastName')"
                @blur="validate('lastName')"
                >
            </v-text-field>
            </v-flex>

            <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="E-mail (required)"
                v-model="email"
                :error-messages="emailErrors"
                required
                @input="validate('email')"
                @blur="validate('email')"
                >
            </v-text-field>
            </v-flex>

            <v-flex
                xs12
                md6>
                <CustomPhoneValidate
                v-model="phoneNumber"
                @validate="validatePhoneNumbebr"
                />
            </v-flex>


            <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Password (required)"
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                v-model="password"
                :error-messages="passwordErrors"
                :type="showPassword ? 'text' : 'password'"
                required
                @click:append="showPassword = !showPassword"
                @input="validate('password')"
                @blur="validate('password')"
                >
            </v-text-field>
            </v-flex>

            <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Repeat Password (required)"
                :append-icon="showRepeatPassword ? 'visibility' : 'visibility_off'"
                v-model="passwordRepeat"
                :error-messages="passwordRepeatErrors"
                :type="showRepeatPassword ? 'text' : 'password'"
                 @click:append="showRepeatPassword = !showRepeatPassword"
                required
                @input="validate('passwordRepeat')"
                @blur="validate('passwordRepeat')"
                >
            </v-text-field>
            </v-flex>

            <v-flex>
                <v-btn
                color="primary"
                @click="onSignUpClick"
                >
                Sign Up
                </v-btn>

                <v-btn flat @click="onCancelClick">Cancel</v-btn>
            </v-flex>

            <v-flex>
                <vue-recaptcha
                        @verify="onVerify"
                        @expired="onExpired"
                        sitekey="6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-"
                        ref="recaptcha">
                </vue-recaptcha>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs, email, numeric } from 'vuelidate/lib/validators';
import VueRecaptcha from 'vue-recaptcha';
import CustomPhoneValidate from '../shared/CustomPhoneValidate'

    export default {
        name: 'personal-info-card',
        mixins: [validationMixin],
        components: {
          VueRecaptcha,
          CustomPhoneValidate
        },
        data () {
            return {
                recaptchaVerified: false,
                firstName: null,
                firstNameErrors: [],
                lastName: null,
                lastNameErrors: [],
                email: null,
                emailErrors: [],
                phoneNumber: null,
                phoneNumberErrors: [],
                password: null,
                passwordErrors: [],
                passwordRepeat: null,
                passwordRepeatErrors: [],
                showPassword: false,
                showRepeatPassword: false,
                allFields: ['firstName', 'lastName', 'email', 'password', 'passwordRepeat'],
            }
        },
        methods: {
            ...mapActions('signUp', [
                'setPersonalInfo',
                'setPersonalInfoInvalid',
                'setPersonalInfoValid',
                // 'setActiveStepNumber',
            ]),
          onCancelClick() {
            this.$router.push('/home')
          },
          onVerify: function (response) {
            this.recaptchaVerified = response;
          },
          onExpired: function () {
            this.recaptchaVerified = false;
          },
          resetRecaptcha () {
            this.$refs.recaptcha.reset();
            this.recaptchaVerified = false;
          },
            onSignUpClick() {
                this.$v.$touch();
                if (this.$v.$invalid || !this.recaptchaVerified) {
                    this.setPersonalInfoInvalid();
                } else {
                    this.setPersonalInfo({
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        phoneNumber: this.phoneNumber,
                        password: this.password,
                    }).then(() => {
                      this.resetRecaptcha();
                      this.$emit('sign-up-clicked')
                    });
                  // this.setActiveStepNumber(2);
                }
            },
            validatePhoneNumbebr (e) {
                if (!e.isValid) {
                    this.isPhoneValid = false
                    this.setPersonalInfoInvalid()
                } else {
                    this.isPhoneValid = true
                    this.countryInfo = e.country
                    this.setPersonalInfoValid()
                }
            },
            validate(target) {
                // Reset the errors everytime, so you can have dynamic fresh array on every keystroke
                this[target + 'Errors'] = [];
                this.$v[target].$touch();

                this.hasError() && this.setPersonalInfoInvalid();
                !this.hasError() && this.setPersonalInfoValid();

                this.checkRequired(target);
                this.checkEmail(target);
                this.checkNumeric(target);
                this.checkLength(target);
                this.checkSameAs(target)
                return this[target + 'Errors']
            },
            hasError() {
                return this.allFields.reduce((result, item) => {
                    if (this.$v[item].$error) result.push(false)
                    else result.push(true)
                    return result
                },[])
                .includes(false)
            },
            checkEmail(target) {
                (this.$v[target].email !== undefined) && !this.$v[target].email && !this[target + 'Errors'].includes('Must be valid e-mail') && this[target + 'Errors'].push('Must be valid e-mail');
            },
            checkNumeric(target) {
                (this.$v[target].numeric !== undefined) && !this.$v[target].numeric && !this[target + 'Errors'].includes('Must be numeric') && this[target + 'Errors'].push('Must be numeric');
            },
            checkLength(target) {
                (this.$v[target].minLength !== undefined) && !this.$v[target].minLength && !this[target + 'Errors'].includes('Must be minimum 6 characters long') && this[target + 'Errors'].push('Must be minimum 6 characters long');
            },
            checkSameAs(target) {
                (this.$v[target].sameAsPassword !== undefined) && !this.$v[target].sameAsPassword && !this[target + 'Errors'].includes('Passwords must be the same') && this[target + 'Errors'].push('Passwords must be the same');
            },
            checkRequired(target){
                !this.$v[target].required && this[target + 'Errors'].push('This field is required');
            }
        },
      beforeDestroy(){
          this.resetRecaptcha();
      },
        validations: {
            firstName: {
                required,
            },
            lastName: {
                required
            },
            email: {
                required,
                email,
            },
            password: {
                required,
                minLength: minLength(6)
            },
            passwordRepeat: {
                required,
                minLength: minLength(6),
                sameAsPassword: sameAs('password')
            },
        }
    }
</script>

<style scoped lang="stylus">

</style>
