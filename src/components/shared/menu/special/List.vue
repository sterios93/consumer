<template>
    <div :class="{'overflow-y-scroll overflow-x-hidden': scrollable}">
        <v-container grid-list-md fluid>
            <v-layout>
                <v-slide-x-transition xs12 group mode="out-in" tag="ul" class="pa-0 ma-0 layout row wrap d-flex" color="transparent">
                    <v-flex v-for="item in items" :class="['xs12 md3', 'sm4', {'md4': compact}]" :key="item.id">
                        <SpecialCard v-bind="menuItemProps" :item="item"/>
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
          isEditable: false,
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
