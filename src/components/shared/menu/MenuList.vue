<template>
    <div :class="{'overflow-x-hidden overflow-y-scroll': scrollable}">
        <v-container grid-list-md fluid>
            <v-layout v-if="items.length > 0">
                  <v-slide-x-transition 
                    group mode="out-in" tag="ul" class="pa-0 full-width" color="transparent">
                    <v-flex v-for="(item, index) in items" xs12 :key="index" class="py-2 px-0">
                      <MenuItem v-bind="menuItemProps" :item="item" />
                    </v-flex>
                </v-slide-x-transition>
            </v-layout>
            <v-layout v-else align-center justify-center>
                  <v-slide-x-transition mode="out-in" tag="ul" class="pa-0 full-width" color="transparent">
                    <v-flex xs12 class="py-2 px-0">
                      <v-subheader>No Products</v-subheader>
                    </v-flex>
                </v-slide-x-transition>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
  import MenuItem from './MenuItem'
  export default {
    components: {
      MenuItem
    },

    props: {
      items: Array,
      scrollable: {
          type: Boolean,
          default: true
      }
    },

    computed: {
      menuItemProps() {
        return {
          isEditable: false,
          isSpecial: false,
          type: 'main'
        }
      }
    },

    data() {
      return {}
    },

    methods: {
      onItemClick() {
      }
    }
  }
</script>

<style scoped lang="stylus">
    .full-width
        width: 100%
    .overflow-y-scroll
        overflow-y scroll
        height auto
</style>
