<template>
  <v-container fill-height fluid>
    <v-layout wrap>
        <v-flex  class="d-flex justify-center align-center" xs12 md6>
          <h1 class="heading text-xs-center">Find the best Lunch Deals,<br> Today !</h1>
        </v-flex>
        <v-flex xs12 md6 class="parallax-container">
          <Parallax/>
        </v-flex>
        <v-flex xs12>
          <Map storeModule="userProfile"/>
        </v-flex>
        <CustomBottomSheet
                title="Some title"
                controls="tiles"
                />
    </v-layout>
  </v-container>
</template>

<script>
import Parallax from '../../src/components/custom/Paralax'
import Map from '../../src/components/shared/map/Map'
import CustomBottomSheet from '../../src/components/shared/CustomsBottomSheet'

export default {
  name: 'home',
  components: {
    Parallax,
    Map,
    CustomBottomSheet
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
    margin-bottom 0!important
  .container
    padding-top 0
  .parallax-container
    padding 0
  .heading
    font-family: 'Merriweather', serif!important;
</style>
