<template>
    <div class="menu-wrapper">
        <v-toolbar flat class="toolbar" dark>
            <v-tabs
				v-model="activeTab"
				color="transparent"
				grow
            >
                <v-tabs-slider color="yellow"></v-tabs-slider>

				<v-tab
					v-for="(tab, key) in tabs"
					:key="key"
					@change="changeTab(key)"
				>
					{{ tab }}
				</v-tab>
            </v-tabs>
        </v-toolbar>


        <v-tabs-items v-model="activeTab">

            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs9>
                                <MenuList 
									v-bind:items="localMenuItems"
								/>
                            </v-flex>
                            <v-flex xs3 class="pa-4 mt-5">
                                <CategoryList v-bind="{...categoryProps}"/>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-tab-item>

            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <SpecialList v-bind="SpecialListProps" />
                    </v-card-text>
                </v-card>
            </v-tab-item>

            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <LunchList v-bind="LunchListProps" />
                    </v-card-text>
                </v-card>
            </v-tab-item>

        </v-tabs-items>

    </div>
</template>

<script>
  import LunchList from '../../shared/menu/lunch/List'
  import MenuList from '../../shared/menu/main/List'
  import SpecialList from '../../shared/menu/special/List'
  import InfoList from '../../shared/menu/info/View'
  import CategoryList from '../../shared/category/CategoryList'


  import {mapState, mapActions} from 'vuex'

  export default {
		components: {
			CategoryList,
			LunchList,
			MenuList,
			SpecialList,
			InfoList,
		},
    props: {
      color: String,
      compact: Boolean,
      categories: Array,
    },
    data () {
      return {
		activeTab: null,
		tabs: ['Main Menu', 'Special Offers', 'Lunch Menu',],
		localMenuItems: [],
		localCategories: [],
		localSpecialOffers: [],
		localLunchOffers: [],
      }
    },
	watch: {
		currentRestId: {
			handler: function() {
				this.switchedTabHandler();
			},
		},
	},
	mounted(){
		// The component is initialy mounted, and if we don't have an restaurantId, we should not make any requests.
		// This fixes the bug, when you view an offer, and press back button
		console.error(this.currentRestId)
		if (this.currentRestId) {
			this.switchedTabHandler();
		}
		
	},
	methods: {
      	...mapActions('snackbar', ['setState']),
		...mapActions({
			'fetchMenu' : 'restaurants/fetchCurrRestMenu',
			'fetchCategories': 'restaurants/fetchCurrRestCategories',
			'fetchSpecialOffers': 'restaurants/fetchRestSpecialOffers',
			'fetchLunchOffers': 'restaurants/fetchRestLunchOffers',
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
							this.localCategories = data.result
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
				this.fetchLunchOffers()
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
			changeTab(tab) {
				this.activeTab = tab;
				this.switchedTabHandler()
			},
			switchedTabHandler(){
				 // Main Menu
				if (this.activeTab === 0) {
					this.fetchMenuHandler();
					this.fetchCategoriesHandler();
				}
				// Special offers
				if (this.activeTab === 1) {
					this.fetchSpecialOffersHandler();
				}
				// Lunch offers
				if (this.activeTab === 2) {
					this.fetchLunchOffersHandler();
				}
			}
	},
    computed: {
		...mapState({
			currentRestId: (state) => state.restaurants.currentRestaurant.info._id,
		}),
      categoryProps () {
        return {
          items: this.localCategories,
          disabled: this.activeTab !== 0 // TODO :: consider placing calendar for filtering on special and lunch tabs
        }
      },
      LunchListProps () {
        return {
          compact: this.compact,
          items: this.localLunchOffers,
        }
      },
      SpecialListProps () {
        return {
          compact: this.compact,
          items: this.localSpecialOffers
        }
      },
      InfoListProps () {
        return {
          compact: this.compact,
          information: this.$store.state.info.list.information
        }
      }
    },
  }
</script>

<style scoped lang="stylus">
    .menu-wrapper
        padding-bottom: 56px
        .toolbar
            background-image: linear-gradient(#4caf50, rgba(76, 175, 80, 0.82))
</style>
