<template>
    <v-bottom-sheet
            :class="{'fill-height': localVisibility}"
            ref="viewBottomSheet"
            v-model="localVisibility"
            full-width
    >
        <v-list class="pa-0">
            <UI/>
        </v-list>
    </v-bottom-sheet>
</template>

<script>
	import {mapState, mapActions} from 'vuex'
	import UI from '../../components/menu/UI'

	export default {
		name: 'view-bottom-sheet',
		components: {
			UI
		},
		computed: {
			...mapState('bottomSheet', ['visibility']),
			localVisibility: {
				get() {
					return this.visibility
				},
				set() {
					this.setVisibility(false)
				}
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

</style>
