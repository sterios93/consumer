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
            v-ripple
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
        <NotificationsDropDown />
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

        <v-icon @click="logOutAccount" v-if="isUserLogged" color="orange">mdi-exit-to-app</v-icon>

      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

import {mapActions, mapState} from 'vuex'
import NotificationsDropDown from '../shared/notifications/NotificationsDropDown'

export default {
  components: {
    NotificationsDropDown,
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
  },

  methods: {
    ...mapActions('authentication', ['logout']),
    ...mapActions('app', ['setDrawer', 'toggleDrawer']),
    onClickBtn () {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onClick () {
      //
    },
    logOutAccount() {
      this.logout().then(() => this.$router.push('login'))
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
  .responsive
    >>> .v-toolbar__content
      margin-left 260px !important

</style>
