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
    </v-layout>
  </v-container>
</template>

<script>
import Parallax from '../../src/components/custom/Paralax'
import Map from '../../src/components/shared/map/Map'

export default {
  name: 'home',
  components: {
    Parallax,
    Map,
  },
  data () {
    return {}
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
