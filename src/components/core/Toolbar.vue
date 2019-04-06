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
      <v-toolbar-title
        class="tertiary--text font-weight-light"
      >
        <v-btn
          v-if="responsive"
          class="default v-btn--simple"
          dark
          icon
          @click.stop="onClickBtn"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
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
        <v-text-field
          v-if="!responsive"
          class="mr-4 mt-2 purple-input"
          label="Search..."
          hide-details
          color="purple"
        ></v-text-field>
        <router-link
          v-ripple
          class="toolbar-items"
          to="/"
        >
          <v-icon color="tertiary">mdi-view-dashboard</v-icon>
        </router-link>
        <v-menu
          bottom
          left
          content-class="dropdown-menu"
          offset-y
          transition="slide-y-transition">
          <router-link
            v-ripple
            slot="activator"
            class="toolbar-items"
            to="/notifications"
          >
            <v-badge
              color="error"
              overlap
            >
              <template slot="badge">
                {{ notifications.length }}
              </template>
              <v-icon color="tertiary">mdi-bell</v-icon>
            </v-badge>
          </router-link>
          <v-card>
            <v-list dense>
              <v-list-tile
                v-for="notification in notifications"
                :key="notification"
                @click="onClick"
              >
                <v-list-tile-title
                  v-text="notification"
                />
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
        <router-link
          v-ripple
          class="toolbar-items"
          to="/user-profile"
        >
          <v-icon color="tertiary">mdi-account</v-icon>
        </router-link>
        <v-icon @click="logOutAccount" v-if="isUserLogged" color="tertiary">mdi-exit-to-app</v-icon>

      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

import {
  mapActions,
  mapState
} from 'vuex'

export default {
  data: () => ({
    notifications: [
      'Mike, John responded to your email',
      'You have 5 new tasks',
      'You\'re now a friend with Andrew',
      'Another Notification',
      'Another One'
    ],
    title: null,
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
  #core-toolbar
    margin-bottom 0
  #core-toolbar a
    text-decoration: none
  .responsive
    >>> .v-toolbar__content
      margin-left 260px !important

</style>
