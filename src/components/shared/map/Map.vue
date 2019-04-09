<template>
  <div class="mt-5">

    <v-container class="gmap-autocomplete-container">
      <v-layout class="gmap-autocomplete-wrapper" wrap>
        <v-flex xs12 md8 class="d-flex">
          <gmap-autocomplete
                  class="gmap-autocomplete"
                  v-model="rAddress"
                  placeholder="Address"
                  @place_changed="setPlace"
                  :select-first-on-enter="true">
          </gmap-autocomplete>
          <v-icon class="location-icon">my_location</v-icon>
        </v-flex>

        <v-flex xs12 md4 class="d-flex justify-center">
          <v-btn large color="light-green accent-4 find-btn">FIND RESTAURANTS</v-btn>
        </v-flex>
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
      <gmap-marker
              :position="marker"
              @click="toggleBottomSheet"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    props:{
      storeModule: String
    },
    data() {
      return {
        latLng: {},
        center: {},
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
        apiKey: 'AIzaSyAfYAgsxbh9FIJw1lAUc3B_t3ujOTrDRT4'
      };
    },
    mounted() {
      this.geolocate();
    },
    computed: {
      ...mapState({
        rAddress (state) {
          return state[this.storeModule].address
        },
        isBottomSheetVisible: (state) => state.bottomSheet.visibility
      }),
    },
    methods: {
      ...mapActions({
        setBottomSheetVisible: 'bottomSheet/setVisibility',
      }),
      toggleBottomSheet(){
        this.setBottomSheetVisible(!this.isBottomSheetVisible)
      },
      setPlace(place) {
        if (!place) return

        this.marker = this.center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        const city = this.keyParser(place.address_components, 'locality');
        const country = this.keyParser(place.address_components, 'country');
        const postalCode = this.keyParser(place.address_components, 'postal_code');

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
      geolocate: function() {
          navigator.geolocation.getCurrentPosition(position => {
            this.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            this.marker = {
              lat: this.center.lat,
              lng: this.center.lng,
            };

          });
      },
      addCustomMarker(e) {
        const lat = e.latLng.lat()
        const lng = e.latLng.lng()

        this.marker = {
          lat: lat,
          lng: lng,
        }
        this.getAddress(lat, lng);
      },
      addressParser(data){
        const address = (data.results && data.results[0]) ? data.results[0] : null;

        if (address) {
          const {address_components, formatted_address} = address;
          const city = this.keyParser(address_components, 'locality');
          const country = this.keyParser(address_components, 'country');
          const postalCode = this.keyParser(address_components, 'postal_code');
          const location = address.geometry.location;

          return {
            city,
            country,
            postalCode,
            formatted_address,
            location
          }
        } else {
          return false
        }
      },
      keyParser(data, searchedKey){
        for (let key in data) {
          if (data[key].types.includes(searchedKey)) {
            return data[key].long_name;
          }
        }
      },
      /**
       *
       * @param {object} data
       */
      populateData(data) {
          this.$store.dispatch(`${this.storeModule}/setAddress`, data.formatted_address);
          this.$store.dispatch(`${this.storeModule}/setCity`, data.city);
          this.$store.dispatch(`${this.storeModule}/setCountry`, data.country);
          this.$store.dispatch(`${this.storeModule}/setPostalCode`, data.postalCode);
          this.$store.dispatch(`${this.storeModule}/setLocation`, data.location);
      },
      getAddress(lat,lng) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat + ',' + lng}&key=${this.apiKey}&language=en`)
         .then(res => {
           if (res.status === 200) return res.json();
         })
         .then(res => {
           const address = this.addressParser(res);
           if (address) this.populateData(address);
         })
      }
    }
  };
</script>

<style scoped lang="stylus">
  .gmap-autocomplete-container
    display: flex
    justify-content center
    align-items center
    margin-bottom 3%
    .gmap-autocomplete-wrapper
      display flex
      padding: 3%;
      background: #fff;
      -webkit-box-shadow: 6px 6px 25px 0px rgba(189,182,189,1);
      -moz-box-shadow: 6px 6px 25px 0px rgba(189,182,189,1);
      box-shadow: 6px 6px 25px 0px rgba(189,182,189,1);
      .gmap-autocomplete
        border-bottom 1px solid #c3c3c3
        display inline-block
        width 100%
        &:focus
          outline: none
  .location-icon
    color #019234!important
  .find-btn
    margin-bottom 0
    color: white!important
    width 100%
  @media only screen and (min-width: 960px)
    .gmap-autocomplete-container
      width 50%
</style>
