<template>
    <v-container fluid fill-height>
        <v-layout row wrap justify-center>
            <v-flex sm12 lg8>
                <v-card>
                    <v-card-title>
                        <div class="headline">{{subscriptions.length}} Subscriptions</div>
                        <v-spacer></v-spacer>
                        <v-text-field
                                v-model="text"
                                hide-details
                                height="50px"
                                label="Search for subscription"
                                type="text"
                        >

                            <v-btn
                                    slot="append-outer"
                                    @click="() => {}"
                                    icon
                                    color="grey lighten-4">
                                <v-icon
                                        color="grey darken-1"
                                        class="ma-0 pa-0"
                                        dark
                                >search
                                </v-icon>
                            </v-btn>

                        </v-text-field>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-layout row wrap justify-center align-center>

                        <v-list subheader>
                            <v-subheader>Recent subscriptions</v-subheader>
                            <v-list-tile
                                    v-for="item in subscriptions"
                                    :key="item.id"
                                    avatar
                                    @click=""
                            >
                                <v-list-tile-avatar>
                                    <img :src="item.restaurant.image">
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    <v-list-tile-title v-html="item.restaurant.name"></v-list-tile-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <div>
                                        <v-btn
                                                icon
                                                class="mx-2"
                                                @click="toggleFollow(item)"
                                        >
                                            <v-icon :color="item.following ? 'teal' : 'grey'">hearing</v-icon> <!--mdi-bell-->
                                        </v-btn>
                                        <v-btn
                                                class="px-2"
                                                @click="toggleActive(item)"
                                        >
                                            <v-icon class="mr-2" :color="item.isActive ? 'teal' : 'grey'">check</v-icon>
                                            subscribed
                                        </v-btn>
                                    </div>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        text: '',
      }
    },
    computed: {
      ...mapState({
        color: state => state.app.color,
        subscriptions: state => state.subscriptions.items
      })
    },
    methods: {
      ...mapActions({
        updateItem: 'subscriptions/updateItem',
        setModalData: 'modals/setModalData',
      }),
      toggleActive(item) {
        this.setModalData({
          key: 'confirm',
          value: {
            visibility: true,
            action: `cancel your subscription to ${item.restaurant.name}`,
            callback: () => {
              item.isActive = !item.isActive
              this.updateItem(item)
            }
          }
        })
      },
      toggleFollow(item) {
        let action = item.following ?
          `stop following ${item.restaurant.name} notifications` :
          `start following ${item.restaurant.name} notifications`

        this.setModalData({
          key: 'confirm',
          value: {
            visibility: true,
            action,
            callback: () => {
              item.following = !item.following
              this.updateItem(item)
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
    .container
        padding 16px !important
    >>> .v-input
        .v-input__slot
            min-height unset !important

        .v-input__append-outer
            margin 0 !important
            padding: 0 !important
            justify-content: center !important
            align-items: center !important

            .v-btn
                bottom: 0 !important
    >>> .v-list
        width 95%
</style>