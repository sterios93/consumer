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
                    <personal-info-card @sign-up-clicked="onSignUpClicked"/>
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
import Map from '../components/shared/map/Map';

import { mapActions, mapState } from 'vuex';

export default {
  name:'sign-up',
  components: {
    Map,
    PersonalInfoCard,
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
        // this.setActiveStepNumber(stepNumber);
      }
    }
  },
  methods: {
    ...mapActions('authentication', ['postData']),
    ...mapActions('snackbar', ['setState']),
    ...mapActions('signUp', ['doSignUpRequest']),
    onSignUpClicked() {
      this.doSignUpRequest()
        .then(data => {
          if (data && data.success) {
            this.$router.push({ path: 'home' })

            this.setState({snackbar: true, message: 'Loggin Succescfull.', color: 'green'});
          } else {
            this.setState({snackbar: true, message: data.error && data.error.message, color: 'red'});
          }
        })
    }
  },
}
</script>

<style scoped lang="stylus"></style>
