<template>
  <v-container fill-height  fluid grid-list-xl>
    <v-layout justify-center wrap >
      <v-flex  xs10>
        <material-card
                :color="isProfileCardValid ? 'green' : 'red'"
                title="Edit Profile"
                text="Complete your profile">
            <profile-card></profile-card>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProfileCard from '../components/userProfile/ProfileCard'
import PaymentCard from '../components/userProfile/PaymentCard'
import {mapState} from 'vuex'

// TODO :: Change the active state of the payment information

export default {
  name: 'user-profile',
  components: {
    Map,
    ProfileCard,
    PaymentCard,
  },
  computed:{
    ...mapState({
      isProfileCardValid: (state) => state.userProfile.isProfileValid,
    })
  }
}
</script>
