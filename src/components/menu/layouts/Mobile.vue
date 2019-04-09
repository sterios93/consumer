<template>
    <v-layout row wrap>

        <v-flex>
            <v-layout wrap justify-center>
                <v-flex xs12 v-if="isMainMenu">
                    <CategoryTabs v-bind="categoryProps" @on-tab-change="onTabChange"/>
                </v-flex>
                <v-flex xs12 class="controls">
                    <v-btn
                            @click="onControlsClicked"
                            color="blue darken-2"
                            dark
                            fab
                    >
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex xs12 class="menu-list-mobile">
                    <component :is="menuComponent" v-bind="menuListProps"></component>
                </v-flex>
            </v-layout>

        </v-flex>

        <v-bottom-nav
                :active.sync="selectedMenu"
                :value="true"
                fixed
                color="white"
        >
            <v-btn
                    color="teal"
                    flat
                    value="main"
            >
                <span>Main Menu</span>
                <v-icon>history</v-icon>
            </v-btn>

            <v-btn
                    color="teal"
                    flat
                    value="special"
            >
                <span>Special Menu</span>
                <v-icon>favorite</v-icon>
            </v-btn>

            <v-btn
                    color="teal"
                    flat
                    value="lunch"
            >
                <span>Lunch Menu</span>
                <v-icon>place</v-icon>
            </v-btn>
        </v-bottom-nav>
        <CustomsBottomSheet :controls="controls"></CustomsBottomSheet>
    </v-layout>
</template>

<script>
  import CategoryTabs from "../../shared/category/CategoryTabs";
  import LunchList from '../../shared/menu/lunch/List'
  import MenuList from "../../shared/menu/MenuList";
  import SpecialList from '../../shared/menu/special/List'

  import CustomsBottomSheet from '../../shared/CustomsBottomSheet'

  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {
    props: {
      color: String,
      categories: Array
    },

    data() {
      return {
        selectedMenu: 'main',
        category: this.categories[0],
        controls: []
      }
    },

    components: {
      CategoryTabs,
      CustomsBottomSheet,
      'main-menu': MenuList,
      'lunch-menu': LunchList,
      'special-menu': SpecialList
    },

    created() {
      this.category = this.categories[0].id
      this.controls = [
        {
          img: 'main.png',
          title: 'Create main menu product',
          cb: () => this.setMenuModalVisibility({
            key: 'main',
            value: true
          })
        },
        {
          img: 'special.png',
          title: 'Create special offer',
          cb: () => this.setMenuModalVisibility({
            key: 'special',
            value: true
          })
        },
        {
          img: 'lunch.png',
          title: 'Create lunch offer',
          cb: () => this.setMenuModalVisibility({
            key: 'lunch',
            value: true
          })
        },
        {
          img: 'category.png',
          title: 'Create category',
          cb: () => this.setModalVisibility({
            key: 'category',
            value: true
          })
        }
      ]
    },

    computed: {
      ...mapState('special', ['items']),
      isMainMenu() {
        return this.selectedMenu === 'main'
      },
      menuComponent() {
        return `${this.selectedMenu}-menu`
      },
      menuListProps() {
        return {
          color: this.color,
          items: this.isMainMenu ? this.getMenuByCategory()(this.category) : this.$store.state[this.selectedMenu].list.items
        }
      },
      categoryProps() {
        return {
          items: this.categories,
          color: this.color
        }
      }
    },

    methods: {
      ...mapGetters('main', ['getMenuByCategory']),
      ...mapActions({
        'setModalVisibility': 'modals/setModalVisibility',
        'setMenuModalVisibility': 'modals/setMenuModalVisibility',
        'setBottomSheetVisibility': 'bottomSheet/setVisibility',
      }),
      onTabChange(id) {
        this.category = id
      },
      onControlsClicked() {
        this.setBottomSheetVisibility(true)
      }
    }
  }
</script>

<style scoped lang="stylus">
    .controls
        >>> .v-btn
            position: fixed
            top: 80%
            left: 80%
            z-index: 3
</style>
