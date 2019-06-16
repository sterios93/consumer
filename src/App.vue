<template>
  <v-app :class="{'responsive' : responsive}">
    <core-filter />

    <core-toolbar />

    <core-view />
  </v-app>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState('layout', ['responsive'])
    }
  }
</script>
<style lang="scss">
@import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>

<style lang="stylus">
  @import '~vuetify/src/stylus/main';
  @import '~flatpickr/dist/flatpickr.css';

  @import url('https://fonts.googleapis.com/css?family=Oswald|Ubuntu|Inconsolata|Playfair+Display|Roboto');

</style>
