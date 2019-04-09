<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img
      :src="image"
      height="100%"
    >
      <v-layout
        class="fill-height"
        tag="v-list"
        column
      >
        <v-list-tile avatar>
          <v-img
            :src="logo"
          />
        </v-list-tile>
        <v-divider/>
        <v-list-tile
          v-if="responsive"
        >
          <v-text-field
            class="purple-input search-input"
            label="Search..."
            color="purple"
          ></v-text-field>
        </v-list-tile>
        <v-list-tile
          v-for="(link, i) in links"
          v-if="link.userAccess === isUserLogged"
          :key="i"
          :to="link.to"
          :active-class="color"
          avatar
          class="v-list-item"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            v-text="link.text"
          />
        </v-list-tile>
        <v-list-tile
          disabled
          active-class="primary"
          class="v-list-item v-list__tile--buy"
          to="/upgrade"
        >
        </v-list-tile>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapActions,  mapState } from 'vuex'

export default {
  data: () => ({
    logo: './img/logo.png',
    links: [
      {
        to: '/signup',
        icon: 'mdi-account-plus',
        text: 'Sign Up',
        userAccess: false
      },
      {
        to: '/login',
        icon: 'mdi-login-variant',
        text: 'Log in',
        userAccess: false
      },
      {
        to: '/home',
        icon: 'mdi-view-dashboard',
        text: 'Home',
        userAccess: true
      },
      {
        to: '/menu',
        icon: 'restaurant_menu',
        text: 'Menu',
        userAccess: true
      },
      {
        to: '/user-profile',
        icon: 'mdi-account',
        text: 'User Profile',
        userAccess: true
      },
    ],
  }),
  computed: {
    ...mapState('authentication', ['isUserLogged']),
    ...mapState('layout', ['responsive']),
    ...mapState('app', ['image', 'color']),
    inputValue: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    },
    items () {
      return this.$t('Layout.View.items')
    }
  },
  methods: {
    ...mapActions('app', ['setDrawer', 'toggleDrawer']),
  }
}
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }

    .v-list {
      background: rgba(27, 27, 27, 0.74) !important;
    }

    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }

    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>

<style lang="stylus">
  .v-list-item
    .v-list__tile.v-list__tile--avatar
      padding: 15px 5px !important
  .v-list__tile.v-list__tile--avatar
     padding: 5px 15px !important
</style>
