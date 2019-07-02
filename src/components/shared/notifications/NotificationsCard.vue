<template>
    <v-card :max-width="width" class="overflow-hidden">
        <div class="toolbar">
                    <span class="toolbar-left">
                        <span class="font-weight-bold">Notifications</span>
                    </span>
        </div>
        <v-card>
            <v-list three-line subheader>
                <v-subheader inset>Not seen yet</v-subheader>

                <div
                        v-for="notification in items"
                        :key="notification._id"
                >
                    <v-list-tile
                            :class="{'grey lighten-2': !notification.seen}"
                            @click="onClick(notification.itemId)"
                    >
                        <v-list-tile-avatar>
                            <v-img :src="notification.image"></v-img>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title class="subheading text-truncate">{{ notification.title }}
                            </v-list-tile-title>
                            <v-list-tile-title class="body-2 text-truncate">{{ notification.message }}
                            </v-list-tile-title>
                            <v-list-tile-title class="caption mt-2 text-truncate">{{ notification.timeCreated }}
                            </v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-btn 
                                :loading="deleteLoading"
                                :disabled="deleteLoading"
                                @click.stop="handleDelete(notification._id)"
                                icon 
                                ripple>
                                <v-icon color="grey lighten-2">delete</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </div>
            </v-list>
        </v-card>
    </v-card>
</template>

<script>
    import { mapActions } from 'vuex'

	export default {
		props: {
			items: {type: Array, default: () => []},
			maxWidth: {type: Number, default: 500},
			fullWidth: {type: Boolean, default: false},
        },
        data() {
            return {
                deleteLoading: false,
            }
        },
		computed: {
			width() {
				return this.fullWidth ? '100%' : this.maxWidth
			}
		},
		methods: {
            ...mapActions({
                setSnackbar: 'snackbar/setState',
                removeNotification: 'notifications/removeNotification',
            }),
            handleDelete(notificationId) {
                if (this.deleteLoading) return
                this.deleteLoading = true

                this.removeNotification({ notificationId })
                    .then((data) => {
                        this.deleteLoading = false
                    })
            },
			onClick(id) {
                this.$emit('close-sheet')
				this.$router.push({ path: `/special-offer/${id}`})
			}
		}
	}
</script>

<style scoped lang="stylus">
    .toolbar
        min-height 35px
        padding: 5px
        padding-left: 10px
        padding-right: 10px
        padding-bottom: 10px
        box-sizing border-box

        .toolbar-left
            float left

        .toolbar-right
            float: right

    >>> .v-list
        max-height 700px !important
        overflow-y: scroll !important
</style>