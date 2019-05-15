<template>
    <div :class="{'overflow-y-scroll overflow-x-hidden': scrollable}">
        <v-container grid-list-md fluid>
            <v-layout>
                <v-slide-x-transition group mode="out-in" tag="ul" class="pa-0 ma-0 flex layout row wrap" color="transparent">
                    <v-flex v-for="item in items" :class="['xs12 md3', 'sm4', {'md4': compact}]" :key="item.id" class="pa-2 px-0">
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
          type: 'lunch',
          // colors: ['#70c06b', '#30b0c0'],
          isSpecial: true,
          isEditable: false
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
        height 700px
        padding-bottom: 56px
</style>
