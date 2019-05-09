<template>
  <v-bottom-sheet
    ref="viewBottomSheet"
    :class="{'fill-height': localVisibility}"
    v-model="localVisibility"
    full-width
  >
    <v-list class="pa-0">
      <UI/>
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
    handleClick (tile) {
      this.localVisibility = false
      tile.cb()
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
