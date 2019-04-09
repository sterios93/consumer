<template>
    <v-container
            fill-height
            fluid
            -list-xl>
        <v-layout
                justify-center
                wrap>
            <v-flex
                    xs12
                    md8>
                <material-card
                        color="purple"
                        title="Lunch offer"
                >
                    <v-layout wrap>

                        <v-flex
                                class="v-card-profile"
                                d-flex>
                            <v-layout wrap>

                                <v-flex xs12 lg6>
                                    <v-avatar
                                            slot="offset"
                                            class="mx-auto d-block"
                                            size="260"
                                    >
                                        <v-img src="./img/special-offer-default.jpeg"></v-img>
                                    </v-avatar>
                                </v-flex>


                                <v-flex xs12 lg6>
                                    <v-card-text class="text-xs-center">
                                        <h3 class="category font-weight-bold mb-3">{{startDate}}</h3>
                                        <v-btn
                                                color="success"
                                                round
                                                class="font-weight-light"
                                        >Follow
                                        </v-btn>
                                        <v-btn
                                                dark
                                                @click="onEditClick"
                                                color="orange"
                                                round
                                                class="font-weight-light"
                                        >EDIT
                                        </v-btn>

                                        <v-btn
                                                dark
                                                color="red"
                                                round
                                                class="font-weight-light"
                                        >MENU
                                        </v-btn>
                                        <v-btn
                                                dark
                                                color="blue"
                                                round
                                                class="font-weight-light"
                                        >LUNCH OFFERS
                                        </v-btn>

                                    </v-card-text>
                                </v-flex>

                            </v-layout>


                        </v-flex>

                    </v-layout>
                    <v-flex
                            xs12
                            mt-5>
                        <v-flex
                                v-for="item in items"
                                :key="item.id"
                                xs12
                                class="py-2 px-0">
                            <v-divider/>
                            <MenuItem :item="item"/>
                        </v-flex>
                    </v-flex>

                </material-card>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
  import MenuItem from '../components/shared/menu/MenuItem'
  import {mapActions, mapState} from 'vuex'

  export default {
    name: 'SpecialOffer',
    props: {
      id: String || Number
    },
    components: {
      MenuItem
    },
    data () {
      return {}
    },
    computed: {
      ...mapState('lunch', {
        name: (state) => state.view.name,
        image: (state) => state.view.image,
        price: (state) => state.view.price, // TODO
        items: (state) => state.view.items,
        endDate: (state) => state.view.endDate,
        discount: (state) => state.view.discount, // TODO
        startDate: (state) => state.view.startDate,
        description: (state) => state.view.description,
      }),
    },
    created() {
      this.fetchItem({payload: this.id, action: 'view'})
        .then(item => this.item = item)
        .then(item => this.item = item)
    },
    methods: {
      ...mapActions({
        'fetchItem': 'lunch/fetchItem',
        'setMenuModalVisibility': 'modals/setMenuModalVisibility',
      }),
      onEditClick() {
        this.setMenuModalVisibility({
          key: 'lunch',
          value: true,
          action: 'edit'
        })

        // TODO :: consider making new request for edit
        this.$store.dispatch(`lunch/setItem`, {
          payload: JSON.parse(JSON.stringify(this.item)),
          action: 'edit'
        })
      },
    }
  }
</script>

<style scoped lang="stylus"></style>
