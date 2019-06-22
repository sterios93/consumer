<template>
    <v-flex 
      v-if="selectedCategories[0]"
	  class="pa-0 transition-custom">
	  
        <v-flex class="py-0" xs12 
			v-for="(category, index) in selectedCategories"
			 :key="index">
            	<v-subheader>{{ category }}</v-subheader>
				<v-flex class="pa-0">
					<v-divider></v-divider>
					<MenuList v-bind="menuListProps(category)"/>
				</v-flex>
        </v-flex>
    </v-flex>

    <v-flex v-else-if="items.length === 0">
      <v-subheader>No Products</v-subheader>
    </v-flex>

    <v-flex v-else  class="pa-1">
        <v-subheader>All products</v-subheader>
        <MenuList 
			class="pa-1 transition-custom"
			:items="items"
		/>
    </v-flex>

</template>

<script>
  import MenuList from '../MenuList'

  import {mapState, mapGetters} from 'vuex'

  export default {
	components: {
      MenuList,
    },
    props: ['items'],
    computed: {
		...mapState({
			selectedCategories: (state) => state.restaurants.currentRestaurant.selectedCategories,		
		}),
      ...mapGetters('restaurants', ['getMenuByCategory']),
    },

    methods: {
      menuListProps(category) {
        return {
          items: this.getMenuByCategory(category),
          color: this.color,
          
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
        height auto
        max-height 450px
        overflow-y scroll
        overflow-x hidden
</style>
