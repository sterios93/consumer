<template>
    <component :is="component" v-bind="props"></component>
</template>

<script>
  import Desktop from './layouts/Desktop'
  import Mobile from './layouts/Mobile'

  import {mapState, mapGetters} from 'vuex'

  export default {
    components: {
      Desktop,
      Mobile
    },

    props: {
      compact: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      ...mapState('app', ['color']),
      ...mapState('layout', ['responsive']),
      component() {
        return this.responsive ? 'Mobile' : 'Desktop'
      },
      props() {
        return {
          tabs: this.tabs,
          color: this.color,
          compact: this.compact,
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
