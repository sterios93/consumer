<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center align-center wrap>
      <v-flex xs12 md10>
        <material-card
          color="purple darken-2"
          title="Sign Up"
          text="Create your profile"
        >
          <v-form ref="form">
            <v-stepper v-model="activeStep">
                <v-stepper-header>
                  <v-stepper-step
                   :complete="1 <= activeStep"
                   step="1"
                   :rules="[() => this.isPersonalInfoValid]"
                   >
                    Personal Information
                     <small v-if="!this.isPersonalInfoValid">Please fill all fields correct.</small>
                    </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                  <!-- Personal information -->
                  <v-stepper-content step="1">
                    <personal-info-card/>
                  </v-stepper-content>

                </v-stepper-items>

            </v-stepper>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PersonalInfoCard from '../components/signUp/PersonalInfoCard';
import RestaurantInfoCard from '../components/signUp/RestaurantInfoCard';
import AdressInfoCard from '../components/signUp/AdressInfoCard';
import Map from '../components/shared/map/Map';

import { mapActions, mapState } from 'vuex';

export default {
  name:'sign-up',
  components: {
    Map,
    PersonalInfoCard,
    RestaurantInfoCard,
    AdressInfoCard
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState('signUp', [
      'isPersonalInfoValid',
      'isRestaurantInfoValid',
      'activeStepNumber',
    ]),
    activeStep: {
      get: function () {
        return this.activeStepNumber
      },
      set: function (stepNumber) {
        this.setActiveStepNumber(stepNumber);
      }
    }
  },
  methods: {
    ...mapActions('authentication', ['postData']),
    ...mapActions('snackbar', ['setState']),
    ...mapActions('signUp', ['setActiveStepNumber']),
  },
}
</script>

<style scoped lang="stylus"></style>
