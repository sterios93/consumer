<template>
    <v-card>
        <v-toolbar class="toolbar" dark>
            <v-toolbar-title class="title font-weight-light mb-2 white--text">Categories</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
        </v-toolbar>

        <v-list two-line class="px-3">
            <template v-for="item in items">
                <v-divider></v-divider>
                <CategoryItem :item="item" :key=item.id @item-selected="onItemSelected"/>
            </template>
        </v-list>
    </v-card>
</template>

<script>
  import {mapActions} from 'vuex'
  import CategoryItem from './CategoryItem'

  export default {
    components: {
      CategoryItem
    },

    props: {
      color: String,
      items: Array,
      searchVisibility: Boolean
    },

    methods: {
      ...mapActions('categories', ['toggleCategory']),
      onItemSelected(id) {
        this.toggleCategory({id})
      }
    }
  }
</script>

<style scoped lang="stylus">
    .toolbar
        background-image: linear-gradient(#4caf50, rgba(76, 175, 80, 0.82))
</style>