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
							<v-list-tile-title>{{information.number}}</v-list-tile-title>
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
							<v-list-tile-title>{{parsedAddress.formatted_address}}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>

					<v-list-tile>
						<v-btn 
							v-if="isUserLogged"
							class="px-2" 
							@click="toggleSubscribe"
						>
							<v-icon 
								class="mr-2" 
								:color="isSubsribed ? 'teal' : 'grey'"
							>
								check
							</v-icon>
							{{isSubsribed ? 'Unsubsribe' : 'Subsribe'}}
						</v-btn>
					</v-list-tile>
				</v-list>
			</v-card>
		</div>
</template>

<script>
	import {mapState, mapActions} from 'vuex'
	import { addressParser } from '../../../../utils/helpers'

	export default {
		name: 'restaurant-info',
		props: {
			information: {
				type: Object,
				default: () => {
					return {
						id: '',
						name: '',
						number: '',
						type: '',
						website: '',
						userSubscription: [],
						lat: '',
						lng: ''
					}
				}	
			},
			isDesktop: Boolean,
		},
		watch: {
			information: {
				handler: function (info) {
					this.getAdress(info)
						.then(res => {
							this.parsedAddress = addressParser(res);
						})
				},
			}
		},
		data() {
			return {
				parsedAddress: 'Default adress',
			}
		},
		computed: {
			...mapState({
				isUserLogged: state => state.authentication.isUserLogged,
			}),
			isSubsribed() {
				let { userSubscription } = this.information
				return (userSubscription && userSubscription.active)
			},
			noActiveSubscriptions() {
				let { userSubscription } = this.information
				return (Array.isArray(userSubscription) && userSubscription.length === 0)
			}
		},
		methods: {
			...mapActions('subscriptions', [
				'cancelSubscription',
				'activateSubscription',
				'createSubscription'
			]),
			...mapActions('snackbar', [
				'setState',
			]),
			...mapActions('restaurants', [
				'setUserSubsription',
			]),
			...mapActions('map', [
				'getAdress',
			]),
			async toggleSubscribe() {
				let data = {}

				if (this.noActiveSubscriptions) {
					data = await this.createSubscription({
						restaurantId: this.information._id
					})
				} else {
					const payload = {
						subscriptionId: this.information.userSubscription.id
					}
					data = this.isSubsribed ? await this.cancelSubscription(payload) : await this.activateSubscription(payload)
				}
				if (!data.success) {
					this.setState({snackbar: true, message: data.error.message, color: 'red'})
				} else {
					this.setUserSubsription({
						id: data.result._id,
						active: data.result.active
					})
				}
			},
		}
	}
</script>

<style scoped lang="stylus">
	>>> .v-list__tile__title
			white-space: initial !important
			overflow: initial !important
			text-overflow: initial !important
	.overflow-y-scroll
		overflow-y scroll
		height 500px
	.view-card,.view-card-container
		height: 100%
</style>
