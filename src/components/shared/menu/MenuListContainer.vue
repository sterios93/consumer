<template>
    <div>
        <v-toolbar class="toolbar" dark>
            <v-tabs
                    v-model="activeTab"
                    color="transparent"
                    grow
            >
                <v-tabs-slider color="yellow"></v-tabs-slider>

                <v-tab
                        v-for="(tab, key, index) in tabs"
                        :key="key"
                >
                    {{ tab }}
                </v-tab>
            </v-tabs>
        </v-toolbar>

        <v-tabs-items v-model="activeTab">

            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <MainList v-bind="MainMListProps" />
                    </v-card-text>
                </v-card>
            </v-tab-item>

            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <SpecialList v-bind="SpecialListProps" />
                    </v-card-text>
                </v-card>
            </v-tab-item>

            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <LunchList v-bind="LunchListProps" />
                    </v-card-text>
                </v-card>
            </v-tab-item>

        </v-tabs-items>
    </div>
</template>

<script>
  import LunchList from '../../shared/menu/lunch/List'
  import MainList from '../../shared/menu/main/List'
  import SpecialList from '../../shared/menu/special/List'

  import {mapState} from 'vuex'

  export default {
    props: {
      color: String,
    },

    data () {
      return {
        activeTab: null,
        tabs: ['Main Menu', 'Special Offers', 'Lunch Menu']
      }
    },

    components: {
      LunchList,
      MainList,
      SpecialList
    },

    computed: {
      MainMListProps () {
        return {
          color: this.color,
          items: this.$store.state.main.list.items
        }
      },
      LunchListProps () {
        return {
          color: this.color,
          items: this.$store.state.lunch.list.items
        }
      },
      SpecialListProps () {
        return {
          color: this.color,
          items: this.$store.state.special.list.items
        }
      }
    },
  }
</script>

<style scoped lang="stylus">
    .toolbar
        background-image: linear-gradient(#4caf50, rgba(76, 175, 80, 0.82))
</style>
