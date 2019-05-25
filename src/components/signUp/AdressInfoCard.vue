<template>
    <v-container>
        <v-layout wrap>
            <v-flex xs12>
                <Map storeModule="signUp"></Map>
            </v-flex>

            <v-flex
                    xs12
                    md4>
                <v-text-field
                        label="City"
                        class="purple-input"
                        :error-messages="restaurantCityErrors"
                        v-model="restaurantCity"
                        @blur="validate('restaurantCity')"
                />
            </v-flex>
            <v-flex
                    xs12
                    md4>
                <v-text-field
                        label="Country"
                        class="purple-input"
                        :error-messages="restaurantCountryErrors"
                        v-model="restaurantCountry"
                        @blur="validate('restaurantCountry')"
                />
            </v-flex>
            <v-flex
                    xs12
                    md4>
                <v-text-field
                        class="purple-input"
                        label="Postal Code"
                        type="number"
                        :error-messages="restaurantPostalCodeErrors"
                        v-model="restaurantPostalCode"
                        @blur="validate('restaurantPostalCode')"
                />
            </v-flex>

            <v-flex>
<!--                <v-btn color="primary" @click="stepClick(2)">Back</v-btn>-->
                <v-btn color="primary" @click="e1 = 1" >Continue</v-btn>
                <v-btn flat>Cancel</v-btn>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Map from '../shared/map/Map';
import { mapActions, mapState } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';


    export default {
        name: 'address-info-card',
        components: {
            Map
        },
        mixins: [validationMixin],
        data () {
            return {
              restaurantCityErrors: [],
              restaurantCountryErrors: [],
              restaurantPostalCodeErrors: [],
              allFields: [
                'restaurantAddress',
                'restaurantCity',
                'restaurantCountry',
                'restaurantPostalCode'
              ],
            }
        },
      computed: {
        ...mapState({
          userInfo: (state) => state.signUp,
        }),
        restaurantCity: {
          get() {return this.userInfo.city},
          set(value) {
            this.setCity(value);
            this.validate('restaurantCity');
          }
        },
        restaurantCountry: {
          get() {return this.userInfo.country},
          set(value) {
            this.setCountry(value);
            this.validate('restaurantCountry');
          }
        },
        restaurantPostalCode: {
          get() {return this.userInfo.postalCode},
          set(value) {
            this.setPostalCode(value);
            this.validate('restaurantPostalCode');
          }
        },
      },
         methods: {
             ...mapActions('signUp', [
                'setAddress',
                'setCity',
                'setCountry',
                'setPostalCode',
            ]),
           validate(target) {
             // Reset the errors everytime, so you can have dynamic fresh array on every keystroke
             this[target + 'Errors'] = [];
             this.$v[target].$touch();

             // this.hasError() && this.setProfileValid(false);
             // !this.hasError() && this.setProfileValid(true);

             this.checkRequired(target);
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
        restaurantCity: {
          required
        },
        restaurantCountry: {
          required
        },
        restaurantPostalCode: {
          required
        }
      }
    }
</script>

<style scoped lang="stylus">

</style>
