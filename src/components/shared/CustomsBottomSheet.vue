<template>
    <v-bottom-sheet v-model="localVisibility">
        <v-list>
            <v-subheader>{{title}}</v-subheader>
            <v-list-tile
                    v-for="tile in controls"
                    :key="tile.title"
                    @click="handleClick(tile)"
            >
                <v-list-tile-avatar>
                    <v-avatar size="32px" tile>
                        <img
                                :src="'./img/' + tile.img"
                                :alt="tile.title"
                        >
                    </v-avatar>
                </v-list-tile-avatar>
                <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-bottom-sheet>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    props: {
      title: String,
      controls: Array
    },
    computed: {
      ...mapState('bottomSheet', ['visibility']),
      localVisibility: {
        get() {return this.visibility},
        set() {this.setVisibility(false)}
      }
    },
    methods: {
      ...mapActions('bottomSheet', ['setVisibility']),
      handleClick(tile) {
        this.localVisibility = false
        tile.cb()
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>