<template>
	<div
		:class="{'overflow-y-scroll overflow-x-hidden' : !isDesktop,
			'view-card-container': isDesktop}">
			<v-card class="view-card" flat>
				<v-img src="https://cdn.vuetifyjs.com/images/lists/ali.png" height="250px">
					<v-layout column fill-height >
						<v-spacer></v-spacer>
						<v-card-title class="white--text pl-5 pt-5">
							<div class="display-1 pl-5 pt-5">{{information.name}}</div>
						</v-card-title>
					</v-layout>
				</v-img>

				<v-list two-line>
					<v-list-tile>
						<v-list-tile-action>
							<v-icon color="indigo">phone</v-icon>
						</v-list-tile-action>

						<v-list-tile-content>
							<v-list-tile-title>{{information.phone}}</v-list-tile-title>
							<v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
						</v-list-tile-content>
					</v-list-tile>


					<v-divider inset></v-divider>
					<v-list-tile>
						<v-list-tile-action>
							<v-icon color="indigo">kitchen</v-icon>
						</v-list-tile-action>

						<v-list-tile-content>
							<v-list-tile-title>{{information.type}}</v-list-tile-title>
							<v-list-tile-sub-title>kitchen</v-list-tile-sub-title>
						</v-list-tile-content>
					</v-list-tile>


					<v-divider inset></v-divider>
					<v-list-tile >
						<v-list-tile-action>
							<v-icon color="indigo">mail</v-icon>
						</v-list-tile-action>

						<v-list-tile-content>
							<v-list-tile-title>{{information.website}}</v-list-tile-title>
							<v-list-tile-sub-title>Work</v-list-tile-sub-title>
						</v-list-tile-content>
					</v-list-tile>

					<v-divider inset></v-divider>

					<v-list-tile>
						<v-list-tile-action>
							<v-icon color="indigo">location_on</v-icon>
						</v-list-tile-action>

						<v-list-tile-content>
						   <!-- TODO: Parse the coordinates to real adress -->
							<v-list-tile-title>1400 Main Street</v-list-tile-title>
							<v-list-tile-sub-title>Orlando, FL 79938</v-list-tile-sub-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
			</v-card>
		</div>
</template>

<script>
	export default {
		name: 'restaurant-info',
		props: {
			information: {
				type: Object,
				default: () => {
					return {
						id: '',
						info: {
							name: '',
							phone: '',
							type: '',
							website: '',
						},
						lat: '',
						lng: ''
					}
				}	
			},
			isDesktop: Boolean,
		},
		data() {
			return {}
		},
	}
</script>

<style scoped lang="stylus">
	.overflow-y-scroll
		overflow-y scroll
		height 700px
	.view-card,.view-card-container
		height: 100%
</style>
