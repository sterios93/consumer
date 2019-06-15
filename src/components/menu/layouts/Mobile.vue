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
				// tabs[0] Main Menu
				if (this.selectedMenu === 'main') {
					this.fetchMenuHandler(); 
					this.fetchCategoriesHandler();
				}
			},
		},
		selectedMenu: {
			handler: function(menu) {
				if (menu === 'special') {
					this.fetchSpecialOffersHandler();
        		}
        		if (menu === 'lunch') {
					this.fetchLunchOffersHandler();
				}
			}
		}
	},
    data() {
      return {
        selectedMenu: 'main',
		localMenuItems: [],
		localCategories: [],
		localSpecialOffers: [],
		localLunchOffers: [],
		category: null,
      }
    },

    computed: {
      ...mapState({
		  currentRestId: (state) => state.restaurants.currentRestaurant.info.id,
	  }),
      isMainMenu() { return this.selectedMenu === 'main' },
      menuComponent() { return `${this.selectedMenu}-menu` },
      menuListProps() {
        if (this.selectedMenu === 'info') {
            return {
                isDesktop: false,
                information: this.$store.state.restaurants.currentRestaurant.info,
            };
        }

        if (this.selectedMenu === 'main') {
		  	return { 
				items: this.localMenuItems,
				scrollable: true
				}	  
		}
		
		if (this.selectedMenu === 'special') {
		  return {
				items: this.localSpecialOffers,
				scrollable: true
            }
		}
		
		if (this.selectedMenu === 'lunch') {
		  return {
				items: this.localLunchOffers,
				scrollable: true
            }
        }
      },
      categoryProps() {
        return {
          items: this.localCategories,
          color: this.color
        }
      }
    },
    methods: {
		...mapActions('snackbar', ['setState']),
		...mapActions({
			'fetchMenu' : 'restaurants/fetchCurrRestMenu',
			'fetchCategories': 'restaurants/fetchCurrRestCategories',
			'fetchSpecialOffers': 'restaurants/fetchRestSpecialOffers',
			'fetchLunchffers': 'restaurants/fetchRestLunchOffers',
		}),
      ...mapGetters('restaurants', ['getMenuByCategory']),
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
		fetchCategoriesHandler() {
			this.fetchCategories()
				.then(data => {
					if (!data.success) return this.errorHandler(data) 
					else {
						this.localCategories = data.result;
						this.category = this.localCategories[0];
						this.localMenuItems = this.getMenuByCategory()(this.category);
					}
				})
		},
		fetchSpecialOffersHandler() {
			this.fetchSpecialOffers()
				.then(data => {
					if (!data.success) return this.errorHandler(data) 
					else {
						this.localSpecialOffers = data.result
					}
				})
		},
		fetchLunchOffersHandler() {
			this.fetchLunchffers()
			.then(data => {
					if (!data.success) return this.errorHandler(data) 
					else {
						this.localLunchOffers = data.result
					}
				})
		},
		errorHandler(data) { 
			this.setState({snackbar: true, message: data.error.message, color: 'red'})
			},
      	onTabChange(id) { 
			this.category = id;
			this.localMenuItems = this.getMenuByCategory()(this.category);
		},
    }
  }
</script>

<style scoped lang="stylus"></style>
