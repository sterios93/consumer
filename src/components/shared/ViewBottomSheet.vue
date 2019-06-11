<template>
  <v-bottom-sheet
    ref="viewBottomSheet"
    :class="{'fill-height': localVisibility}"
    v-model="localVisibility"
    full-width
  >
    <v-list class="pa-0">
      <UI :compact="compact"/>
    </v-list>
  </v-bottom-sheet>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UI from '../../components/menu/UI'

export default {
  name: 'ViewBottomSheet',
  components: {
    UI
  },
  data() {
    return {
      compact: true
    }
  },
  computed: {
    ...mapState('bottomSheet', ['visibility']),
    localVisibility: {
      get () {
        return this.visibility
      },
      set () {
        this.setVisibility(false)
      }
    }
  },
  methods: {
    ...mapActions('bottomSheet', ['setVisibility']),
  }
}
</script>

<style scoped lang="stylus">

</style>
