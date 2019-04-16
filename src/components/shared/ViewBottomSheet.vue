<template>
        <v-bottom-sheet
                ref="viewBottomSheet"
                v-model="localVisibility"
                full-width
        >
            <UI/>
        </v-bottom-sheet>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import UI from '../../components/menu/UI'

    export default {
        name:'view-bottom-sheet',
        components: {
            UI
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
                this.localVisibility = false;
                tile.cb()
            }
        }
    }
</script>

<style scoped lang="stylus">
    >>> .v-dialog.v-bottom-sheet.v-dialog--active {
        height: 75%!important;
        max-height: unset !important;
    }
</style>
