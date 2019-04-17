<template>
    <v-slide-x-transition  v-if="!isCategoriesEmpty" group mode="out-in" tag="div" class="pa-0 d-flex transition-custom">
        <v-flex class="py-0" xs12 v-for="category in getSelectedCategories" :key="category.id">
            <v-subheader>{{ category.name }}</v-subheader>

            <v-flex class="pa-0">
                <v-divider></v-divider>
                <MenuList v-bind="menuListProps(category)"/>
            </v-flex>
        </v-flex>
    </v-slide-x-transition>

    <v-flex v-else  class="pa-1">
        <v-subheader>All products</v-subheader>
        <MenuList class="pa-1 transition-custom" :items="items"/>
    </v-flex>

</template>

<script>
  import MenuList from '../MenuList'

  import {mapState, mapGetters} from 'vuex'

  export default {
    props: {
      color: String,
    },

    components: {
      MenuList,
    },

    computed: {
      ...mapState({
        items: (state) => state.main.list.items
      }),
      ...mapGetters('main', ['getMenuByCategory']),
      ...mapGetters('categories', ['getSelectedCategories']),
      isCategoriesEmpty() {
        return this.getSelectedCategories.length === 0
      }
    },

    methods: {
      menuListProps(category) {
        return {
          items: this.getMenuByCategory(category.id),
          color: this.color
        }
      },
    }
  }
</script>

<style scoped lang="stylus">
    .transition-custom
        width: 100%
        flex-direction: row
        flex-wrap: wrap
        height: 500px
        overflow-y scroll
        overflow-x hidden
</style>