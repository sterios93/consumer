<template>
    <div :class="{'overflow-y-scroll overflow-x-hidden': scrollable}">
        <v-container grid-list-md fluid>
            <v-layout v-if="items.length > 0">
                <v-slide-x-transition xs12 group mode="out-in" tag="ul" class="pa-0 ma-0 layout row wrap d-flex" color="transparent">
                    <v-flex v-for="(item, key) in items" :class="['xs12 md3', 'sm4', {'md4': compact}]" :key="key">
                        <SpecialCard v-bind="menuItemProps" :item="item"/>
                    </v-flex>
                </v-slide-x-transition>
            </v-layout>
            <v-layout v-else>
              <v-slide-x-transition group mode="out-in" tag="ul" class="pa-0 ma-0 flex layout row wrap" color="transparent">
                  <v-flex key="empty">
                    <v-subheader>No Products</v-subheader>
                  </v-flex>
              </v-slide-x-transition>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
  import SpecialCard from '../SpecialCard'

  export default {
    components: {
      SpecialCard
    },
    props: {
      items: Array,
      scrollable: {
          type: Boolean,
          default: true
      },
      compact: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      menuItemProps() {
        return {
          isSpecial: true,
          type: 'special'
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
    .overflow-y-scroll
        overflow-y scroll
        height: 700px
</style>
