<template>
    <div class="overflow-y-scroll overflow-x-hidden">
        <v-slide-x-transition group mode="out-in" tag="ul" class="pa-0 ma-0 flex layout row wrap" color="transparent">
            <v-flex v-for="item in items" xs12 lg6 :key="item.id" class="pa-2 px-0">
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
          type: 'lunch',
          // colors: ['#70c06b', '#30b0c0'],
          isSpecial: true,
          isEditable: true
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