<template>
    <v-card :max-width="width" class="overflow-hidden">
        <div class="toolbar">
                    <span class="toolbar-left">
                        <span class="font-weight-bold">Notifications</span>
                    </span>
            <span class="toolbar-right">
                        <a class="mr-3 body-1" href="#">Mark All as Read</a>
                        <a class="body-1" href="#">Settings</a>
                    </span>
        </div>
        <v-card>
            <v-list three-line subheader>
                <v-subheader inset>Not seen yet</v-subheader>

                <div
                        v-for="notification in items"
                        :key="notification.id"
                >
                    <v-list-tile
                            :class="{'grey lighten-2': !notification.seen}"
                            @click="onClick"
                    >
                        <v-list-tile-avatar>
                            <v-img :src="notification.image"></v-img>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title class="subheading text-truncate">{{ notification.title }}
                            </v-list-tile-title>
                            <v-list-tile-title class="body-2 text-truncate">{{ notification.message }}
                            </v-list-tile-title>
                            <v-list-tile-title class="caption mt-2 text-truncate">{{ notification.createdAt }}
                            </v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-btn icon ripple>
                                <v-icon color="grey lighten-1">info</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </div>
            </v-list>
        </v-card>
    </v-card>
</template>

<script>
	export default {
		props: {
			items: {type: Array, default: () => []},
			maxWidth: {type: Number, default: 500},
			fullWidth: {type: Boolean, default: false},
		},
		computed: {
			width() {
				return this.fullWidth ? '100%' : this.maxWidth
			}
		},
		methods: {
			onClick() {
				//
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