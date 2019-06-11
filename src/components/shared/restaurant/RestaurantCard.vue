<template>
    <v-flex xs12 >
      <v-card>
        <v-img class="white--text" height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">{{restaurantInfo.info.name}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <div>
            <span class="grey--text">{{restaurantInfo.info.phone}}</span><br>
            <span>{{restaurantInfo.info.website}}</span><br>
            <span>{{restaurantInfo.info.type}}</span>
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
				setCurrentRestInfo: 'restaurants/setCurrentRestaurantInfo'
      		}),
			explore() {
				this.setCurrentRestInfo(this._restaurantInfo);
				this.setBottomSheetVisible(true);
        },
		}
    }
</script>
<style scoped lang="stylus"></style>