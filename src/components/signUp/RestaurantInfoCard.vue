<template>
    <v-container>
        <v-layout wrap>
        <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Restaurant Name"
                v-model="restaurantName"
                :error-messages="restaurantNameErrors"
                required
                @input="validate('restaurantName')"
                @blur="validate('restaurantName')"
                >
            </v-text-field>
        </v-flex>

        <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Restaurant Type"
                v-model="restaurantType"
                :error-messages="restaurantTypeErrors"
                required
                @input="validate('restaurantType')"
                @blur="validate('restaurantType')"
                >
            </v-text-field>
        </v-flex>

        <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Restaurant website"
                v-model="restaurantWebsite"
                required>
            </v-text-field>
        </v-flex>

        <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Restaurant number"
                v-model="restaurantNumber"
                :error-messages="restaurantNumberErrors"
                required
                @input="validate('restaurantNumber')"
                @blur="validate('restaurantNumber')"
                >
            </v-text-field>
        </v-flex>

        <v-flex>
<!--             <v-btn color="primary" @click="setActiveStepNumber(1);">Back</v-btn>-->
            <v-btn
                color="primary"
                @click="nextScreen(3)"
            >
                Continue
            </v-btn>

            <v-btn flat>Cancel</v-btn>
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs, email, numeric } from 'vuelidate/lib/validators';

    export default {
        name: 'restaurant-info-card',
        mixins: [validationMixin],
        data () {
            return {
                restaurantName: null,
                restaurantNameErrors: [],
                restaurantType: null,
                restaurantTypeErrors: [],
                restaurantWebsite: null,
                restaurantNumber: null,
                restaurantNumberErrors: [],
                allFields: ['restaurantName', 'restaurantType', 'restaurantNumber'],
            }
        },
        methods: {
             ...mapActions('signUp', [
                // 'setActiveStepNumber',
                'setRestaurantInfoValid',
                'setRestaurantInfoInvalid',
                'setRestaurantInfo',
            ]),
            nextScreen(stepNumber) {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.setRestaurantInfoInvalid();
                } else {
                    this.setRestaurantInfo({
                        restaurantName: this.restaurantName,
                        restaurantType: this.restaurantType,
                        restaurantWebsite: this.restaurantWebsite,
                        restaurantNumber: this.restaurantNumber,
                    });
                    // this.setActiveStepNumber(stepNumber);
                }
            },
            validate(target) {
                // Reset the errors everytime, so you can have dynamic fresh array on every keystroke
                this[target + 'Errors'] = [];
                this.$v[target].$touch();

                this.hasError() && this.setRestaurantInfoInvalid();
                !this.hasError() && this.setRestaurantInfoValid();

                this.checkRequired(target);
                this.checkNumeric(target);
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
            checkRequired(target){
                !this.$v[target].required && this[target + 'Errors'].push('This field is required');
            }
        },
        validations: {
            restaurantName: {
                required,
            },
            restaurantType: {
                required
            },
            restaurantNumber: {
                required,
                numeric,
            },
        }
    }
</script>
