<template>
    <v-flex xs12 >
      <v-card>
        <v-img class="white--text" height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">{{restaurantInfo.name}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <div>
            <span class="grey--text">{{restaurantInfo.phone}}</span><br>
            <span>{{restaurantInfo.website}}</span><br>
            <span>{{restaurantInfo.type}}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" @click="explore">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
</template>


<script>
import {mapActions} from 'vuex';

    export default {
        name: 'restaurant-card',
        props: {
            restaurantInfo: {
                type: Object,
                default: () => {
                  return {
                    id: '',
                    info: {
						name: '',
						phone: '',
						type: '',
						website: ''
                    },
                  }
                }
            }
		},
		data() {
			return {
				_restaurantInfo: {},
			}
		},
		watch: {
			restaurantInfo: {
				handler: function(value) {
					this._restaurantInfo = value;
        },
        immediate: true,
			}
		},
		methods: {
			...mapActions({
				setBottomSheetVisible: 'bottomSheet/setVisibility',
				setCurrentRestInfo: 'restaurants/setCurrentRestaurantInfo',
				fetchRestaurantInfo: 'restaurants/fetchRestaurantInfo',
				setState: 'snackbar/setState'
      }),
			explore() {
        const id = this._restaurantInfo._id
        this.$router.push({ path: 'home', query: { restaurantId: id }})
        this.fetchRestaurantInfo(id)
		  		.then(data => {
					  if (!data.success) {
              this.setState({snackbar: true, message: data.error.message, color: 'red'})
            }
				  })
				this.setCurrentRestInfo(this._restaurantInfo);
				this.setBottomSheetVisible(true);
        },
		}
    }
</script>
<style scoped lang="stylus"></style>