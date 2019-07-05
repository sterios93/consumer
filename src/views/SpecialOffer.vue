<template>
  <v-container fill-height grid-list-xl>
    <v-layout justify-center wrap>

      <v-flex xs12 md4>
        <material-card color="green" title="Restaurant Info" >
          <InfoList v-bind="InfoListProps" />
        </material-card>
      </v-flex>

      <v-flex xs12 md8>
        <material-card color="green" title="Special offer" >
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
                    <h3 class="category font-weight-bold mb-3">From: {{localSpecialOffer.timeStart}}</h3>
                    <h3 class="category font-weight-bold mb-3">To: {{localSpecialOffer.timeEnd}}</h3>
                    <h3 class="card-title font-weight-light">{{localSpecialOffer.name}}</h3>
                    <p class="card-description font-weight-light">{{localSpecialOffer.description}}</p>
                    <p class="card-description font-weight-light">Also see our other offers bellow :)</p>
                  </v-card-text>
                </v-flex>

              </v-layout>
            </v-flex>

          </v-layout>
          <v-flex xs12 mt-5>
            <v-flex
                    v-for="(item, key) in localSpecialOffer.menuItems"
                    :key="key"
                    xs12
                    class="py-2 px-0">
              <v-divider/>
              <MenuItem 
			  	:item="item"
				/>
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

import {changeDateFormat} from '../utils/helpers'

import {mapActions, mapState} from 'vuex'
export default {
  name: 'SpecialOffer',
  props: {
    id: String || Number
  },
  data() {
    return {
	  defaultImage: 'https://cdn.vuetifyjs.com/images/lists/ali.png',
	  localSpecialOffer: {},
	  localRestInfo: {
      name: '',
      phone: '',
      type: '',
      userSubscription: [],
      website: '',
	    },
    }
  },
  components: {
    MenuItem,
    InfoList
  },
  computed: {
    imagePath() {
      return this.localSpecialOffer.img || this.defaultImage
    },
    InfoListProps () {
      return {
        isDesktop: true,
        information: this.localRestInfo,
      }
    },
  },
  created() {
    this.fetchOfferHandler(this.id);
  },
  watch: {
    '$route.params.id'(value) {
      this.fetchOfferHandler(value);
    }
  },
  methods: {
	...mapActions('snackbar', ['setState']),
	...mapActions({
		'fetchOffer': 'restaurants/fetchSpecialOffer',
		'fetchRestInfo': 'restaurants/fetchRestaurantInfo'
		}),
	fetchOfferHandler(offerId) {
		this.fetchOffer(offerId)
			.then(data => {
					if (!data.success) return this.errorHandler(data) 
					else {
             let item = data.result
            item.timeStart = changeDateFormat(item.timeStart, false)
            item.timeEnd = changeDateFormat(item.timeEnd, false)

						this.localSpecialOffer = item;
						this.fetchRestInfo(this.localSpecialOffer.restaurantId)
							.then(data => {
								if (!data.success) return this.errorHandler(data);
								else {
									//TODO: pass the lat and lng, in order to display the adress
									this.localRestInfo = {
                    name: data.result.restaurantName,
                    number: data.result.number,
                    type: data.result.type,
                    website: data.result.website,
                    userSubscription: data.result.userSubscription,
                    lat: data.result.lat || '',
                    lng: data.result.lng || '',
									}
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
