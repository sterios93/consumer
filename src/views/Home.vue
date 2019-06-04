<template>
  <v-container
    fill-height
    fluid>
    <v-layout wrap>
      <v-flex
        xs12
        class="parallax-container">
        <Parallax>
          <v-flex
            class="d-flex justify-center align-center label-container"
            xs12>
            <div class="overlay"/>
            <h1 class="heading text-xs-center text-uppercase parallax-label main-headline">Find the best Lunch
            Deals,<br> <h1 class="heading text-xs-center text-uppercase parallax-label subheadline"> Today !</h1></h1>
          </v-flex>
        </Parallax>
      </v-flex>
      <v-flex xs12>
        <!-- // TODO: check if we still need to pass dynamic store module. -->
        <Map
          class="map-container"
          storeModule="userProfile"/> 
      </v-flex>
      <ViewBottomSheet/>
      <v-flex
        xs12
        class="mt-5">
        <v-layout justify-center>
          <v-flex xs10>
            <h3 class="merriFont">Special offers</h3>
            <SpecialList
              :items="specialItems"
              :scrollable="false"/>
            <v-layout
              align-center
              justify-center>
              <v-btn
                flat
                small
                color="orange"
                class="more-btn">More</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex
        xs12
        class="mt-5">
        <v-layout
          justify-center
          align-center>
          <v-flex xs10>
            <h3 class="merriFont">Lunch offers</h3>
            <LunchList
              :items="lunchItems"
              :scrollable="false"/>
            <v-layout
              align-center
              justify-center>
              <v-btn
                flat
                small
                color="orange"
                class="more-btn">More</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Parallax from '../../src/components/custom/Paralax'
import Map from '../../src/components/shared/map/Map'
import ViewBottomSheet from '../../src/components/shared/ViewBottomSheet'
import SpecialList from '../../src/components/shared/menu/special/List'
import LunchList from '../../src/components/shared/menu/lunch/List'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Parallax,
    Map,
    ViewBottomSheet,
    SpecialList,
    LunchList
  },
  data () {
    return {
      tiles: [
        { img: 'keep.png', title: 'Keep' },
        { img: 'inbox.png', title: 'Inbox' },
        { img: 'hangouts.png', title: 'Hangouts' },
        { img: 'messenger.png', title: 'Messenger' },
        { img: 'google.png', title: 'Google+' }
      ]
    }
  },
  computed: {
    ...mapState({
      specialItems: (state) => state.special.list.items,
      lunchItems: (state) => state.lunch.list.items
    })
  },
  methods: {}
}
</script>

<style scoped lang="stylus">
    .main-headline
        font-weight: bold !important;
        font-size: 3em !important;
        background-image: linear-gradient(#ececec, #fdfdfd) !important;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent
        .subheadline
          font-weight: bold !important;
          font-size: 1em !important;
          background-image: linear-gradient(#f3fdff, #bfbfbf) !important;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent
    .v-toolbar
        margin-bottom 0 !important

    .container
        padding-top 0

    .parallax-container
        padding 0

    .map-container
        position relative
        text-align: center
        display: flex
        justify-content: center

    .label-container
        position relative
        top -20px
        font-family: 'Ubuntu', sans-serif !important;

        .overlay
            position absolute
            z-index -1
            filter blur(4px)
            width 150%
            height 50%
            background-color #000000
            opacity 0.4

    .responsive
        .map-container
            flex-direction: column

    /*.parallax-label*/
    .more-btn
        cursor pointer
</style>
