<template>
    <v-layout row wrap>
        <v-flex xs3>
            <InfoList v-bind="InfoListProps" />
        </v-flex>
        <v-flex xs9>
            <MenuListContainer v-bind="sharedProps"/>
        </v-flex>
    </v-layout>
</template>

<script>
  import MenuListContainer from '../../shared/menu/MenuListContainer'
  import InfoList from '../../shared/menu/info/View'
  import {mapActions} from 'vuex'

  export default {
    props: {
      tabs: Object,
      color: String,
      activeTab: String,
      categories: Array,
      compact: Boolean,
      selectedCategories: Array
    },
    components: {
      MenuListContainer,
      InfoList,
    },
    computed: {
      InfoListProps () {
          return {
				isDesktop: true,
				information: this.$store.state.restaurants.currentRestaurant.info,
          }
      },
      categoryProps () {
        return {
          	items: this.categories,
        }
      },
      sharedProps () {
        return {
			color: this.color,
			activeTab: this.activeTab,
			compact: this.compact,
			categories: this.categories
        }
      }
    },
    methods: {
      ...mapActions({
        'setModalVisibility': 'modals/setModalVisibility',
        'setMenuModalVisibility': 'modals/setMenuModalVisibility',
        'setBottomSheetVisibility': 'bottomSheet/setVisibility'
      }),
      onControlsClicked() {
        	this.setBottomSheetVisibility(true)
      }
    }
  }
</script>

<style scoped lang="stylus">
    .restaurant-info-toolbar
        background-image: linear-gradient(#4caf50, rgba(76, 175, 80, 0.82))
</style>
