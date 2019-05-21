<template>
    <div class="menu-wrapper">
        <v-toolbar flat class="toolbar" dark>
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
                        <v-layout row wrap>
                            <v-flex xs9>
                                <MainList v-bind="MainMListProps" />
                            </v-flex>
                            <v-flex xs3 class="pa-4 mt-5">
                                <CategoryList v-bind="{...categoryProps}"/>
                            </v-flex>
                        </v-layout>
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
  import InfoList from '../../shared/menu/info/View'
  import CategoryList from '../../shared/category/CategoryList'


  import {mapState} from 'vuex'

  export default {
    props: {
      color: String,
      compact: Boolean,
      categories: Array,
    },

    data () {
      return {
        activeTab: null,
        tabs: ['Main Menu', 'Special Offers', 'Lunch Menu',]
      }
    },

    components: {
      CategoryList,
      LunchList,
      MainList,
      SpecialList,
      InfoList,
    },

    computed: {
      categoryProps () {
        return {
          items: this.categories,
          disabled: this.activeTab !== 0 // TODO :: consider placing calendar for filtering on special and lunch tabs
        }
      },
      MainMListProps () {
        return {
          color: this.color,
          compact: this.compact,
          items: this.$store.state.main.list.items
        }
      },
      LunchListProps () {
        return {
          color: this.color,
          compact: this.compact,
          items: this.$store.state.lunch.list.items
        }
      },
      SpecialListProps () {
        return {
          color: this.color,
          compact: this.compact,
          items: this.$store.state.special.list.items
        }
      },
      InfoListProps () {
        return {
          compact: this.compact,
          color: this.color,
          information: this.$store.state.info.list.information
        }
      }
    },
  }
</script>

<style scoped lang="stylus">
    .menu-wrapper
        padding-bottom: 56px
        .toolbar
            background-image: linear-gradient(#4caf50, rgba(76, 175, 80, 0.82))
</style>
