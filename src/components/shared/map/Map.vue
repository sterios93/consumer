<template>
  <div>
	<v-container class="gmap-autocomplete-container">
	  <v-layout class="gmap-autocomplete-wrapper" wrap>
		  <v-expansion-panel v-model="isActive">
			  <v-expansion-panel-content>
				  <template v-slot:actions>
					  <v-icon color="primary" class="ml-2">$vuetify.icons.expand</v-icon>
					  <v-icon @click.prevent="geolocate" class="location-icon ml-2">my_location</v-icon>
				  </template>
				  <template v-slot:header class="pa-0 ma-0">
					  <v-layout row wrap align-center justify-center class="pa-0 ma-0">
						  <v-flex xs12 md8 class="d-flex pa-1">
							  <gmap-autocomplete
									  class="gmap-autocomplete"
									  v-model="rAddress"
									  placeholder="Address"
									  @place_changed="setPlace"
									  :select-first-on-enter="true">
							  </gmap-autocomplete>
						  </v-flex>

						  <v-flex xs12 md4 class="d-flex justify-center pa-1">
							  <v-btn @click.native="onFindClick" large color="light-green accent-4 find-btn mx-0">
								  FIND RESTAURANTS
							  </v-btn>
						  </v-flex>
					  </v-layout>
				  </template>

				  <v-card>
					  <v-layout row wrap justify-center>
						  <v-flex xs12 sm6 class="pa-2">
							  <v-text-field
									  label="Choose type restaurant"
									  hint="For example, italian or mexican"
									  v-model="restaurantType"
									  box
							  ></v-text-field>
						  </v-flex>
						  <v-flex xs12 sm6 class="pa-2">
							  <v-text-field
									  label="Choose category"
									  hint="For example, pizza or burger"
									  v-model="restaurantCategory"
									  box
							  ></v-text-field>
						  </v-flex>
						  <v-flex xs12 class="pa-2">
							  <v-text-field
									  label="Search for name"
									  box
									  v-model="restaurantName"
							  ></v-text-field>
						  </v-flex>
						  <v-flex xs12 class="pa-2">
							  <v-btn block color="white--text search-btn" @click.native="onFindClick">Apply</v-btn>
						  </v-flex>
					  </v-layout>
				  </v-card>
			  </v-expansion-panel-content>
		  </v-expansion-panel>
	  </v-layout>
	</v-container>

	<gmap-map
			:options="{styles: styles}"
			:center="center"
			:zoom="16"
			style="width:100%;  height: 600px;"
			ref="map"
			@click="addCustomMarker"
	>
	  <gmap-marker :position="marker"/>

	  <GmapMarker
			:key="index"
			v-for="(m, index) in markers"
			:position="{lat: Number(m.lat), lng: Number(m.lng)}"
			:clickable="true"
			@click="pinClickHandler(m._id)"
			icon='../../../../public/img/restaurant-pin.png'
		/>
	</gmap-map>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import { addressParser, keyParser } from '../../../utils/helpers'

  export default {
	data() {
	  return {
		isActive: null,
		latLng: {},
		center: {
		  lat: 51.1657,
		  lng: 10.4515
		},
		styles: [
		  {
			"featureType": "landscape",
			"stylers": [
			  {
				"hue": "#FFBB00"
			  },
			  {
				"saturation": 43.400000000000006
			  },
			  {
				"lightness": 37.599999999999994
			  },
			  {
				"gamma": 1
			  }
			]
		  },
		  {
			"featureType": "road.highway",
			"stylers": [
			  {
				"hue": "#FFC200"
			  },
			  {
				"saturation": -61.8
			  },
			  {
				"lightness": 45.599999999999994
			  },
			  {
				"gamma": 1
			  }
			]
		  },
		  {
			"featureType": "road.arterial",
			"stylers": [
			  {
				"hue": "#FF0300"
			  },
			  {
				"saturation": -100
			  },
			  {
				"lightness": 51.19999999999999
			  },
			  {
				"gamma": 1
			  }
			]
		  },
		  {
			"featureType": "road.local",
			"stylers": [
			  {
				"hue": "#FF0300"
			  },
			  {
				"saturation": -100
			  },
			  {
				"lightness": 52
			  },
			  {
				"gamma": 1
			  }
			]
		  },
		  {
			"featureType": "water",
			"stylers": [
			  {
				"hue": "#0078FF"
			  },
			  {
				"saturation": -13.200000000000003
			  },
			  {
				"lightness": 2.4000000000000057
			  },
			  {
				"gamma": 1
			  }
			]
		  },
		  {
			"featureType": "poi",
			"stylers": [
			  {
				"hue": "#00FF6A"
			  },
			  {
				"saturation": -1.0989010989011234
			  },
			  {
				"lightness": 11.200000000000017
			  },
			  {
				"gamma": 1
			  }
			]
		  }
		],
		marker: null,
	  };
	},
	mounted() {
	  this.$refs.map.$mapPromise.then((map) => {
		setTimeout(() => {
		  this.clickableMap = this.$refs.map.$el.querySelector('.gm-style-pbc').nextElementSibling
		  this.clickableMap && this.clickableMap.addEventListener('click', this.shrinkPanel)
		}, 500)
	  })

	  this.geolocate();
	},
	beforeDestroy() {
	  this.clickableMap && this.clickableMap.removeEventListener('click', this.shrinkPanel)
	},
	computed: {
	  ...mapState({
		rAddress(state) { return state.map.searchedAdress },
		rType(state) { return state.map.searchedRestType },
		rCategory(state) { return state.map.searchedRestCategory },
		rName(state) { return state.map.searchedRestName },
		isBottomSheetVisible: (state) => state.bottomSheet.visibility,
		markers: (state) => state.map.markers,
	  }),
		restaurantType: {
			get() {return this.rType},
			set(v) {  this.setRType(v)},
		},
		restaurantCategory: {
			get() {return this.rCategory},
			set(v) {  this.setRCategory(v)},
		},
		restaurantName: {
			get() {return this.rName},
			set(v) {  this.setRName(v)},
		},

	},
	methods: {
		...mapActions({
			setBottomSheetVisible: 'bottomSheet/setVisibility',
		}),
		...mapActions('snackbar', ['setState']),
		...mapActions('map', [
			'fetchMarkers', 
			'setGeolocation', 
			'getAdress', 
			'setRType',
			'setRCategory',
			'setRName',
			'resetLastIndex',
			'setLastInList',]),
		...mapActions('restaurants', ['fetchRestaurantInfo']),
		geolocate: function () {
			const onSuccess = (position) => {
				this.shrinkPanel()
				this.setCoordinates(position.coords)
				this.onFindClick();
			}

			const onError = (error) => {
				//user blocked location set default coordinates
				if (error.code === 1) {
					this.setCoordinates({ latitude: 51.1657, longitude: 10.4515 });
					this.onFindClick();
				}
			}

			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		},
		setCoordinates(coordinates) {
			this.$set(this.center, 'lat', coordinates.latitude)
			this.$set(this.center, 'lng', coordinates.longitude)

			this.$refs.map.$mapPromise.then((map) => {
				map.panTo(this.center)
			})

			this.marker = {
				lat: this.center.lat,
				lng: this.center.lng,
			};
		},
		onFindClick(e) {
			e && e.preventDefault();
			this.resetLastIndex(); // This resets the last index in case of more fetches during the last search
			this.setLastInList(false); // Reset the lastInlist option.
			this.setGeolocation(this.marker);
			this.fetchMarkers();
		},
		pinClickHandler(id){
        	this.$router.push({ path: 'home', query: { restaurantId: id }})
			this.fetchRestaurantInfo(id)
					.then(data => {
						if (!data.success) return this.errorHandler(data) 
							else {
								this.toggleBottomSheet();
							}
					})
		},
		toggleBottomSheet() { this.setBottomSheetVisible(!this.isBottomSheetVisible)},
		errorHandler(data) { this.setState({snackbar: true, message: data.error.message, color: 'red'})},
		setPlace(place) {
			if (!place) return

			this.marker = this.center = {
			lat: place.geometry.location.lat(),
			lng: place.geometry.location.lng(),
			};

			const city = keyParser(place.address_components, 'locality');
			const country = keyParser(place.address_components, 'country');
			const postalCode = keyParser(place.address_components, 'postal_code');

			const data = {
				city,
				country,
				postalCode,
				formatted_address: place.formatted_address,
				location: {
					lat: place.geometry.location.lat(),
					lng: place.geometry.location.lng(),
				}
			}

			this.populateData(data);
		},
	  addCustomMarker(e) {
		const lat = e.latLng.lat()
		const lng = e.latLng.lng()

		this.marker = {
		  lat: lat,
		  lng: lng,
		}
		this.getAdress(this.marker)
			.then(rawAdress => {
				const parsedAddress = addressParser(rawAdress);
				if (parsedAddress) this.populateData(parsedAddress);

			})
	  },
	  shrinkPanel() {
		this.isActive = null
	  },
	  populateData(data) {
		this.$store.dispatch(`map/setAddress`, data.formatted_address);
	  },
	}
  };
</script>

<style scoped lang="stylus">
	>>> .v-expansion-panel__header
		padding-right 0 !important

	.gmap-autocomplete-container
		display: flex
		justify-content center
		align-items center
		position: absolute;
		z-index: 1;
		width: 100;
		top: -80px;

		.gmap-autocomplete-wrapper
			display flex
			padding: 3%;
			background: #fff;
			-webkit-box-shadow: 6px 6px 25px 0px rgba(189, 182, 189, 1);
			-moz-box-shadow: 6px 6px 25px 0px rgba(189, 182, 189, 1);
			box-shadow: 6px 6px 25px 0px rgba(189, 182, 189, 1);

			.gmap-autocomplete
				border-bottom 1px solid #c3c3c3
				display inline-block
				width 100%

				&:focus
					outline: none

	.location-icon
		color #019234 !important

	.find-btn
		color: white !important
		width 100%
		margin 0 20px 0 10px

	.search-btn
		background-color: #D70F64 !important
		margin: 0 auto;
		width 60%

	>>> .v-expansion-panel
		box-shadow: unset !important

	.responsive
		.gmap-autocomplete-container
			position: relative
			top: 0
			padding 0
	@media only screen and (min-width: 960px)
		.gmap-autocomplete-container
			width 50%
</style>
