<template>
	<v-container grid-list-md>
		<v-layout row wrap d-flex class="pa-0 ma-0">
				<v-flex xs12 sm4
					v-for="(item, index) in items" 
					:key="index">

					<RestaurantCard :restaurantInfo="item"/>
				</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
  import RestaurantCard from './RestaurantCard'

  export default {
    components: {
      RestaurantCard
    },
    props: {
      items: Array,
    },
    data() {
      return {}
    },
  }
</script>

<style scoped lang="stylus"></style>
