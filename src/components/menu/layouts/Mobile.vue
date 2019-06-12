<template>
    <v-layout row wrap>
        <v-flex>
            <v-layout wrap justify-center>
                <v-flex xs12 v-if="isMainMenu">
                    <CategoryTabs v-bind="categoryProps" @on-tab-change="onTabChange"/>
                </v-flex>
                <v-flex xs12 class="menu-list-mobile">
                    <component :is="menuComponent" v-bind="menuListProps"/>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-bottom-nav
                :active.sync="selectedMenu"
                :value="true"
                fixed
                color="white"
        >
            <v-btn color="teal" flat value="info" >
                <span>Info</span>
                <v-icon>info</v-icon>
            </v-btn>

            <v-btn color="teal" flat value="main" >
                <span>Main Menu</span>
                <v-icon>restaurant</v-icon>
            </v-btn>

            <v-btn color="teal" flat value="special" >
                <span>Special Offers</span>
                <v-icon>fastfood</v-icon>
            </v-btn>

            <v-btn color="teal" flat value="lunch" >
                <span>Lunch Menu</span>
                <v-icon>restaurant_menu</v-icon>
            </v-btn>
        </v-bottom-nav>
    </v-layout>
</template>

<script>
  import CategoryTabs from "../../shared/category/CategoryTabs";
  import LunchList from '../../shared/menu/lunch/List'
  import MenuList from "../../shared/menu/MenuList";
  import SpecialList from '../../shared/menu/special/List'
  import InfoPage from '../../shared/menu/info/View'
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {
    props: {
      color: String,
      categories: Array
    },
    components: {
        CategoryTabs,
        'main-menu': MenuList,
        'lunch-menu': LunchList,
        'special-menu': SpecialList,
        'info-menu': InfoPage,
	},
	watch: {
		currentRestId: {
			handler: function(id) {
				if (this.selectedMenu === 'main') this.fetchMenuHandler(); // tabs[0] Main Menu
			},
		},
	},
    data() {
      return {
        selectedMenu: 'main',
		category: this.categories[0],
		localMenuItems: [],
      }
    },
    created() {
      this.category = this.categories[0].id
    },

    computed: {
      ...mapState({
		  currentRestId: (state) => state.restaurants.currentRestaurant.id,
	  }),
      isMainMenu() { return this.selectedMenu === 'main' },
      menuComponent() { return `${this.selectedMenu}-menu` },
      menuListProps() {
		  console.error(this.selectedMenu);
        if (this.selectedMenu === 'info') {
            return {
                isDesktop: false,
                information: this.$store.state.restaurants.currentRestaurant.info,
            };
        }

        if (this.selectedMenu === 'main') {
			console.error('return main menu items {}')
		  	return { items: this.localMenuItems, scrollable: true}			  
		}
		
		if (this.selectedMenu === 'special') {
		  console.error('return special items {}')
		  return {
              color: this.color,
              items: this.isMainMenu ? this.$store.state.restaurants.currentRestaurant.menuItems : this.$store.state[this.selectedMenu].list.items
            }
		//   return {}
		  
		}
		
		if (this.selectedMenu === 'lunch') {
		  console.error('return lunch items {}')
		  return {}
        }
            // return {
            //   color: this.color,
            //   items: this.isMainMenu ? this.$store.state.restaurants.currentRestaurant.menuItems : this.$store.state[this.selectedMenu].list.items
            // }
      },
      categoryProps() {
        return {
          items: this.categories,
          color: this.color
        }
      }
    },
    methods: {
		...mapActions('snackbar', ['setState']),
		...mapActions({
			'fetchMenu' : 'restaurants/fetchCurrRestMenu',
		}),
      ...mapGetters('main', ['getMenuByCategory']),
      ...mapActions({
        'setModalVisibility': 'modals/setModalVisibility',
        'setMenuModalVisibility': 'modals/setMenuModalVisibility',
        'setBottomSheetVisibility': 'bottomSheet/setVisibility',
	  }),
		fetchMenuHandler() {
			this.fetchMenu()
				.then(data => { 
					if (!data.success) return this.errorHandler(data) 
					else {
						this.localMenuItems = data.result
					}
				})
		},
		errorHandler(data) {
				this.setState({snackbar: true, message: data.error.message, color: 'red'})
		},
      onTabChange(id) {
        this.category = id
      },
    }
  }
</script>

<style scoped lang="stylus"></style>
