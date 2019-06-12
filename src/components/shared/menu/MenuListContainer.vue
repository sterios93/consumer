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
      }
    },

    components: {
      CategoryList,
      LunchList,
      MenuList,
      SpecialList,
      InfoList,
	},
	watch: {
		currentRestId: {
			handler: function(id) {
				 // tabs[0] Main Menu
				if (this.activeTab === 0) {
					this.fetchMenuHandler();
					this.fetchCategoriesHandler();
				}
			},
		},
		menuItems: {
			handler: function(items) {
				// console.error(items);
			}
		}
	},
	methods: {
      	...mapActions('snackbar', ['setState']),
		...mapActions({
			'fetchMenu' : 'restaurants/fetchCurrRestMenu',
			'fetchCategories': 'restaurants/fetchCurrRestCategories',
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
			errorHandler(data) {
	             this.setState({snackbar: true, message: data.error.message, color: 'red'})
			}
	},
    computed: {
		...mapState({
			currentRestId: (state) => state.restaurants.currentRestaurant.id,
		}),
      categoryProps () {
        return {
          items: this.localCategories,
          disabled: this.activeTab !== 0 // TODO :: consider placing calendar for filtering on special and lunch tabs
        }
      },
      LunchListProps () {
        return {
          color: this.color,
          compact: this.compact,
          items: this.$store.state.lunch.list.items
        }
      },
      SpecialListProps () {
        return {
          color: this.color,
          compact: this.compact,
          items: this.$store.state.special.list.items
        }
      },
      InfoListProps () {
        return {
          compact: this.compact,
          color: this.color,
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
