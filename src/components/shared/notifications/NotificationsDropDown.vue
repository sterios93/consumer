<template>
    <v-menu
            bottom
            left
            content-class="dropdown-menu"
            offset-y
            transition="slide-y-transition">
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
        <NotificationsCard :items="items"/>
    </v-menu>
</template>
<script>
	import {mapState, mapGetters} from 'vuex'
	import NotificationsCard from './NotificationsCard'

	export default {
		components: {
			NotificationsCard
		},
		computed: {
			...mapState('notifications', ['items']),
            ...mapGetters('notifications', ['nonSeenItems']),
        },
	}
</script>

<style scoped lang="stylus">
</style>