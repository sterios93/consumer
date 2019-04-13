<template>
  <v-container fill-height fluid>
    <v-layout wrap>
        <v-flex xs12 class="parallax-container">
            <Parallax>
                <v-flex  class="d-flex justify-center align-center label-container" xs12>
                    <div class="overlay"></div>
                    <h1 class="heading text-xs-center text-uppercase parallax-label">Find the best Lunch Deals,<br> Today !</h1>
                </v-flex>
            </Parallax>
        </v-flex>
        <v-flex xs12>
            <Map class="map-container" storeModule="userProfile"/>
        </v-flex>
        <ViewBottomSheet title="Some title" :controls="tiles" />
    </v-layout>
  </v-container>
</template>

<script>
import Parallax from '../../src/components/custom/Paralax'
import Map from '../../src/components/shared/map/Map'
import ViewBottomSheet from '../../src/components/shared/ViewBottomSheet'

export default {
  name: 'home',
  components: {
    Parallax,
    Map,
      ViewBottomSheet
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
  methods: {}
}
</script>

<style scoped lang="stylus">
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
        .overlay
            position absolute
            z-index -1
            filter blur(4px)
            width 150%
            height 50%
            background-color #000000
            opacity 0.5
            .heading
                font-family: 'Merriweather', serif !important;

    /*.parallax-label*/
</style>
