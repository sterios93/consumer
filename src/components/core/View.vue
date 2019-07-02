<template>
  <v-content>
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
    <CustomSnackBar/>
    <ConfirmModal />
  </v-content>
</template>

<script>
  import ConfirmModal from "../custom/dialogs/ConfirmModal";
  import CustomSnackBar from '../material/CustomSnackBar'
  import {mapActions, mapState} from 'vuex'

  export default {
    components: {
      ConfirmModal,
      CustomSnackBar,
    },
    metaInfo() {
      return {
        title: 'Lunch Deal 24'
      }
    },
    computed: {
      ...mapState('authentication', ['isUserLogged']),
      ...mapState('layout', ['responsive']),
      ...mapState('modals', {
        mainVisibility: (state) => state.menu.main.visibility,
        lunchVisibility: (state) => state.menu.lunch.visibility,
        specialVisibility: (state) => state.menu.special.visibility,
      }),
    },
    watch: {
      isUserLogged: {
        handler: function (value) {
          if (value === true) {
            this.fetchUserData()
            // Polling data every 60 000 ms
            this.pollNotifications()
          }
        },
        immediate: true
       }
    },
    mounted() {
      this.onResponsiveInverted()
      window.addEventListener('resize', this.onResponsiveInverted)
    },
    beforeDestroy() {
      this.destroyed = true
      window.removeEventListener('resize', this.onResponsiveInverted)
    },
    methods: {
      ...mapActions('layout', ['setResponsive']),
      ...mapActions('authentication', ['fetchUserData']),
      ...mapActions('notifications', ['fetchNotifications']),
      pollNotifications() {
        this.isUserLogged && this.fetchNotifications()
        this.isUserLogged && !this.destroyed && setTimeout(this.pollNotifications, 60000);
      },
      onResponsiveInverted() {
        if (window.innerWidth < 991) {
          this.setResponsive(true)
        } else {
          this.setResponsive(false)
        }
      }
    }
  }
</script>

<style lang="stylus">
  #core-view
    padding-bottom: 100px;
    display: flex;
    justify-content: center;
    height: 100%;
    .container
      padding-right 0
      padding-left 0
</style>
