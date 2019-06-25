<template>
  <v-container fluid fill-height>
    <v-layout row wrap justify-center>
      <v-flex sm12 lg8>
        <v-card>
          <v-card-title>
            <div class="headline">{{items.length}} Subscriptions</div>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="text"
              hide-details
              height="50px"
              label="Search for subscription"
              type="text"
            >
              <v-btn slot="append-outer" @click="() => {}" icon color="grey lighten-4">
                <v-icon color="grey darken-1" class="ma-0 pa-0" dark>search</v-icon>
              </v-btn>
            </v-text-field>
          </v-card-title>
          <v-divider></v-divider>
          <v-layout row wrap justify-center align-center>
            <v-list subheader>
              <v-subheader>Recent subscriptions</v-subheader>
              <v-list-tile v-for="item in items" :key="item._id" avatar>
                <v-list-tile-avatar>
                  <img :src="image">
                </v-list-tile-avatar>

                <v-list-tile-content class="pa-2 suscription-list-item-content">
                  <v-list-tile-title class="text-truncate" v-html="item.name"></v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <div>
                    <v-btn class="px-2" @click="toggleActive(item)">
                      <v-icon class="mr-2" :color="item.active ? 'teal' : 'grey'">check</v-icon>
                        {{item.active ? 'Unsubsribe' : 'Subsribe'}}
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
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      text: "",
      image: '',
    };
  },
  computed: {
    ...mapState({
      color: state => state.app.color,
      items: state => state.subscriptions.items
    })
  },
  async created() {
    const data = await this.fetchSubscriptions()

    if (!data.success) {
      this.setSnackbar({snackbar: true, message: data.error.message, color: 'red'})
    }
  },
  methods: {
    ...mapActions({
      updateItem: "subscriptions/updateItem",
      fetchSubscriptions: "subscriptions/fetchSubscriptions",
      activateSubscription: "subscriptions/activateSubscription",
      cancelSubscription: "subscriptions/cancelSubscription",
      setModalData: "modals/setModalData",
      setSnackbar: "snackbar/setSnackbar"
    }),

    toggleActive(item) {
      this.setModalData({
        key: "confirm",
        value: {
          visibility: true,
          action: `${item.active ? 'cancel' : 'active'} your subscription to ${item.name}`,
          callback: async () => {
            const payload = {
              subscriptionId: item._id
            }
            const data = item.active ? await this.cancelSubscription(payload) : await this.activateSubscription(payload)
            if (!data.success) this.setSnackbar({snackbar: true, message: data.error.message, color: 'red'})
          }
        }
      });
    }
  }
};
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
        .suscription-list-item-content
          width: 50px
</style>