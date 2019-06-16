<template>
  <v-menu
    bottom
    left
    content-class="dropdown-menu"
    offset-y
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on }">
      <v-badge v-model="showBadge" color="error" overlap>
        <template slot="badge">{{ nonSeenItems }}</template>
        <v-btn @click="onClick" dark icon v-on="on">
          <v-icon color="green">mdi-bell</v-icon>
        </v-btn>
      </v-badge>
    </template>
    <NotificationsCard :items="items"/>
  </v-menu>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import NotificationsCard from "./NotificationsCard";

export default {
  components: {
    NotificationsCard
  },
  computed: {
    ...mapState("notifications", ["items"]),
    ...mapGetters("notifications", ["nonSeenItems"]),
    showBadge() {
      return this.nonSeenItems !== 0;
    },
  },
  methods: {
    onClick(event) {
      this.$emit('see-notifications', this.items.filter((item) => {
          if (!item.seen) return item._id
      }))
    }
  }
};
</script>

<style scoped lang="stylus">
>>> .v-badge__badge 
  pointer-events: none;
  top: 2px !important;
  right: 5px !important;
</style>