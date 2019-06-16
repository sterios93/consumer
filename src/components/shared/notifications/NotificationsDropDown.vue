<template>
    <v-menu
            bottom
            left
            content-class="dropdown-menu"
            offset-y
            @click="onClick"
            transition="slide-y-transition">
            <template v-slot:activator="{ on }">
                    <v-btn
                        color="primary"
                        dark
                        icon
                        v-on="on"
                    >
                        <v-icon color="green">mdi-bell</v-icon>
                    </v-btn>
                </template>

            <v-badge
                    color="error"
                    overlap
            >
                <template slot="badge">
                    {{ nonSeenItems}}
                </template>
                 
            </v-badge>
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
        methods: {
            onClick(event) {
                console.error(event)
            }
        }
	}
</script>

<style scoped lang="stylus">
</style>