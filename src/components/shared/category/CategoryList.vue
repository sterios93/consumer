<template>
    <v-card>
        <v-list two-line class="px-3">
            <template v-for="(item, index) in items">
                <CategoryItem 
					:item="item" 
					:key=index 
					@item-selected="onItemSelected"
				/>
                <v-divider :key="(index + 1 )* 2"></v-divider>
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
      ...mapActions('restaurants', ['toggleCategory']),
      onItemSelected(id) {
        this.toggleCategory(id)
      }
    }
  }
</script>

<style scoped lang="stylus">
    .toolbar
        background-image: linear-gradient(#4caf50, rgba(76, 175, 80, 0.82))
</style>
