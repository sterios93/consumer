<template>
  <v-bottom-sheet v-model="sheet">
    <template v-slot:activator>
      <v-badge v-model="showBadge" color="error" overlap>
        <template slot="badge">{{ nonSeenItems }}</template>
        <v-btn @click="onClick" dark icon>
          <v-icon color="green">mdi-bell</v-icon>
        </v-btn>
      </v-badge>
    </template>

    <v-list>
      <NotificationsCard @close-sheet="closeSheet" :full-width="true" :items="items"/>
    </v-list>
  </v-bottom-sheet>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import NotificationsCard from "./NotificationsCard";

export default {
  components: {
    NotificationsCard
  },
  data() {
    return {
      sheet: false
    }
  },
  computed: {
    ...mapState("notifications", ["items"]),
    ...mapGetters("notifications", ["nonSeenItems"]),
    showBadge() {
      return this.nonSeenItems !== 0;
    }
  },
  methods: {
    closeSheet() {
      this.sheet = false
    },
    onClick(event) {
      this.$emit(
        "see-notifications",
        this.items.filter(item => {
          if (!item.seen) return item._id;
        })
      );
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