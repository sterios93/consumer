<template>
  <v-toolbar
    id="core-toolbar"
    v-if="toolbar"
    flat
    prominent
    :class="{'responsive': !responsive}"
    style="background: #eee;"
  >
    <div class="v-toolbar-title">
      <v-toolbar-title class="tertiary--text font-weight-light">
        <router-link
            slot="activator"
            class="toolbar-items"
            to="/home">
          <img  src="../../../public/img/logo.png" alt="logo" class="logo-image">
        </router-link>
      </v-toolbar-title>
    </div>

    <v-spacer />


    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
        v-if="isUserLogged"
      >
        <component :is="component"></component>
        <v-menu
                bottom
                left
                full-width
                min-width="200px"
                class="toolbar-items"
                content-class="dropdown-menu"
                offset-y
                transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="green">mdi-account</v-icon>
          </template>
          <v-card>
            <v-list dense>
              <router-link
                      :to="item.to"
                      v-for="(item, index) in links" :key="index">
                <v-list-tile
                        v-ripple
                        class="toolbar-items"
                >
                  <v-list-tile-title v-text="item.text"/>
                </v-list-tile>
              </router-link>
            </v-list>
          </v-card>
        </v-menu>

        <v-icon @click="logOutAccount" color="orange">mdi-exit-to-app</v-icon>

      </v-flex>
      <v-flex
              v-else
              align-center
              layout
              >
        <router-link to="/signup">
          <v-btn flat color="amber darken-1">Sign up</v-btn>
        </router-link>
        <router-link to="/login">
          <v-btn flat color="green lighten-1">Log in</v-btn>
        </router-link>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

import {mapActions, mapState} from 'vuex'
import NotificationsDropDown from '../shared/notifications/NotificationsDropDown'
import NotificationsBottomSheet from '../shared/notifications/NotificationsBottomSheet'

export default {
  components: {
    NotificationsDropDown,
    NotificationsBottomSheet,
  },

  data: () => ({
    notifications: [
      'Mike, John responded to your email',
      'You have 5 new tasks',
      'You\'re now a friend with Andrew',
      'Another Notification',
      'Another One'
    ],
    title: null,
    links: [
      {
        to: '/user-profile',
        icon: 'mdi-account',
        text: 'User Profile',
        userAccess: true
      },
      {
        to: '/subscriptions',
        icon: 'mdi-account',
        text: 'Subscriptions',
        userAccess: true
      },
    ],
  }),

  watch: {
    '$route' (val) {
      this.title = val.name
    }
  },

  computed: {
    ...mapState('authentication', ['isUserLogged']),
    ...mapState('layout', ['responsive']),
    ...mapState('app', ['toolbar']),
    component() {
      return this.responsive ? 'NotificationsBottomSheet' : 'NotificationsDropDown'
    }
  },

  methods: {
    ...mapActions('authentication', ['logout']),
    ...mapActions('snackbar', {setSnackbar: 'setState'}),
    ...mapActions('app', ['setDrawer', 'toggleDrawer']),
    onClickBtn () {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onClick () {
      //
    },
    logOutAccount() {
      this.logout()
      .then((data) => {
        if (data.success) {
          this.$router.push('login');
          this.setSnackbar({snackbar: true, message: 'Logout successfully', color: 'success'})
        } else {
          this.setSnackbar({snackbar: true, message: data.error.message, color: 'red'})
        }
      
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  .logo-image
    height 64px
  #core-toolbar
    margin-bottom 0
  #core-toolbar a
    text-decoration: none
  >>> .v-btn
        height 36px !important
  .responsive
    >>> .v-toolbar__content
      margin-left 260px !important
</style>
