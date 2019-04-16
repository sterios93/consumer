<template>
    <v-slide-x-transition group mode="out-in" tag="ul" class="pa-0 full-width" color="transparent">
        <v-flex v-for="(item, index) in items" xs12 :key="item.id" class="py-2 px-0">
            <MenuItem v-bind="menuItemProps" :item="item" />
        </v-flex>
    </v-slide-x-transition>
</template>

<script>
  import MenuItem from './MenuItem'
  export default {
    components: {
      MenuItem
    },

    props: {
      items: Array
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
</style>
