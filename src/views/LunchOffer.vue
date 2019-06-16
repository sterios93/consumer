<template>
    <v-container fill-height grid-list-xl>
        <v-layout justify-center wrap>
            <v-flex xs12 md4>
                <material-card color="purple" title="Restaurant Info" >
                    <InfoList v-bind="InfoListProps"/>
                </material-card>
            </v-flex>

            <v-flex xs12 md8>
                <material-card color="purple" title="Lunch offer" >
                    <v-layout wrap>
                        <v-flex class="v-card-profile" d-flex>
                            <v-layout wrap>
                                <v-flex xs12 lg6>
                                    <v-avatar slot="offset" class="mx-auto d-block" size="260" >
                                        <v-img :src="imagePath"></v-img>
                                    </v-avatar>
                                </v-flex>

                                <v-flex xs12 lg6>
                                    <v-card-text class="text-xs-center">
                                        <h3 class="category font-weight-bold mb-3">From{{localLunchOffer.timeStart}}</h3>
                    					<h3 class="category font-weight-bold mb-3">To {{localLunchOffer.timeEnd}}</h3>
                                        <v-btn color="success" round class="font-weight-light" >Follow </v-btn>
                                        <v-btn dark color="red" round class="font-weight-light">MENU </v-btn>
                                        <v-btn dark color="blue" round class="font-weight-light">LUNCH OFFERS </v-btn>
                                    </v-card-text>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-flex xs12 mt-5>
                        <v-flex
                                v-for="(item, key) in localLunchOffer.menuItems"
                                :key="key"
                                xs12
                                class="py-2 px-0">
                            <v-divider/>
                            <MenuItem :item="item"/>
                        </v-flex>
                    </v-flex>

                </material-card>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
  import MenuItem from '../components/shared/menu/MenuItem'
  import InfoList from '../components/shared/menu/info/View'

  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'SpecialOffer',
    props: {
      id: String || Number
    },
    components: {
      MenuItem,
      InfoList
    },
    data () {
      return {
		defaultImage: 'https://cdn.vuetifyjs.com/images/lists/ali.png',
		localLunchOffer: {},
		localRestInfo: {
		  info: {
				name: '',
				phone: '',
				type: '',
				website: '',
				}
	  	},
      }
    },
    computed: {
      imagePath () {
        return this.image || this.defaultImage
      },
      InfoListProps () {
        return {
          isDesktop: true,
          information: this.$store.state.restaurants.currentRestaurant.info,
        }
      },
    },
    created () {
      this.fetchLunchOfferHandler(this.id);
    },
    methods: {
     ...mapActions('snackbar', ['setState']),
	...mapActions({
		'fetchLunchOffer': 'restaurants/fetchLunchOffer',
		'fetchRestInfo': 'restaurants/fetchRestaurantInfo',
		'setCurrentRestaurantInfo': 'restaurants/setCurrentRestaurantInfo'
		}),
	fetchLunchOfferHandler(offerId) {
		this.fetchLunchOffer(offerId)
			.then(data => {
					if (!data.success) return this.errorHandler(data) 
					else {
						this.localLunchOffer = data.result;
						this.fetchRestInfo(this.localLunchOffer.restaurantId)
							.then(data => {
								if (!data.success) return this.errorHandler(data);
								else {
                  //TODO: pass the lat and lng, in order to display the adress
                  
                  this.setCurrentRestaurantInfo(data.result)
								}
							})
					}
			})
	},
	errorHandler(data) {
		this.setState({snackbar: true, message: data.error.message, color: 'red'})
	},
  }
    }
</script>

<style scoped lang="stylus"></style>
