<template>
    <v-bottom-sheet v-model="sheet">
        <template v-slot:activator>
            <router-link
                    v-ripple
                    slot="activator"
                    class="toolbar-items"
                    to="/notifications"
            >
                <v-badge
                        color="error"
                        overlap
                >
                    <template slot="badge">
                        {{ nonSeenItems}}
                    </template>
                    <v-icon color="green">mdi-bell</v-icon>
                </v-badge>
            </router-link>
        </template>

        <v-list>
           <NotificationsCard  :full-width="true" :items="items"/>
        </v-list>
    </v-bottom-sheet>
</template>
<script>
	import {mapState, mapGetters} from 'vuex'
	import NotificationsCard from './NotificationsCard'

	export default {
		components: {
            NotificationsCard
        },
		computed: {
			...mapState('notifications', ['items', 'sheet']),
            ...mapGetters('notifications', ['nonSeenItems']),
        },
	}
</script>

<style scoped lang="stylus">
</style>