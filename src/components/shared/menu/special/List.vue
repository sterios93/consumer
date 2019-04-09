<template>
    <div class="overflow-y-scroll overflow-x-hidden">
        <v-slide-x-transition xs12 group mode="out-in" tag="ul" class="pa-0 ma-0 layout row wrap d-flex" color="transparent">
            <v-flex v-for="item in items" xs12 lg6 :key="item.id">
                <SpecialCard v-bind="menuItemProps" :item="item"/>
            </v-flex>
        </v-slide-x-transition>
    </div>
</template>

<script>
  import SpecialCard from '../SpecialCard'

  export default {
    components: {
      SpecialCard
    },

    props: {
      items: Array
    },

    computed: {
      menuItemProps() {
        return {
          isSpecial: true,
          isEditable: true,
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
        height 75vh
</style>
