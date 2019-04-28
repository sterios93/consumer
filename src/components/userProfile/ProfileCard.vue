<template>
            <v-form>
                <v-container py-0>
                    <v-layout wrap>
                        <v-flex xs12  md6 >
                            <v-text-field
                                    label="First Name"
                                    class="purple-input"
                                    v-model="firstName"
                                    :error-messages="firstNameErrors"
                                    :disabled="!inEditMode"
                                    @blur="validate('firstName')"/>
                        </v-flex>
                        <v-flex xs12 md6 >
                            <v-text-field
                                    label="Last Name"
                                    class="purple-input"
                                    v-model="lastName"
                                    :error-messages="lastNameErrors"
                                    :disabled="!inEditMode"
                                    @blur="validate('lastName')"/>
                        </v-flex>

                        <v-flex xs12 md6 >
                            <v-text-field
                                    label="Phone number"
                                    class="purple-input"
                                    v-model="phoneNumber"
                                    :error-messages="phoneNumberErrors"
                                    :disabled="!inEditMode"
                                    @blur="validate('phoneNumber')"/>
                        </v-flex>

                        <v-flex xs12 md4>
                            <v-text-field
                                    label="City"
                                    class="purple-input"
                                    :disabled="!inEditMode"
                                    v-model="restaurantCity"
                                    :error-messages="restaurantCityErrors"
                                    @blur="validate('restaurantCity')"
                            />
                        </v-flex>

                        <v-flex xs12 md6>
                            <v-text-field
                                    class="purple-input"
                                    label="Password"
                                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                    v-model="password"
                                    :error-messages="passwordErrors"
                                    :type="showPassword ? 'text' : 'password'"
                                    required
                                    @click:append="showPassword = !showPassword"
                                    :disabled="!inEditMode"
                                    @blur="validate('password')"
                            >
                            </v-text-field>
                        </v-flex>

                        <v-flex xs12 md6>
                            <v-text-field
                                    class="purple-input"
                                    label="Repeat Password"
                                    :append-icon="showRepeatPassword ? 'visibility' : 'visibility_off'"
                                    v-model="passwordRepeat"
                                    :error-messages="passwordRepeatErrors"
                                    :type="showRepeatPassword ? 'text' : 'password'"
                                    @click:append="showRepeatPassword = !showRepeatPassword"
                                    required
                                    v-if="inEditMode"
                                    @blur="validate('passwordRepeat')"
                            >
                            </v-text-field>
                        </v-flex>



                        <v-flex xs12 text-xs-right >
                            <v-btn
                                    class="mr-2 font-weight-light"
                                    color="orange"
                                    dark
                                    @click="setEditMode(true)"
                            >
                                <v-icon class="mr-1">
                                    mdi-account-edit
                                </v-icon>
                                Edit Profile
                            </v-btn>
                            <v-btn
                                    v-if="inEditMode"
                                    class="mx-0 font-weight-light"
                                    color="success"
                                    @click="saveProfile"
                            >Save Profile
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-form>

</template>

<script>
    import Map from '../shared/map/Map'
    import {mapState, mapActions} from 'vuex'
    import { validationMixin } from 'vuelidate'
    import { required, minLength, sameAs, numeric } from 'vuelidate/lib/validators';
    // TODO :: Fix the map logic
    export default {
      name: 'profile-card',
      components: {
        Map,
      },
      mixins: [validationMixin],
      data() {
        return {
          firstNameErrors: [],
          lastNameErrors: [],
          emailErrors: [],
          phoneNumberErrors: [],
          passwordErrors: [],
          passwordRepeat: null,
          passwordRepeatErrors: [],
          showPassword: false,
          showRepeatPassword: false,
          allFields: [
            'firstName',
            'lastName',
            'phoneNumber',
            'password',
            'passwordRepeat',
          ],
        }
      },
      computed: {
        ...mapState({
          userInfo: (state) => state.userProfile,
          inEditMode: (state) => state.userProfile.inEditMode,
        }),
        firstName: {
          get() {return this.userInfo.firstName},
          set(value) {
            this.setFirstName(value);
            this.validate('firstName');
          }
        },
        lastName: {
          get() {return this.userInfo.lastName},
          set(value) {
            this.setLastName(value);
            this.validate('lastName');
          }
        },
        phoneNumber: {
          get() {return this.userInfo.phoneNumber},
          set(value) {
            this.setPhoneNumber(value);
            this.validate('phoneNumber');
          }
        },
        password: {
          get() {return this.userInfo.password},
          set(value) {
            this.setPassword(value);
            this.validate('password');
          }
        },
      },
      watch: {
        passwordRepeat: 'passRepeatHandler'
      },
      methods: {
        ...mapActions('userProfile', [
          'setEditMode',
          'setFirstName',
          'setLastName',
          'setEmail',
          'setPhoneNumber',
          'setPassword',
          'setProfileValid',
          'setCity',
        ]),
        ...mapActions('snackbar', ['setState']),
        saveProfile() {
          // TODO :: send the data to the database
          this.$v.$touch();
          if (this.$v.$invalid || this.hasError()) {
            this.setProfileValid(false)
            this.setState({snackbar: true, message: 'Please fill correct all fields.', color: 'red'});
          } else {
            // Todo, check in the database if the email is not in use already
            this.setState({snackbar: true, message: 'Profile updated.', color: 'green'});
            this.setEditMode(false);
            this.setProfileValid(true);
          }
        },
        validate(target) {
          // Reset the errors everytime, so you can have dynamic fresh array on every keystroke
          this[target + 'Errors'] = [];
          this.$v[target].$touch();

          this.hasError() && this.setProfileValid(false);
          !this.hasError() && this.setProfileValid(true);

          this.checkRequired(target);
          this.checkNumeric(target);
          this.checkLength(target);
          this.checkSameAs(target)
          return this[target + 'Errors']
        },
        hasError() {
          return this.allFields.reduce((result, item) => {
            if (this.$v[item].$error) result.push(false);
            else result.push(true)
            return result
          },[])
            .includes(false)
        },
        checkNumeric(target) {
          (this.$v[target].numeric !== undefined) && !this.$v[target].numeric && !this[target + 'Errors'].includes('Must be numeric') && this[target + 'Errors'].push('Must be numeric');
        },
        checkLength(target) {
          (this.$v[target].minLength !== undefined) && !this.$v[target].minLength && !this[target + 'Errors'].includes('Must be minimum 5 characters long') && this[target + 'Errors'].push('Must be minimum 5 characters long');
        },
        checkSameAs(target) {
          (this.$v[target].sameAsPassword !== undefined) && !this.$v[target].sameAsPassword && !this[target + 'Errors'].includes('Passwords must be the same') && this[target + 'Errors'].push('Passwords must be the same');
        },
        checkRequired(target){
          !this.$v[target].required && this[target + 'Errors'].push('This field is required');
        },
        passRepeatHandler(){
          this.validate('passwordRepeat');
        },
      },
      validations: {
        firstName: {
          required,
        },
        lastName: {
          required
        },
        phoneNumber: {
          required,
          numeric
        },
        password: {
          required,
          minLength: minLength(5)
        },
        passwordRepeat: {
          required,
          minLength: minLength(5),
          sameAsPassword: sameAs('password')
        },

        restaurantCity: {
          required
        },
      }
    }
</script>

<style scoped lang="stylus">
    .disabled
        pointer-events none
</style>
